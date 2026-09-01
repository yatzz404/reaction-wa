// ============================================================
// SECURITY.JS - ANTI DEBUG & ANTI INSPECT (DE-OBFUSCATED & RAPIH)
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 1. MATIKAN SEMUA FUNGSI CONSOLE
    // ============================================================

    const noop = function() {};

    const consoleMethods = [
        'log', 'debug', 'info', 'error', 'warn',
        'table', 'trace', 'dir', 'dirxml',
        'group', 'groupCollapsed', 'groupEnd',
        'profile', 'profileEnd', 'time', 'timeEnd',
        'count', 'assert'
    ];

    consoleMethods.forEach(method => {
        try {
            console[method] = noop;
        } catch (e) { /* ignore */ }
    });

    // ============================================================
    // 2. BERSIHKAN CONSOLE SETIAP 500ms
    // ============================================================

    const disableConsole = () => {
        try {
            console.clear();
        } catch (e) { /* ignore */ }

        // Matikan lagi (jika ada yang restore)
        const noop2 = function() {};
        consoleMethods.forEach(m => {
            try {
                console[m] = noop2;
            } catch (e) { /* ignore */ }
        });
    };

    // Jalankan pertama kali
    disableConsole();

    // Jalankan setiap 500ms
    setInterval(disableConsole, 500);

    // ============================================================
    // 3. DETEKSI DEVTOOLS (performance check)
    // ============================================================

    setInterval(() => {
        try {
            const start = performance.now();

            // Debugger trap - jika DevTools terbuka, ini akan jalan lebih lambat
            (function() {}).constructor('debugger')();

            const end = performance.now();

            // Jika selisih > 100ms, berarti DevTools terbuka!
            if (end - start > 100) {
                disableConsole();
            }
        } catch (e) { /* ignore */ }
    }, 500);

    // ============================================================
    // 4. BLOKIR SHORTCUT DEVTOOLS
    // ============================================================

    window.addEventListener('keydown', function(e) {
        // F12 (keyCode 123)
        const isF12 = e.keyCode === 123;

        // Ctrl+Shift+I (73), Ctrl+Shift+J (74), Ctrl+Shift+C (67)
        const isDevShortcut = e.ctrlKey && e.shiftKey && (
            e.keyCode === 73 || // I
            e.keyCode === 74 || // J
            e.keyCode === 67    // C
        );

        // Ctrl+U (85) - view source
        const isViewSource = e.ctrlKey && e.keyCode === 85;

        if (isF12 || isDevShortcut || isViewSource) {
            try {
                e.preventDefault();
                e.stopPropagation();
                console.clear();
            } catch (e) { /* ignore */ }
            return false;
        }
    }, false);

    // ============================================================
    // 5. BLOKIR KLIK KANAN (context menu)
    // ============================================================

    window.addEventListener('contextmenu', function(e) {
        try {
            e.preventDefault();
            e.stopPropagation();
            console.clear();
        } catch (e) { /* ignore */ }
        return false;
    });

    // ============================================================
    // 6. FREEZE CONSOLE (biar gak bisa diubah)
    // ============================================================

    try {
        Object.freeze(console);
    } catch (e) { /* ignore */ }

})();
