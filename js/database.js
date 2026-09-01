// ============================================================
// DATABASE.JS - FIREBASE INTEGRATION (DE-OBFUSCATED & RAPIH)
// ============================================================

import {
    initializeApp,
    getApps,
    getApp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

import {
    initializeAppCheck,
    ReCaptchaV3Provider
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-check.js';

import {
    getDatabase,
    ref,
    get,
    set,
    update,
    remove,
    increment,
    push
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

import {
    getAuth,
    onAuthStateChanged,
    signInAnonymously,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// ============================================================
// AMBIL KONFIGURASI FIREBASE
// ============================================================

let firebaseConfig = null;

try {
    let response = await fetch('https://db.reactionwa.online/api/config');
    if (!response.ok) {
        response = await fetch('https://config.reactionwa.online/db.json');
    }
    if (response.ok) {
        firebaseConfig = await response.json();
    }
} catch (e) { /* ignore */ }

// ===== FALLBACK CONFIG =====
if (!firebaseConfig || !firebaseConfig.apiKey) {
    try {
        const response = await fetch('https://db.reactionwa.online/api/config');
        if (response.ok) {
            firebaseConfig = await response.json();
        }
    } catch (e) { /* ignore */ }
}

// ============================================================
// INIT FIREBASE APP
// ============================================================

const app = getApps().length ? getApp('reaction-wa') : initializeApp(firebaseConfig || {}, 'reaction-wa');

// ============================================================
// INIT APP CHECK (ReCaptcha v3)
// ============================================================

try {
    initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider('6LcV2wQqAAAAAH7xq8iWr_dW8I8Nl6V5X8J9ZkLm'),
        isTokenAutoRefreshEnabled: false
    });
} catch (e) { /* ignore */ }

// ============================================================
// INIT DATABASE & AUTH
// ============================================================

const rtdb = getDatabase(app);
const auth = getAuth(app);

// ============================================================
// WAIT FOR AUTH (ANONYMOUS LOGIN)
// ============================================================

let authPromise = null;

onAuthStateChanged(auth, (user) => {
    if (!user) {
        authPromise = null;
    }
});

const waitForAuth = () => {
    if (auth.currentUser) {
        return Promise.resolve(auth.currentUser);
    }

    if (!authPromise) {
        authPromise = new Promise((resolve) => {
            let resolved = false;

            const onUser = (user) => {
                if (!resolved) {
                    resolved = true;
                    try { unsubscribe(); } catch (e) { /* ignore */ }
                    resolve(user);
                }
            };

            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    onUser(user);
                } else {
                    try {
                        const result = await signInAnonymously(auth);
                        onUser(result.user);
                    } catch (e) {
                        onUser(null);
                    }
                }
            });

            // Timeout fallback
            setTimeout(() => {
                onUser(auth.currentUser || null);
            }, 2000);
        });
    }

    return authPromise;
};

// ============================================================
// GET LINKS FROM DATABASE
// ============================================================

let linksCache = null;

const getLinks = async () => {
    if (linksCache) return linksCache;

    try {
        const snapshot = await get(ref(rtdb, 'links'));
        if (snapshot.exists()) {
            linksCache = snapshot.val();
            return linksCache;
        }
    } catch (e) { /* ignore */ }

    return {};
};

// ============================================================
// ENKRIPSI (AES-GCM)
// ============================================================

const encryptText = async (text, secret) => {
    if (!text) return text;

    try {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const key = await crypto.subtle.importKey(
            'raw',
            keyData,
            'AES-GCM',
            true,
            ['encrypt']
        );

        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encodedText = encoder.encode(text);
        const encrypted = await crypto.subtle.encrypt({
            name: 'AES-GCM',
            iv: iv
        }, key, encodedText);

        const result = new Uint8Array(iv.length + encrypted.byteLength);
        result.set(iv);
        result.set(new Uint8Array(encrypted), iv.length);

        return btoa(String.fromCharCode.apply(null, result));
    } catch (e) {
        return text;
    }
};

// ============================================================
// DEKRIPSI (AES-GCM)
// ============================================================

const decryptText = async (encryptedText, secret) => {
    if (!encryptedText || typeof encryptedText !== 'string' || !secret) {
        return encryptedText;
    }

    try {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const key = await crypto.subtle.importKey(
            'raw',
            keyData,
            'AES-GCM',
            true,
            ['decrypt']
        );

        const data = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));

        if (data.length < 12) return encryptedText;

        const iv = data.slice(0, 12);
        const encrypted = data.slice(12);

        const decrypted = await crypto.subtle.decrypt({
            name: 'AES-GCM',
            iv: iv
        }, key, encrypted);

        return new TextDecoder().decode(decrypted);
    } catch (e) {
        return encryptedText;
    }
};

// ============================================================
// GET SECRET KEY
// ============================================================

const getSecretKey = async () => {
    try {
        const snapshot = await get(ref(rtdb, 'secret/key'));
        if (snapshot.exists() && snapshot.val()) {
            return snapshot.val();
        }

        const links = await getLinks();
        if (links && links.queueKey) {
            return links.queueKey;
        }
    } catch (e) { /* ignore */ }

    return '';
};

// ============================================================
// EXPORT
// ============================================================

export {
    GoogleAuthProvider,
    app,
    auth,
    decryptText,
    encryptText,
    get,
    getLinks,
    getSecretKey,
    increment,
    onAuthStateChanged,
    push,
    ref,
    remove,
    rtdb,
    set,
    signInAnonymously,
    signInWithPopup,
    signOut,
    update,
    waitForAuth
};
