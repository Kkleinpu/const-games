/* ============================================
   PROTOCOL ZERO — 3D & Advanced Effects JS
   Fixed: no translateZ, safe 2D/3D hybrid
   ============================================ */
(function() {
    "use strict";

    /* === 1. Starfield (lightweight canvas) === */
    function initStarfield() {
        const canvas = document.createElement("canvas");
        canvas.className = "starfield-canvas";
        document.body.prepend(canvas);
        const ctx = canvas.getContext("2d");
        let w, h, stars = [], raf;
        const COUNT = 100;

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        function createStars() {
            stars = [];
            for (let i = 0; i < COUNT; i++) {
                stars.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    z: Math.random() * 2 + 0.5,
                    r: Math.random() * 1.5 + 0.3,
                    speed: Math.random() * 0.3 + 0.05,
                    alpha: Math.random() * 0.5 + 0.2
                });
            }
        }
        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (const s of stars) {
                s.y += s.speed * s.z;
                if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(200,220,255," + s.alpha + ")";
                ctx.fill();
            }
            raf = requestAnimationFrame(draw);
        }
        resize();
        createStars();
        draw();
        window.addEventListener("resize", function() { resize(); createStars(); }, { passive: true });
    }

    /* === 2. Aurora Overlay === */
    function initAurora() {
        const el = document.createElement("div");
        el.className = "aurora-overlay";
        document.body.prepend(el);
    }

    /* === 3. 3D Card Tilt === */
    function initCardTilt() {
        document.querySelectorAll(".game-card, .tool-card, .stats-card, .featured-card").forEach(function(card) {
            if (card._tiltInit) return;
            card._tiltInit = true;
            card.addEventListener("mousemove", function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;
                const tiltX = ((y - cy) / cy) * -8;
                const tiltY = ((x - cx) / cx) * 8;
                card.style.setProperty("--tilt-x", tiltX + "deg");
                card.style.setProperty("--tilt-y", tiltY + "deg");
            }, { passive: true });
            card.addEventListener("mouseleave", function() {
                card.style.setProperty("--tilt-x", "0deg");
                card.style.setProperty("--tilt-y", "0deg");
            }, { passive: true });
        });
    }

    /* === 4. Section Reveal on Scroll === */
    function initScrollReveal3D() {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        document.querySelectorAll(".section-header.reveal, .game-card").forEach(function(el) {
            if (!el._revealObserved) {
                el._revealObserved = true;
                observer.observe(el);
            }
        });
    }

    /* === 5. Navbar Scroll === */
    function initNavbar3D() {
        var navbar = document.querySelector(".navbar");
        if (!navbar) return;
        var ticking = false;
        window.addEventListener("scroll", function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    if (window.scrollY > 50) {
                        navbar.classList.add("scrolled");
                    } else {
                        navbar.classList.remove("scrolled");
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /* === 6. Magnetic Button === */
    function initMagneticButtons() {
        document.querySelectorAll(".hero-btn, .entry-btn").forEach(function(btn) {
            if (btn._magInit) return;
            btn._magInit = true;
            btn.addEventListener("mousemove", function(e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = "translate(" + (x * 0.12) + "px," + (y * 0.12) + "px) scale(1.06)";
            }, { passive: true });
            btn.addEventListener("mouseleave", function() {
                btn.style.transform = "";
            }, { passive: true });
        });
    }

    /* === 7. Staggered Card Reveal === */
    function initStaggerReveal() {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });

        document.querySelectorAll(".game-card").forEach(function(card) {
            if (!card._staggerObserved) {
                card._staggerObserved = true;
                observer.observe(card);
            }
        });
    }

    /* === Init === */
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    function init() {
        initAurora();
        initStarfield();
        if (!isTouchDevice()) {
            initCardTilt();
            initMagneticButtons();
        }
        initNavbar3D();
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function() {
                initScrollReveal3D();
                initStaggerReveal();
            });
        } else {
            initScrollReveal3D();
            initStaggerReveal();
        }
        /* Re-init after dynamic content */
        var grid = document.getElementById("gamesGrid");
        if (grid) new MutationObserver(function() {
            initCardTilt();
            initScrollReveal3D();
            initStaggerReveal();
        }).observe(grid, { childList: true });
        var fgrid = document.getElementById("friendsGrid");
        if (fgrid) new MutationObserver(function() {
            initCardTilt();
        }).observe(fgrid, { childList: true });
    }

    init();
})();

