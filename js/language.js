// ============================================================
// LANGUAGE.JS - MULTI BAHASA REACTION WA (DE-OBFUSCATED & RAPIH)
// ============================================================

// ============================================================
// TRANSLATIONS OBJECT
// ============================================================

const translations = {
    'id': {
        'page_title': 'Auto React WA - Free',
        'nav_home': 'Beranda',
        'nav_history': 'Riwayat Transaksi',
        'nav_topup': 'Top Up Limit',
        'nav_topup_btn': 'Top Up Limit',
        'nav_buy_vip': 'Beli VIP',
        'nav_buy_vip_btn': 'Beli VIP',
        'nav_features': 'Fitur',
        'nav_official': 'Official Website',
        'nav_store': 'Web Store',
        'nav_login': 'Login',
        'nav_download': 'Unduh',
        'nav_back': 'Kembali',
        'main_title': 'Auto React WhatsApp Channel',
        'main_desc': 'Kirim reaksi massal ke Saluran Pesan dengan cepat, mudah, dan privasi yang terjaga. Pilih paket yang sesuai dengan kebutuhan Anda.',
        'btn_vip': 'Akses VIP',
        'btn_free': 'Coba Gratis',
        'feature_1': 'Kirim Reaksi Massal',
        'feature_2': '100% Aman',
        'feature_3': 'Tanpa Iklan',
        'footer_download': 'Unduh',
        'footer_legal': 'Ketentuan & Kebijakan Privasi',
        'feature_drop_1': 'Kustomisasi Mudah',
        'feature_drop_2': 'Tanpa Iklan',
        'feature_drop_3': 'Tanpa Batas Untuk VIP',
        'feature_drop_4': 'Prioritas Support',
        'admin_sidebar_dash': 'Dashboard',
        'admin_sidebar_config': 'Konfigurasi',
        'admin_sidebar_stats': 'Statistik',
        'admin_sidebar_users': 'Pengguna',
        'admin_sidebar_billing': 'Tagihan',
        'admin_sidebar_logout': 'Keluar',
        'admin_header_search': 'Cari data...',
        'admin_header_admin': 'Admin Panel',
        'admin_dash_title': 'Dashboard Overview',
        'admin_dash_total_reaction': 'Total Reaksi Terkirim',
        'admin_dash_active_vip': 'VIP Aktif',
        'admin_dash_system_status': 'Status Sistem',
        'admin_dash_online': 'Online',
        'admin_dash_recent_activity': 'Aktivitas Terbaru',
        'admin_dash_refresh': 'Refresh',
        'admin_table_time': 'Waktu',
        'admin_table_user': 'Pengguna',
        'admin_table_action': 'Aksi',
        'admin_table_status': 'Status',
        'admin_table_loading': 'Memuat data...',
        'admin_config_title': 'Konfigurasi Sistem',
        'admin_config_save': 'Simpan Konfigurasi',
        'admin_config_session': 'Session Token',
        'admin_config_delay': 'Delay Per Reaksi (ms)',
        'admin_config_max': 'Max Reaksi Per Post',
        'vip_title': 'Akses VIP.',
        'vip_desc': 'Kirim reaksi tanpa batas ke Saluran WhatsApp manapun. Nikmati fitur eksklusif dan prioritas antrean.',
        'vip_key_label': 'Kode Akses VIP',
        'vip_key_ph': 'Masukkan kode akses...',
        'vip_unlock_btn': 'Buka Kunci Akses',
        'vip_buy_btn': 'Beli VIP',
        'vip_free_btn': 'Versi Gratis',
        'vip_active_title': 'VIP Aktif',
        'vip_active_desc': 'Anda sedang dalam mode VIP. Kirim reaksi tanpa batas!',
        'vip_url_label': 'URL Postingan Saluran',
        'vip_url_ph': 'Contoh: https://whatsapp.com/channel/...',
        'vip_emoji_label': 'Reaction Emojis',
        'vip_emoji_ph': 'Contoh: 🥳,😹,👍',
        'vip_emoji_limit': 'Maksimal 10 emoji',
        'vip_submit_btn': 'Kirim Reaction VIP',
        'vip_logout_btn': 'Logout dari VIP',
        'free_title': 'Versi Gratis.',
        'free_desc': 'Kirim reaksi massal ke Saluran WhatsApp manapun secara instan. Tanpa perlu mendaftar, cukup masukkan URL dan pilih emoji favorit Anda.',
        'free_limit_loading': 'Memuat sisa limit...',
        'free_url_label': 'URL Postingan Saluran',
        'free_url_ph': 'Contoh: https://whatsapp.com/channel/...',
        'free_emoji_label': 'Reaction Emojis',
        'free_emoji_ph': 'Contoh: 🥳,😹,👍',
        'free_emoji_hint': 'Pisahkan dengan koma jika lebih dari satu.',
        'free_submit_btn': 'Kirim Reaction',
        'free_topup_btn': 'Top Up Limit',
        'free_upgrade_btn': 'Upgrade VIP',
        'payment_title': 'Beli VIP',
        'payment_price': 'Harga',
        'payment_feat_1': 'Reaksi Tak Terbatas',
        'payment_feat_1_desc': 'Kirim reaksi tanpa batas ke Saluran WhatsApp manapun.',
        'payment_feat_2': 'Massive Emojis',
        'payment_feat_2_desc': 'Kirim hingga 100+ emoji sekaligus dalam satu klik.',
        'payment_feat_3': 'Akses Prioritas',
        'payment_feat_3_desc': 'Antrean instan & akses Rest API eksklusif.',
        'payment_feat_4': 'Tanpa Iklan',
        'payment_feat_4_desc': 'Nikmati pengalaman tanpa gangguan iklan.',
        'payment_feat_5': 'Reaksi Cepat',
        'payment_feat_5_desc': 'Kirim lebih dari 1000+ reaksi dalam satu waktu.',
        'payment_total': 'Total Harga:',
        'payment_order_id': 'Order ID:',
        'payment_total_bill': 'Total Tagihan:',
        'payment_countdown': 'Waktu tersisa:',
        'payment_btn': 'Bayar Sekarang',
        'payment_secure': 'Pembayaran Aman & Terenkripsi',
        'pay_loading_title': 'Memproses Pembayaran...',
        'pay_loading_desc': 'Mohon tunggu sebentar, sedang memproses...',
        'pay_success_title': 'Pembayaran Berhasil!',
        'pay_success_desc': 'Selamat! Akses VIP Anda telah aktif.',
        'pay_success_code': 'Kode Akses VIP Anda:',
        'pay_success_copy': 'Salin Kode',
        'pay_success_warning': 'Simpan kode ini baik-baik! Kode hanya ditampilkan sekali dan tidak dapat dipulihkan jika hilang.',
        'pay_success_btn': 'Gunakan Sekarang',
        'pay_error_title': 'Verifikasi Gagal',
        'pay_error_desc': 'Pembayaran gagal diproses. Silakan coba lagi.',
        'pay_retry_btn': 'Coba Lagi',
        'topup_title': 'Beli Limit Tambahan',
        'topup_price': 'Harga',
        'topup_limit': 'Limit',
        'topup_min_buy': 'Minimal pembelian',
        'topup_input_label': 'Jumlah Limit yang Dibeli',
        'topup_input_ph': 'Contoh: 100, 500, 1000',
        'topup_min_alert': 'Minimal pembelian adalah 100 limit.',
        'topup_support': 'Mendukung pembayaran via QRIS, GoPay, OVO, Dana, dll.',
        'topup_success_title': 'Top Up Berhasil!',
        'topup_success_desc': 'Terima kasih. Limit ekstra Anda telah ditambahkan ke akun.',
        'topup_success_order_id': 'Order ID:',
        'topup_success_status': 'Status:',
        'topup_success_status_ok': 'Berhasil',
        'topup_success_limit_added': 'Limit Ditambahkan',
        'history_title': 'Riwayat Transaksi',
        'history_desc': 'Lihat riwayat pembelian dan penggunaan limit Anda.',
        'terms_title': 'Ketentuan & Kebijakan',
        'terms_desc': 'Penting untuk membaca dan memahami kebijakan kami sebelum menggunakan layanan Reaction WA.',
        'terms_card1_title': 'Pihak Ketiga Independen',
        'terms_card1_desc': 'Reaction WA adalah layanan independen dan tidak terafiliasi dengan WhatsApp Inc.',
        'terms_card2_title': 'Penggunaan Pribadi',
        'terms_card2_desc': 'Layanan ini hanya untuk penggunaan pribadi dan tidak untuk tujuan komersial tanpa izin.',
        'terms_card3_title': 'Kebijakan Penggunaan',
        'terms_card3_desc': 'Dilarang menggunakan layanan ini untuk spam, pelecehan, atau aktivitas ilegal lainnya.'
    },
    'en': {
        'page_title': 'Auto React WA - Free',
        'nav_home': 'Home',
        'nav_history': 'Transaction History',
        'nav_topup': 'Top Up Limit',
        'nav_topup_btn': 'Top Up Limit',
        'nav_buy_vip': 'Buy VIP',
        'nav_buy_vip_btn': 'Buy VIP',
        'nav_features': 'Features',
        'nav_official': 'Official Website',
        'nav_store': 'Web Store',
        'nav_login': 'Login',
        'nav_download': 'Download',
        'nav_back': 'Back',
        'main_title': 'Auto React WhatsApp Channel',
        'main_desc': 'Send mass reactions to WhatsApp Channels quickly, easily, and with privacy. Choose the package that suits your needs.',
        'btn_vip': 'VIP Access',
        'btn_free': 'Try Free',
        'feature_1': 'Mass Reactions',
        'feature_2': '100% Safe',
        'feature_3': 'No Ads',
        'footer_download': 'Download',
        'footer_legal': 'Terms & Privacy Policy',
        'feature_drop_1': 'Easy Customization',
        'feature_drop_2': 'No Ads',
        'feature_drop_3': 'Unlimited For VIP',
        'feature_drop_4': 'Priority Support',
        'admin_sidebar_dash': 'Dashboard',
        'admin_sidebar_config': 'Configuration',
        'admin_sidebar_stats': 'Statistics',
        'admin_sidebar_users': 'Users',
        'admin_sidebar_billing': 'Billing',
        'admin_sidebar_logout': 'Logout',
        'admin_header_search': 'Search data...',
        'admin_header_admin': 'Admin Panel',
        'admin_dash_title': 'Dashboard Overview',
        'admin_dash_total_reaction': 'Total Reactions Sent',
        'admin_dash_active_vip': 'Active VIP',
        'admin_dash_system_status': 'System Status',
        'admin_dash_online': 'Online',
        'admin_dash_recent_activity': 'Recent Activity',
        'admin_dash_refresh': 'Refresh',
        'admin_table_time': 'Time',
        'admin_table_user': 'User',
        'admin_table_action': 'Action',
        'admin_table_status': 'Status',
        'admin_table_loading': 'Loading data...',
        'admin_config_title': 'System Configuration',
        'admin_config_save': 'Save Configuration',
        'admin_config_session': 'Session Token',
        'admin_config_delay': 'Delay Per Reaction (ms)',
        'admin_config_max': 'Max Reaction Per Post',
        'vip_title': 'VIP Access.',
        'vip_desc': 'Send unlimited reactions to any WhatsApp Channel. Enjoy exclusive features and priority queue.',
        'vip_key_label': 'VIP Access Code',
        'vip_key_ph': 'Enter access code...',
        'vip_unlock_btn': 'Unlock Access',
        'vip_buy_btn': 'Buy VIP',
        'vip_free_btn': 'Free Version',
        'vip_active_title': 'VIP Active',
        'vip_active_desc': 'You are in VIP mode. Send unlimited reactions!',
        'vip_url_label': 'Channel Post URL',
        'vip_url_ph': 'Example: https://whatsapp.com/channel/...',
        'vip_emoji_label': 'Reaction Emojis',
        'vip_emoji_ph': 'Example: 🥳,😹,👍',
        'vip_emoji_limit': 'Maximum 10 emojis',
        'vip_submit_btn': 'Send VIP Reaction',
        'vip_logout_btn': 'Logout from VIP',
        'free_title': 'Free Version.',
        'free_desc': 'Send mass reactions to any WhatsApp Channel instantly. No registration needed, just enter the URL and choose your favorite emojis.',
        'free_limit_loading': 'Loading remaining limit...',
        'free_url_label': 'Channel Post URL',
        'free_url_ph': 'Example: https://whatsapp.com/channel/...',
        'free_emoji_label': 'Reaction Emojis',
        'free_emoji_ph': 'Example: 🥳,😹,👍',
        'free_emoji_hint': 'Separate with commas if more than one.',
        'free_submit_btn': 'Send Reaction',
        'free_topup_btn': 'Top Up Limit',
        'free_upgrade_btn': 'Upgrade VIP',
        'payment_title': 'Buy VIP',
        'payment_price': 'Price',
        'payment_feat_1': 'Unlimited Reactions',
        'payment_feat_1_desc': 'Send unlimited reactions to any WhatsApp Channel.',
        'payment_feat_2': 'Massive Emojis',
        'payment_feat_2_desc': 'Send up to 100+ emojis simultaneously in one click.',
        'payment_feat_3': 'Priority Access',
        'payment_feat_3_desc': 'Instant queue & exclusive Rest API access.',
        'payment_feat_4': 'No Ads',
        'payment_feat_4_desc': 'Enjoy ad-free experience.',
        'payment_feat_5': 'Fast Reactions',
        'payment_feat_5_desc': 'Send more than 1000+ reactions at once.',
        'payment_total': 'Total Price:',
        'payment_order_id': 'Order ID:',
        'payment_total_bill': 'Total Bill:',
        'payment_countdown': 'Time remaining:',
        'payment_btn': 'Pay Now',
        'payment_secure': 'Secure & Encrypted Payment',
        'pay_loading_title': 'Processing Payment...',
        'pay_loading_desc': 'Please wait a moment, processing...',
        'pay_success_title': 'Payment Successful!',
        'pay_success_desc': 'Congratulations! Your VIP access is now active.',
        'pay_success_code': 'Your VIP Access Code:',
        'pay_success_copy': 'Copy Code',
        'pay_success_warning': 'Save this code carefully! The code is only shown once and cannot be recovered if lost.',
        'pay_success_btn': 'Use Now',
        'pay_error_title': 'Verification Failed',
        'pay_error_desc': 'Payment processing failed. Please try again.',
        'pay_retry_btn': 'Try Again',
        'topup_title': 'Buy Additional Limit',
        'topup_price': 'Price',
        'topup_limit': 'Limit',
        'topup_min_buy': 'Minimum purchase',
        'topup_input_label': 'Amount of Limit to Buy',
        'topup_input_ph': 'Example: 100, 500, 1000',
        'topup_min_alert': 'Minimum purchase is 100 limit.',
        'topup_support': 'Supports payment via QRIS, GoPay, OVO, Dana, etc.',
        'topup_success_title': 'Top Up Successful!',
        'topup_success_desc': 'Thank you. Your extra limit has been added to your account.',
        'topup_success_order_id': 'Order ID:',
        'topup_success_status': 'Status:',
        'topup_success_status_ok': 'Success',
        'topup_success_limit_added': 'Limit Added',
        'history_title': 'Transaction History',
        'history_desc': 'View your purchase history and limit usage.',
        'terms_title': 'Terms & Policy',
        'terms_desc': 'It is important to read and understand our policy before using Reaction WA service.',
        'terms_card1_title': 'Independent Third Party',
        'terms_card1_desc': 'Reaction WA is an independent service and is not affiliated with WhatsApp Inc.',
        'terms_card2_title': 'Personal Use',
        'terms_card2_desc': 'This service is for personal use only and not for commercial purposes without permission.',
        'terms_card3_title': 'Usage Policy',
        'terms_card3_desc': 'This service may not be used for spam, harassment, or other illegal activities.'
    }
};

const defaultLang = 'id';

// ============================================================
// SET LANGUAGE
// ============================================================

function setLanguage(lang) {
    if (!translations[lang]) lang = defaultLang;
    
    // Simpan ke localStorage
    localStorage.setItem('reaction_wa_lang', lang);
    
    // Update title
    if (translations[lang].page_title) {
        document.title = translations[lang].page_title;
    }
    
    // Update semua elemen dengan data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = translations[lang][key] || translations[defaultLang][key];
        if (text) {
            if (text.includes('<')) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        }
    });
    
    // Update placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const text = translations[lang][key] || translations[defaultLang][key];
        if (text) {
            el.setAttribute('placeholder', text);
        }
    });
    
    // Update language button text
    const langBtn = document.getElementById('current-lang-text');
    if (langBtn) {
        langBtn.textContent = lang === 'id' ? 'Bahasa Indonesia' : 'English';
    }
    
    // Update active class di dropdown
    document.querySelectorAll('.custom-option').forEach(opt => {
        opt.classList.remove('active');
        if (opt.getAttribute('data-value') === lang) {
            opt.classList.add('active');
        }
    });
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { lang }
    }));
}

// ============================================================
// DETECT LANGUAGE
// ============================================================

function detectLanguage() {
    // Cek localStorage
    const saved = localStorage.getItem('reaction_wa_lang');
    if (saved && translations[saved]) {
        return saved;
    }
    
    // Cek browser language
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
        return browserLang;
    }
    
    return defaultLang;
}

// ============================================================
// INIT LANGUAGE
// ============================================================

function initLanguage() {
    const lang = detectLanguage();
    setLanguage(lang);
    
    // ===== DROPDOWN LANGUAGE =====
    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.getElementById('lang-options');
    const langOptions = document.querySelectorAll('.custom-option');
    
    if (langBtn && langDropdown) {
        // Toggle dropdown
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });
        
        // Pilih bahasa
        langOptions.forEach(opt => {
            opt.addEventListener('click', function() {
                const val = this.getAttribute('data-value');
                setLanguage(val);
                langDropdown.classList.remove('show');
            });
        });
        
        // Tutup dropdown saat klik di luar
        document.addEventListener('click', function(e) {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('show');
            }
        });
    }
}

// ============================================================
// RUN
// ============================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}
