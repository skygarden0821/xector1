// ════════════════════════════════════════════════════════════
//  Firebase 認証ロジック
// ════════════════════════════════════════════════════════════
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// firebase-config.js で定義した firebaseConfig を使う
const app = initializeApp(window.firebaseConfig || firebaseConfig);
const auth = getAuth(app);

// ログイン状態を端末に保持（再訪時に自動ログイン）
setPersistence(auth, browserLocalPersistence).catch(() => {});

// 現在のモード：'login' or 'signup'
let authMode = 'login';

// ─── エラーメッセージ（日本語化） ───
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

// ─── モード切替（ログイン / 新規登録） ───
window.switchAuthMode = function (mode) {
  authMode = mode;
  const isLogin = (mode === 'login');
  document.getElementById('auth-tab-login').classList.toggle('active', isLogin);
  document.getElementById('auth-tab-signup').classList.toggle('active', !isLogin);
  document.getElementById('auth-submit').textContent = isLogin ? 'ログイン' : 'アカウントを作成';
  document.getElementById('auth-hint').textContent = isLogin
    ? 'アカウントをお持ちでない方は「新規登録」へ'
    : '登録するとすぐにご利用いただけます';
  const pw = document.getElementById('auth-password');
  if (pw) pw.setAttribute('autocomplete', isLogin ? 'current-password' : 'new-password');
  showError('');
};

// ─── 送信（ログイン or 新規登録） ───
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
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
    // 成功 → onAuthStateChanged が発火して画面が切り替わる
  } catch (e) {
    showError(jpError(e.code));
    btn.disabled = false;
    btn.textContent = original;
  }
};

// ─── ログアウト ───
window.doLogout = async function () {
  try {
    await signOut(auth);
  } catch (e) {
    // 失敗してもゲートは出す
  }
};

// ─── 認証状態の監視（アプリ全体の入口） ───
onAuthStateChanged(auth, (user) => {
  const gate = document.getElementById('auth-gate');
  const appEl = document.getElementById('app');
  if (user) {
    // ログイン済み → 本体を表示
    gate.classList.remove('show');
    document.body.classList.remove('locked');
    appEl.style.display = '';
    // アカウントのメール表示
    const em = document.getElementById('account-email');
    if (em) em.textContent = user.email || '—';
    // ログイン直後はフォームをクリア
    const pw = document.getElementById('auth-password');
    if (pw) pw.value = '';
  } else {
    // 未ログイン → ゲートを表示、本体を隠す
    gate.classList.add('show');
    document.body.classList.add('locked');
    appEl.style.display = 'none';
    window.switchAuthMode('login');
  }
});

// Enterキーで送信
document.addEventListener('DOMContentLoaded', () => {
  ['auth-email', 'auth-password'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') window.submitAuth(); });
  });
});
