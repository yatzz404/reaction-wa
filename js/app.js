// ============================================================
// APP.JS - REACTION WA LOGIKA UTAMA (DE-OBFUSCATED & RAPIH)
// ============================================================

import {
    rtdb,
    ref,
    get,
    set,
    auth,
    increment,
    push,
    waitForAuth
} from '/js/database.js';

import {
    sendReactionFree
} from '/js/api.js';

// ============================================================
// DOM ELEMENTS
// ============================================================

const form = document.getElementById('reactionForm');
const urlInput = document.getElementById('postUrl');
const emojiInput = document.getElementById('emojis');
const submitBtn = document.getElementById('submitBtn');
const limitDisplay = document.getElementById('limitDisplayText');

// ============================================================
// SHOW SNACKBAR (NOTIFIKASI)
// ============================================================

const showSnackbar = (type, message) => {
    const snackbar = document.getElementById('snackbar');
    if (!snackbar) return;

    const textEl = document.getElementById('snackbarText');
    const iconEl = document.getElementById('snackbarIcon');

    snackbar.className = 'snackbar-container ' + type;
    textEl.textContent = message;

    if (type === 'success') {
        iconEl.innerHTML = '<i data-lucide="check-circle"></i>';
    } else if (type === 'error') {
        iconEl.innerHTML = '<i data-lucide="alert-circle"></i>';
    } else {
        iconEl.innerHTML = '<i data-lucide="info"></i>';
    }

    lucide.createIcons();

    setTimeout(() => {
        snackbar.className = snackbar.className.replace(type, '');
    }, 3000);
};

// ============================================================
// SHOW SUCCESS MODAL
// ============================================================

const showSuccessModal = (message) => {
    const existing = document.getElementById('wa-success-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'wa-success-modal';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(18, 18, 18, 0.6); display: flex;
        align-items: center; justify-content: center;
        z-index: 9999; opacity: 0;
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: #FFFFFF; color: #1C1E21;
        border-radius: 28px; padding: 40px 32px;
        max-width: 420px; width: 90%;
        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);
        transform: scale(0.95) translateY(10px);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        text-align: center;
    `;

    modal.innerHTML = `
        <div style="width: 72px; height: 72px; background: rgba(37, 211, 102, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        </div>
        <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">Berhasil!</h2>
        <p style="color: #374151; font-size: 16px; margin-bottom: 24px;">${message}</p>
        <button id="closeSuccessBtn" style="
            background: #25D366; color: #1C1E21; border: none;
            border-radius: 9999px; font-size: 16px; font-weight: 600;
            height: 48px; width: 100%; cursor: pointer;
            transition: background 0.2s;
        ">OK</button>
    `;

    modal.querySelector('#closeSuccessBtn').onclick = () => {
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.9) translateY(10px)';
        setTimeout(() => overlay.remove(), 300);
    };

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1) translateY(0)';
    });
};

// ============================================================
// SHOW LIMIT MODAL (LIMIT HABIS / ERROR)
// ============================================================

const showLimitModal = (message, title = 'Limit Harian Tercapai', type = 'daily') => {
    const existing = document.getElementById('wa-limit-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'wa-limit-modal';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(18, 18, 18, 0.7); display: flex;
        align-items: center; justify-content: center;
        z-index: 9999; opacity: 0;
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background: #FFFFFF; color: #1C1E21;
        border-radius: 28px; padding: 40px 32px;
        max-width: 420px; width: 90%;
        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.15);
        transform: scale(0.95) translateY(10px);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        text-align: center;
    `;

    modal.innerHTML = `
        <div style="width: 72px; height: 72px; background: rgba(239, 68, 68, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        </div>
        <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">${title}</h2>
        <p style="color: #374151; font-size: 16px; margin-bottom: 24px;">${message}</p>
        <div style="display: flex; flex-direction: row; gap: 12px;">
            <button id="closeLimitBtn" style="
                flex: 1; background: #1C1E21; color: #FFFFFF;
                border: none; border-radius: 9999px; font-size: 16px;
                font-weight: 600; height: 48px; cursor: pointer;
            ">Tutup</button>
            <button id="topupLimitBtn" style="
                flex: 1; background: #25D366; color: #1C1E21;
                border: none; border-radius: 9999px; font-size: 16px;
                font-weight: 600; height: 48px; cursor: pointer;
            ">Top Up</button>
        </div>
    `;

    modal.querySelector('#closeLimitBtn').onclick = () => {
        overlay.style.opacity = '0';
        modal.style.transform = 'scale(0.9) translateY(10px)';
        setTimeout(() => overlay.remove(), 300);
    };

    modal.querySelector('#topupLimitBtn').onclick = () => {
        window.location.href = '/Topup/';
    };

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1) translateY(0)';
    });
};

// ============================================================
// SET LOADING STATE
// ============================================================

const setLoading = (btn, isLoading) => {
    if (isLoading) {
        btn.disabled = true;
        btn.classList.add('loading');
    } else {
        btn.disabled = false;
        btn.classList.remove('loading');
    }
};

// ============================================================
// LOG ACTIVITY TO FIREBASE
// ============================================================

const logActivity = async (ip, userType, targetUrl) => {
    try {
        let deviceId = localStorage.getItem('reaction_device_id');
        if (!deviceId) {
            deviceId = 'device_' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
            localStorage.setItem('reaction_device_id', deviceId);
        }

        const data = {
            ip: ip,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            deviceId: deviceId,
            userType: userType,
            targetUrl: targetUrl
        };

        await push(ref(rtdb, 'logs/activity'), data);
    } catch (e) { /* ignore */ }
};

// ============================================================
// UPDATE LIMIT DISPLAY
// ============================================================

const updateLimitDisplay = async () => {
    const el = document.getElementById('limitDisplayText');
    if (!el) return;

    try {
        // Ambil config limit dari Firebase
        const configSnap = await get(ref(rtdb, 'config/limits')).catch(() => null);
        let config = {
            isEnabled: true,
            freeLimit: 3  // 🔥 GANTI ANGKA INI UNTUK UBAH LIMIT!
        };

        if (configSnap && configSnap.exists()) {
            config = { ...config, ...configSnap.val() };
        }

        const lang = localStorage.getItem('preferredLanguage') === 'en' ? 'en' : 'id';

        if (!config.isEnabled) {
            el.innerHTML = lang === 'en' ? 'Service Disabled' : 'Layanan Dinonaktifkan';
            return;
        }

        const maxLimit = config.freeLimit;
        let usedToday = 0;

        // Ambil user
        const user = auth.currentUser;
        let userKey = null;

        if (user && !user.isAnonymous) {
            userKey = 'user_' + user.uid;
        } else {
            // Coba ambil IP
            try {
                const ipRes = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipRes.json();
                if (ipData && ipData.ip && ipData.ip !== '0.0.0.0') {
                    userKey = 'ip_' + ipData.ip.replace(/\./g, '_').replace(/:/g, '_');
                }
            } catch (e) { /* ignore */ }
        }

        if (userKey) {
            try {
                const today = new Date().toLocaleDateString('en-CA', {
                    timeZone: 'Asia/Jakarta'
                });
                const snap = await get(ref(rtdb, 'limits/' + userKey + '/' + today));
                if (snap.exists()) {
                    usedToday = parseInt(snap.val());
                }
            } catch (e) { /* ignore */ }
        }

        let remaining = Math.max(0, maxLimit - usedToday);
        let purchasedLimit = 0;

        // Cek purchased limit
        if (user && !user.isAnonymous) {
            try {
                const purchaseSnap = await get(ref(rtdb, 'users/' + user.uid + '/purchased_limit'));
                if (purchaseSnap.exists()) {
                    purchasedLimit = parseInt(purchaseSnap.val());
                }
            } catch (e) { /* ignore */ }
        }

        if (purchasedLimit > 0) {
            el.innerHTML = lang === 'en' ?
                'Remaining Limit: <b>' + purchasedLimit + '</b> (Daily: <span style="color:#888;">' + remaining + ')</span>' :
                'Sisa Limit: <b>' + purchasedLimit + '</b> (Harian: <span style="color:#888;">' + remaining + ')</span>';
        } else {
            el.innerHTML = lang === 'en' ?
                'Remaining: <b>' + remaining + '</b> / ' + maxLimit + ' <span style="font-size:12px;color:#888;">(daily)</span>' :
                'Sisa: <b>' + remaining + '</b> / ' + maxLimit + ' <span style="font-size:12px;color:#888;">(harian)</span>';
        }

    } catch (e) {
        const lang = localStorage.getItem('preferredLanguage') === 'en' ? 'en' : 'id';
        el.removeAttribute('data-i18n');
        el.innerHTML = lang === 'en' ? 'Failed to load limit' : 'Gagal memuat limit';
    }
};

// ============================================================
// FORM SUBMIT
// ============================================================

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ambil user
    const user = auth.currentUser;

    // Cek login
    if (!user || user.isAnonymous) {
        showSnackbar('error', 'Silakan login terlebih dahulu!');
        const loginBtn = document.getElementById('google-login-btn');
        if (loginBtn) loginBtn.click();
        return;
    }

    const url = urlInput.value.trim();
    const emojisRaw = emojiInput.value.trim();
    const captchaToken = typeof turnstile !== 'undefined' && window.turnstileWidgetId !== undefined ?
        turnstile.getResponse(window.turnstileWidgetId) :
        null;

    // Validasi captcha
    if (!captchaToken) {
        showSnackbar('error', 'Harap selesaikan verifikasi keamanan!');
        return;
    }

    // Validasi URL
    if (!url || !emojisRaw) {
        showSnackbar('error', 'Harap isi semua field!');
        return;
    }

    if (!url.includes('whatsapp.com/channel/')) {
        showSnackbar('error', 'URL harus dari Saluran WhatsApp!');
        return;
    }

    // Parse emojis
    const emojis = emojisRaw.split(',').map(e => e.trim()).filter(e => e);
    if (emojis.length > 5) {
        showLimitModal('Maksimal 5 emoji!', 'Terlalu Banyak Emoji', 'daily');
        return;
    }

    // Loading
    setLoading(submitBtn, true);

    try {
        // Tunggu auth selesai
        await waitForAuth();

        // Log IP
        try {
            let ip = '0.0.0.0';
            try {
                const ipRes = await (await fetch('https://api.ipify.org?format=json')).json();
                if (ipRes && ipRes.ip) ip = ipRes.ip;
            } catch (e) { /* ignore */ }
            logActivity(ip, 'free', url);
        } catch (e) { /* ignore */ }

        // Kirim reaksi
        await sendReactionFree({
            postUrl: url,
            reactions: emojis,
            captchaToken: captchaToken
        });

        // Update limit di Firebase
        try {
            const user = auth.currentUser;
            if (user && !user.isAnonymous) {
                const today = new Date().toLocaleDateString('en-CA', {
                    timeZone: 'Asia/Jakarta'
                });
                const dailyRef = ref(rtdb, 'limits/' + user.uid + '/' + today);
                const purchaseRef = ref(rtdb, 'users/' + user.uid + '/purchased_limit');

                const [dailySnap, purchaseSnap, configSnap] = await Promise.all([
                    get(dailyRef).catch(() => null),
                    get(purchaseRef).catch(() => null),
                    get(ref(rtdb, 'config/limits')).catch(() => null)
                ]);

                const maxLimit = configSnap && configSnap.exists() && configSnap.val().freeLimit !== undefined ?
                    parseInt(configSnap.val().freeLimit) :
                    1;

                let dailyCount = dailySnap && dailySnap.exists() ? parseInt(dailySnap.val()) : 0;
                let purchased = purchaseSnap && purchaseSnap.exists() ? parseInt(purchaseSnap.val()) : 0;

                if (dailyCount < maxLimit) {
                    await set(dailyRef, dailyCount + 1);
                } else if (purchased > 0) {
                    await set(purchaseRef, purchased - 1);
                }
            }
        } catch (e) { /* ignore */ }

        // Update total reaksi global
        try {
            const totalRef = ref(rtdb, 'stats/total_reactions');
            await set(totalRef, increment(1));
        } catch (e) { /* ignore */ }

        // Show success
        showSuccessModal('Reaksi berhasil dikirim!');
        urlInput.value = '';
        emojiInput.value = '';
        await updateLimitDisplay();

    } catch (error) {
        let errorMsg = '';

        if (typeof error === 'string') {
            errorMsg = error;
        } else if (error && typeof error.message === 'string') {
            errorMsg = error.message;
        } else if (error && typeof error.error === 'string') {
            errorMsg = error.error;
        } else if (error) {
            try {
                errorMsg = JSON.stringify(error);
            } catch (e) {
                errorMsg = String(error);
            }
        }

        if (!errorMsg || errorMsg.includes('VPN')) {
            errorMsg = 'VPN terdeteksi! Matikan VPN untuk menggunakan layanan.';
        } else if (errorMsg.includes('Failed to fetch')) {
            errorMsg = 'Koneksi ke server terputus. Pastikan internet stabil.';
        } else if (errorMsg.includes('limit')) {
            errorMsg = 'Limit harian sudah habis. Top up atau tunggu besok.';
        }

        showSnackbar('error', 'Gagal: ' + errorMsg);

    } finally {
        setLoading(submitBtn, false);
        // Reset captcha
        if (typeof turnstile !== 'undefined') {
            try {
                if (window.turnstileWidgetId !== undefined) {
                    turnstile.reset(window.turnstileWidgetId);
                } else {
                    turnstile.reset();
                }
            } catch (e) { /* ignore */ }
        }
    }
});

// ============================================================
// INIT
// ============================================================

updateLimitDisplay();
