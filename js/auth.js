// ============================================================
// AUTH.JS - REACTION WA AUTHENTICATION (DE-OBFUSCATED & RAPIH)
// ============================================================

import {
    auth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    getLinks
} from '/js/database.js';

import {
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// ============================================================
// INJECT SIDEBAR & LOGIN BUTTON
// ============================================================

const initAuth = () => {
    const loginContainer = document.getElementById('auth-container');

    // === CEK APAKAH ELEMEN LOGIN SUDAH ADA ===
    if (loginContainer && !document.getElementById('google-login-btn')) {
        
        // ===== BUAT TOMBOL GOOGLE LOGIN =====
        const loginBtn = document.createElement('button');
        loginBtn.id = 'google-login-btn';
        loginBtn.className = 'wa-btn-login';
        loginBtn.textContent = 'Login with Google';
        loginContainer.appendChild(loginBtn);

        // ===== BUAT SIDEBAR =====
        const sidebar = document.getElementById('sidebar');
        const sidebarContent = document.createElement('div');
        sidebarContent.id = 'sidebar-content';

        const sidebarLinks = document.createElement('div');
        sidebarLinks.id = 'sidebar-links';

        // ===== DETERMINASI BASE PATH =====
        const basePath = window.location.pathname.endsWith('ReactWA/') ||
                         window.location.pathname.endsWith('ReactWA/index.html') ? './' : '../';

        // ===== INJECT LINK SIDEBAR =====
        sidebarLinks.innerHTML = `
            <a href="${basePath}VIP/" class="sidebar-link">
                <i data-lucide="crown" style="width:18px; height:18px;"></i>
                <span data-i18n="nav_buy_vip">Beli VIP</span>
            </a>
            <a href="${basePath}Topup/" class="sidebar-link">
                <i data-lucide="zap" style="width:18px; height:18px;"></i>
                <span data-i18n="nav_topup">Top Up Limit</span>
            </a>
            <a href="${basePath}History/" class="sidebar-link">
                <i data-lucide="history" style="width:18px; height:18px;"></i>
                <span data-i18n="nav_history">Riwayat Transaksi</span>
            </a>
            <div class="sidebar-divider"></div>
            <a href="${basePath}" class="sidebar-link">
                <i data-lucide="home" style="width:18px; height:18px;"></i>
                <span data-i18n="nav_home">Beranda</span>
            </a>
        `;

        sidebarContent.appendChild(sidebarLinks);
        document.body.appendChild(sidebarContent);

        // ===== SET LANGUAGE =====
        if (typeof setLanguage === 'function' && typeof getInitialLanguage === 'function') {
            setLanguage(getInitialLanguage());
        }

        // ===== BUAT TOGGLE SIDEBAR =====
        const toggleBtn = document.createElement('div');
        toggleBtn.className = 'sidebar-toggle';
        toggleBtn.innerHTML = '☰';
        toggleBtn.style.cssText = 'position:fixed; top:10px; left:10px; z-index:9999; cursor:pointer; font-size:24px;';
        document.querySelector('body').appendChild(toggleBtn);

        // ===== TOGGLE FUNCTION =====
        const toggleSidebar = () => {
            sidebarContent.classList.toggle('open');
            sidebar.classList.toggle('open');
        };

        loginBtn.addEventListener('click', toggleSidebar);
        document.getElementById('sidebar-overlay')?.addEventListener('click', toggleSidebar);
        sidebarContent.addEventListener('click', toggleSidebar);

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // ============================================================
    // HANDLE AUTH STATE
    // ============================================================

    const loginButtons = document.querySelectorAll('.wa-btn-login');

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // ===== USER LOGIN: TAMPILKAN PROFILE =====
            try {
                const links = await getLinks();
                let response;

                if (links?.queueKey) {
                    response = await fetch(links.queueKey);
                } else {
                    response = await fetch('https://api.ipify.org?format=json');
                }

                const data = await response.json();

                // ===== SIMPAN IP USER KE FIREBASE =====
                if (data && data.ip) {
                    const { rtdb, ref, update } = await import('/js/database.js');
                    await update(ref(rtdb, 'users/' + user.uid), {
                        ip: data.ip,
                        last_login: new Date().toISOString()
                    });
                }
            } catch (e) { /* ignore */ }

            // ===== UPDATE UI LOGIN BUTTON =====
            loginButtons.forEach(async (btn) => {
                if (user && !user.isAnonymous) {
                    const name = user.displayName ? user.displayName.split(' ')[0] : 'User';
                    const avatarBase = (await getLinks()).avatarBase || 'https://api.dicebear.com/7.x/avataaars/svg?seed=';
                    const avatarUrl = user.photoURL || avatarBase + name;

                    btn.innerHTML = `
                        <img src="${avatarUrl}" style="width:24px; height:24px; border-radius:50%;">
                        <span>${name}</span>
                        <i data-lucide="chevron-down" style="width:16px; height:16px;"></i>
                    `;
                    btn.classList.remove('login-btn');
                    btn.classList.add('logged-in');

                    // ===== LOGOUT =====
                    btn.onclick = async (e) => {
                        e.preventDefault();
                        if (confirm('Yakin mau logout?')) {
                            try {
                                localStorage.removeItem('vip_key');
                                localStorage.removeItem('vip_activated');
                                await signOut(auth);
                                window.location.reload();
                            } catch (e) { /* ignore */ }
                        }
                    };
                } else {
                    // ===== BELUM LOGIN: TAMPILKAN TOMBOL LOGIN =====
                    btn.innerHTML = `
                        <span data-i18n="nav_login">Login</span>
                        <i data-lucide="chevron-right" style="width:16px; height:16px;"></i>
                    `;
                    btn.classList.remove('logged-in');

                    if (window.lucide) {
                        window.lucide.createIcons();
                    }

                    // ===== LOGIN =====
                    btn.onclick = async (e) => {
                        e.preventDefault();
                        const provider = new GoogleAuthProvider();
                        try {
                            btn.innerHTML = 'Loading...';
                            await signInWithPopup(auth, provider);
                            window.location.reload();
                        } catch (error) {
                            let message = 'Terjadi kesalahan saat login. Silakan coba lagi.';
                            if (error.code === 'auth/popup-closed-by-user' || 
                                error.code === 'auth/cancelled-popup-request') {
                                message = 'Login dibatalkan.';
                            }

                            const snackbar = document.getElementById('snackbar');
                            if (snackbar) {
                                const textEl = document.getElementById('snackbarText');
                                const iconEl = document.getElementById('snackbarIcon');

                                snackbar.className = 'snackbar-container error';
                                if (textEl) textEl.textContent = message;
                                if (iconEl) iconEl.innerHTML = '<i data-lucide="alert-circle"></i>';
                                if (window.lucide) window.lucide.createIcons();

                                setTimeout(() => {
                                    snackbar.className = snackbar.className.replace('error', '');
                                }, 3000);
                            } else {
                                alert(message);
                            }

                            btn.innerHTML = `
                                <span data-i18n="nav_login">Login</span>
                                <i data-lucide="chevron-right" style="width:16px; height:16px;"></i>
                            `;
                            if (window.lucide) window.lucide.createIcons();
                        }
                    };
                }
            });
        }
    });
};

// ============================================================
// RUN
// ============================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
              }
