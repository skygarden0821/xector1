// ════════════════════════════════════════════════════════════
//  Firebase 認証ロジック（招待コード制）
// ════════════════════════════════════════════════════════════
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, setPersistence, browserLocalPersistence,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, deleteUser
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, query, collection, where, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = initializeApp(window.firebaseConfig || firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence).catch(() => {});

let authMode = 'login';

// ─── エラーメッセージ ───
function jpError(code) {
  const map = {
    'auth/invalid-email':         'メールアドレスの形式が正しくありません。',
    'auth/user-disabled':         'このアカウントは現在ご利用いただけません。',
    'auth/user-not-found':        'アカウントが見つかりません。メールアドレスをご確認ください。',
    'auth/wrong-password':        'パスワードが正しくありません。',
    'auth/invalid-credential':    'メールアドレスまたはパスワードが正しくありません。',
    'auth/email-already-in-use':  'このメールアドレスは既に登録されています。ログインしてください。',
    'auth/weak-password':         'パスワードは6文字以上で設定してください。',
    'auth/too-many-requests':     '試行回数が多すぎます。しばらく待ってから再度お試しください。',
    'auth/network-request-failed':'通信エラーが発生しました。電波状況をご確認ください。',
  };
  return map[code] || 'エラーが発生しました。もう一度お試しください。';
}
function showError(msg) {
  const el = document.getElementById('auth-error');
  if (el) el.textContent = msg || '';
}

// ─── モード切替 ───
window.switchAuthMode = function (mode) {
  authMode = mode;
  const isLogin = (mode === 'login');
  document.getElementById('auth-tab-login').classList.toggle('active', isLogin);
  document.getElementById('auth-tab-signup').classList.toggle('active', !isLogin);
  document.getElementById('auth-submit').textContent = isLogin ? 'ログイン' : 'アカウントを作成';
  document.getElementById('auth-hint').textContent = isLogin
    ? 'アカウントをお持ちでない方は「新規登録」へ'
    : '登録には招待コードが必要です';
  // 招待コード欄の表示切替（新規登録時のみ）
  const codeField = document.getElementById('auth-code-field');
  if (codeField) codeField.style.display = isLogin ? 'none' : 'block';
  const pw = document.getElementById('auth-password');
  if (pw) pw.setAttribute('autocomplete', isLogin ? 'current-password' : 'new-password');
  showError('');
};

// ─── コードの正規化（大文字化・前後空白除去） ───
function normalizeCode(raw) {
  return (raw || '').trim().toUpperCase();
}

// ─── 送信 ───
window.submitAuth = async function () {
  const email = (document.getElementById('auth-email').value || '').trim();
  const password = document.getElementById('auth-password').value || '';
  const btn = document.getElementById('auth-submit');

  if (!email)    { showError('メールアドレスを入力してください。'); return; }
  if (!password) { showError('パスワードを入力してください。'); return; }

  btn.disabled = true;
  const original = btn.textContent;
  btn.textContent = '処理中…';
  showError('');

  try {
    if (authMode === 'signup') {
      await handleSignup(email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      // ログイン後の入室可否は onAuthStateChanged 内で検証
    }
  } catch (e) {
    showError(e.message && e.userFacing ? e.message : jpError(e.code));
    btn.disabled = false;
    btn.textContent = original;
  }
};

// ─── 新規登録（招待コード検証つき） ───
async function handleSignup(email, password) {
  const code = normalizeCode(document.getElementById('auth-code').value);
  if (!code) { const e = new Error('招待コードを入力してください。'); e.userFacing = true; throw e; }

  // 1) コードの存在・未使用チェック
  const ref = doc(db, 'invite_codes', code);
  const snap = await getDoc(ref);
  if (!snap.exists()) { const e = new Error('招待コードが正しくありません。'); e.userFacing = true; throw e; }
  if (snap.data().used === true) { const e = new Error('この招待コードは既に使用されています。'); e.userFacing = true; throw e; }

  // 2) アカウント作成
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  // 3) コードを使用済みに（ルールで used:false→true のみ許可）
  try {
    await updateDoc(ref, { used: true, usedBy: uid, usedAt: Date.now() });
  } catch (e) {
    // コード確定に失敗したら、作ったアカウントは消してロールバック
    try { await deleteUser(cred.user); } catch (_) {}
    const err = new Error('登録処理に失敗しました。もう一度お試しください。'); err.userFacing = true; throw err;
  }
  // 4) 会員プロフィールにコードを記録
  try {
    await setDoc(doc(db, 'members', uid), { email, code, joinedAt: Date.now() });
  } catch (_) {}
}

// ─── このユーザーの招待コードがまだ有効か（入室可否） ───
async function isAccessAllowed(user) {
  try {
    // members から自分のコードを引く
    const memSnap = await getDoc(doc(db, 'members', user.uid));
    let code = memSnap.exists() ? memSnap.data().code : null;

    // members に記録が無い場合、invite_codes を usedBy で逆引き
    if (!code) {
      const q = query(collection(db, 'invite_codes'), where('usedBy', '==', user.uid));
      const res = await getDocs(q);
      if (!res.empty) code = res.docs[0].id;
    }
    if (!code) return false; // コードに紐付いていない＝不許可

    // コードがまだ台帳に存在し、自分が使用者か
    const codeSnap = await getDoc(doc(db, 'invite_codes', code));
    if (!codeSnap.exists()) return false;        // 退会＝コード削除済み → 不許可
    if (codeSnap.data().usedBy !== user.uid) return false;
    return true;
  } catch (e) {
    // 通信エラー時は、いったん入室を許可（締め出しすぎ防止）。再読込で再チェックされる
    return true;
  }
}

// ─── ログアウト ───
window.doLogout = async function () {
  try { await signOut(auth); } catch (e) {}
};

// ─── 認証状態の監視 ───
onAuthStateChanged(auth, async (user) => {
  const gate = document.getElementById('auth-gate');
  const appEl = document.getElementById('app');

  if (user) {
    // 入室可否チェック（招待コードが生きているか）
    const allowed = await isAccessAllowed(user);
    if (!allowed) {
      // コードが無効化（退会）されている → 締め出し
      await signOut(auth);
      gate.classList.add('show');
      document.body.classList.add('locked');
      appEl.style.display = 'none';
      window.switchAuthMode('login');
      showError('このアカウントは現在ご利用いただけません。');
      return;
    }
    // 入室OK
    gate.classList.remove('show');
    document.body.classList.remove('locked');
    appEl.style.display = '';
    const em = document.getElementById('account-email');
    if (em) em.textContent = user.email || '—';
    const pw = document.getElementById('auth-password');
    if (pw) pw.value = '';
    const cd = document.getElementById('auth-code');
    if (cd) cd.value = '';
  } else {
    gate.classList.add('show');
    document.body.classList.add('locked');
    appEl.style.display = 'none';
    window.switchAuthMode('login');
  }
});

// Enterキー送信
document.addEventListener('DOMContentLoaded', () => {
  ['auth-email', 'auth-password', 'auth-code'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') window.submitAuth(); });
  });
});
