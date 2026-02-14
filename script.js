/* ========== VALENTINE'S DAY SITE - SCRIPT ========== */
/* All interactions, games, sounds. No backend required. */

function initValentines() {
  "use strict";

  // ----- Audio: simple tones and voice (no external files) -----
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx)
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }
  function playTone(freq, duration, type) {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = type || "sine";
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (_) {}
  }
  function playClickSound() {
    playTone(523, 0.1, "sine");
    setTimeout(() => playTone(659, 0.1, "sine"), 80);
  }
  function playCatchSound() {
    playTone(523, 0.08, "sine");
    setTimeout(() => playTone(659, 0.08, "sine"), 60);
    setTimeout(() => playTone(784, 0.12, "sine"), 120);
  }
  function playBombSound() {
    playTone(200, 0.15, "sawtooth");
    setTimeout(() => playTone(150, 0.2, "sawtooth"), 100);
  }
  function playYesCelebration() {
    [523, 659, 784, 1047].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.2, "sine"), i * 120);
    });
  }
  let voicePlayed = false;
  function speakGreeting() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(
      "Happy Valentine's Day, Shelly! I love you!",
    );
    u.rate = 0.9;
    u.pitch = 1.1;
    u.volume = 1;
    window.speechSynthesis.speak(u);
    voicePlayed = true;
  }

  // ----- Heart cursor -----
  const heartCursor = document.getElementById("heart-cursor");
  document.addEventListener("mousemove", function (e) {
    if (heartCursor) {
      heartCursor.style.left = e.clientX + "px";
      heartCursor.style.top = e.clientY + "px";
    }
  });

  // ----- Floating hearts background -----
  const heartsContainer = document.getElementById("floating-hearts");
  const heartEmojis = ["❤️", "💕", "💗", "💖", "💘", "🌸"];
  function createFloatingHeart() {
    if (!heartsContainer) return;
    const el = document.createElement("span");
    el.className = "floating-heart";
    el.textContent =
      heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.animationDuration = 8 + Math.random() * 6 + "s";
    el.style.animationDelay = Math.random() * 2 + "s";
    heartsContainer.appendChild(el);
    setTimeout(() => el.remove(), 14000);
  }
  setInterval(createFloatingHeart, 600);
  for (let i = 0; i < 12; i++) setTimeout(createFloatingHeart, i * 200);

  // ----- Balloons follow mouse -----
  const balloonsContainer = document.getElementById("balloons");
  const balloonColors = ["#FFB6C1", "#FF69B4", "#FFC0CB", "#FF1493", "#FFF0F5"];
  for (let i = 0; i < 8; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    b.style.left = 10 + Math.random() * 80 + "%";
    b.style.top = 10 + Math.random() * 80 + "%";
    b.style.background = balloonColors[i % balloonColors.length];
    b.style.boxShadow = "inset -3px -3px 6px rgba(0,0,0,0.1)";
    if (balloonsContainer) balloonsContainer.appendChild(b);
  }
  document.addEventListener("mousemove", function (e) {
    const balloons = document.querySelectorAll(".balloon");
    const cx = window.innerWidth / 2,
      cy = window.innerHeight / 2;
    balloons.forEach((b, i) => {
      const dx = (e.clientX - cx) / 80;
      const dy = (e.clientY - cy) / 80;
      const off = (i % 3) * 0.3;
      b.style.transform = `translate(${dx + off * 10}px, ${dy + off * 10}px)`;
    });
  });

  // ----- No button dodges cursor; only Yes is clickable -----
  const btnNo = document.getElementById("btn-no");
  if (btnNo) {
    btnNo.addEventListener("mouseenter", function dodge() {
      const w = window.innerWidth - 120;
      const h = window.innerHeight - 80;
      const x = Math.random() * w + 40;
      const y = Math.random() * h + 40;
      btnNo.style.position = "fixed";
      btnNo.style.left = x + "px";
      btnNo.style.top = y + "px";
      btnNo.style.zIndex = "1000";
    });
    btnNo.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  // ----- Yes button: confetti, hearts burst, sound, voice -----
  const btnYes = document.getElementById("btn-yes");
  const confettiContainer = document.getElementById("confetti-container");
  function createConfetti() {
    if (!confettiContainer) return;
    const colors = ["#FFB6C1", "#FF69B4", "#FF1493", "#DC143C", "#FFF"];
    for (let i = 0; i < 80; i++) {
      const p = document.createElement("div");
      p.className = "confetti-piece";
      p.style.left = Math.random() * 100 + "vw";
      p.style.top = "-10px";
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = 2 + Math.random() * 2 + "s";
      p.style.animationDelay = Math.random() * 0.5 + "s";
      p.style.setProperty("--tx", (Math.random() - 0.5) * 100 + "px");
      confettiContainer.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }
  }
  function heartsBurst() {
    const container = document.getElementById("confetti-container");
    if (!container) return;
    const hearts = ["❤️", "💕", "💗", "💖"];
    for (let i = 0; i < 40; i++) {
      const h = document.createElement("span");
      h.className = "easter-heart-burst";
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      h.style.left = "50%";
      h.style.top = "50%";
      const angle = (Math.PI * 2 * i) / 40 + Math.random();
      const dist = 80 + Math.random() * 120;
      h.style.setProperty("--tx", Math.cos(angle) * dist + "px");
      h.style.setProperty("--ty", Math.sin(angle) * dist + "px");
      container.appendChild(h);
      setTimeout(() => h.remove(), 1200);
    }
  }
  const bgMusic = document.getElementById("valentine-bg-music");
  const BG_MUSIC_VOLUME = 0.25;

  if (btnYes) {
    btnYes.addEventListener("click", function () {
      playYesCelebration();
      createConfetti();
      heartsBurst();
      speakGreeting();
      if (bgMusic) {
        bgMusic.volume = BG_MUSIC_VOLUME;
        bgMusic.currentTime = 0;
        bgMusic.play().catch(function () {});
      }
    });
  }

  // ----- Navigation: use event delegation so nav always works -----
  const sections = document.querySelectorAll(".section");
  const mainNav = document.querySelector(".main-nav");
  function showSection(id) {
    if (!id) return;
    sections.forEach(function (s) {
      s.classList.remove("active");
    });
    document.querySelectorAll(".nav-btn[data-section]").forEach(function (b) {
      b.classList.remove("active");
    });
    const section = document.getElementById(id);
    const btn = document.querySelector('.nav-btn[data-section="' + id + '"]');
    if (section) section.classList.add("active");
    if (btn) btn.classList.add("active");
    if (id === "heart-catcher") startHeartCatcher();
    if (id === "love-quiz") initQuiz();
    if (id === "message-board") initMessageBoard();
  }
  if (mainNav) {
    mainNav.addEventListener("click", function (e) {
      var btn = e.target.closest(".nav-btn[data-section]");
      if (btn) {
        e.preventDefault();
        showSection(btn.getAttribute("data-section"));
      }
    });
  }

  // ----- Poem modal (replaces music) -----
  const poemBtn = document.getElementById("poem-btn");
  const poemModal = document.getElementById("poem-modal");
  const poemClose = document.getElementById("poem-close");
  if (poemBtn && poemModal) {
    poemBtn.addEventListener("click", function () {
      poemModal.style.display = "flex";
    });
  }
  if (poemClose && poemModal) {
    poemClose.addEventListener("click", function () {
      poemModal.style.display = "none";
    });
  }

  // ----- Countdown to October 7 (anniversary) -----
  const countdownBtn = document.getElementById("countdown-btn");
  const countdownModal = document.getElementById("countdown-modal");
  const countdownText = document.getElementById("countdown-text");
  const countdownClose = document.getElementById("countdown-close");
  function updateCountdown() {
    const now = new Date();
    const oct7 = new Date(now.getFullYear(), 9, 7); // month 9 = October
    if (now > oct7) oct7.setFullYear(oct7.getFullYear() + 1);
    const diff = oct7 - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    if (countdownText) {
      countdownText.textContent =
        d +
        " days, " +
        h +
        " hours, " +
        m +
        " minutes until our anniversary! 💕";
    }
  }
  if (countdownBtn && countdownModal) {
    countdownBtn.addEventListener("click", function () {
      updateCountdown();
      countdownModal.style.display = "flex";
    });
  }
  if (countdownClose && countdownModal) {
    countdownClose.addEventListener("click", function () {
      countdownModal.style.display = "none";
    });
  }
  setInterval(updateCountdown, 60000);

  // ----- Heart Catcher Game: basket, scoop on click, levels, milestone overlay -----
  const canvas = document.getElementById("heart-canvas");
  const basketEl = document.getElementById("basket");
  const basketContainer = document.getElementById("basket-container");
  const milestoneOverlay = document.getElementById("milestone-overlay");
  let heartCatcherRunning = false;
  let hearts = [];
  let score = 0;
  let level = 1;
  const heartSize = 36;
  let lastSpawn = 0;
  let mouseCanvasX = 0;
  let mouseCanvasY = 0;
  let lastMilestone = -1;
  let sessionHighScore = 0;
  let levelTimeLeft = 45;
  let levelTargetIndex = 0;
  let timerIntervalId = null;
  const BOMB_PENALTY = 5;
  const LEVEL_TARGETS = [10, 25, 50, 100, 150, 200];
  const LEVEL_TIME = 45;
  const LEVEL_TIME_BONUSES = [45, 38, 32, 26, 20, 15];
  const MEGA_HEART_SCORES = [30, 75, 150];
  const MEGA_HEART_WARNINGS = [
    "✨ A MEGA HEART is coming your way! Get ready! ✨",
    "✨ Something SPECIAL is falling for you! ✨",
    "✨ The ULTIMATE heart is incoming! Catch it! ✨",
  ];
  const MEGA_HEART_MESSAGES = [
    "You're the most beautiful girl in the world! 💕",
    "You're the most sexy girl alive! 🔥",
    "You're so hot you made my heart catch on fire! 🔥💕",
  ];
  const MEGA_HEART_SIZE = 56;
  const MEGA_HEART_POINTS = 5;

  const LEVEL_CONFIG = [
    {
      minScore: 0,
      speedMin: 0.8,
      speedMax: 1.4,
      spawnInterval: 700,
      emojis: ["❤️", "💕", "💗"],
    },
    {
      minScore: 10,
      speedMin: 1.2,
      speedMax: 2,
      spawnInterval: 550,
      emojis: ["❤️", "💕", "💗", "💖", "💘"],
    },
    {
      minScore: 25,
      speedMin: 1.6,
      speedMax: 2.6,
      spawnInterval: 400,
      emojis: ["❤️", "💕", "💗", "💖", "💘", "🌸", "💜"],
    },
    {
      minScore: 50,
      speedMin: 1.8,
      speedMax: 2.8,
      spawnInterval: 350,
      emojis: ["❤️", "💕", "💗", "💖", "💘", "🌸", "💜", "❤️‍🔥", "💋"],
    },
    {
      minScore: 100,
      speedMin: 2,
      speedMax: 3.2,
      spawnInterval: 300,
      emojis: [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘",
        "🌸",
        "💝",
        "💜",
        "❤️‍🔥",
        "💋",
        "😘",
      ],
    },
    {
      minScore: 150,
      speedMin: 2.2,
      speedMax: 3.5,
      spawnInterval: 260,
      emojis: [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘",
        "🌸",
        "💝",
        "💜",
        "❤️‍🔥",
        "💋",
        "😘",
        "🥰",
        "💓",
      ],
    },
    {
      minScore: 200,
      speedMin: 2.4,
      speedMax: 3.8,
      spawnInterval: 220,
      emojis: [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘",
        "🌸",
        "💝",
        "💜",
        "❤️‍🔥",
        "💋",
        "😘",
        "🥰",
        "💓",
        "💕",
        "💖",
        "💘",
        "💗",
        "💙",
        "💚",
        "💛",
        "💜",
        "❤️‍🔥",
        "💋",
        "😘",
        "🥰",
        "💓",
        "💕",
        "💖",
        "💘",
        "💗",
        "💙",
        "💚",
        "💛",
        "💜",
        "❤️‍🔥",
        "💋",
        "😘",
        "🥰",
        "💓",
        "💕",
        "💖",
        "💘",
        "💗",
        "💙",
        "💚",
        "💛",
        "💜",
      ],
    },
  ];

  function getLevelConfig() {
    for (let i = LEVEL_CONFIG.length - 1; i >= 0; i--) {
      if (score >= LEVEL_CONFIG[i].minScore) return LEVEL_CONFIG[i];
    }
    return LEVEL_CONFIG[0];
  }

  function getCurrentLevelNumber() {
    var n = 1;
    for (var i = 0; i < LEVEL_TARGETS.length; i++) {
      if (score >= LEVEL_TARGETS[i]) n = i + 2;
      else break;
    }
    return Math.min(n, LEVEL_CONFIG.length);
  }

  function showMilestone(text) {
    if (!milestoneOverlay) return;
    milestoneOverlay.textContent = text;
    milestoneOverlay.classList.remove("visible");
    void milestoneOverlay.offsetWidth;
    milestoneOverlay.classList.add("visible");
    setTimeout(function () {
      milestoneOverlay.classList.remove("visible");
    }, 2000);
  }

  function updateScore() {
    var el = document.getElementById("heart-score");
    var levelEl = document.getElementById("heart-level");
    var timerEl = document.getElementById("heart-timer");
    var highEl = document.getElementById("heart-high-score");
    if (el) el.textContent = score;
    level = getCurrentLevelNumber();
    if (levelEl) levelEl.textContent = level;
    if (timerEl) timerEl.textContent = levelTimeLeft;
    if (score > sessionHighScore) sessionHighScore = score;
    if (highEl) highEl.textContent = sessionHighScore;
    if (score >= 50 && lastMilestone < 50) {
      lastMilestone = 50;
      showMilestone("Incredible! 💝");
    } else if (score >= 20 && lastMilestone < 20) {
      lastMilestone = 20;
      showMilestone("You're amazing, love! 💕");
    } else if (score >= 10 && lastMilestone < 10) {
      lastMilestone = 10;
      showMilestone("Great job, love! 💗");
    } else if (score >= 5 && lastMilestone < 5) {
      lastMilestone = 5;
      showMilestone("Nice catching! 💗");
    }
  }

  function gameOver() {
    heartCatcherRunning = false;
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      timerIntervalId = null;
    }
    var overlay = document.getElementById("game-over-overlay");
    var scoreEl = document.getElementById("game-over-score");
    var bestEl = document.getElementById("game-over-best");
    if (overlay) overlay.style.display = "flex";
    if (scoreEl) scoreEl.textContent = score;
    if (bestEl) bestEl.textContent = sessionHighScore;
  }

  function startHeartCatcher() {
    if (!canvas || !basketEl || !basketContainer) return;
    var gameOverEl = document.getElementById("game-over-overlay");
    if (gameOverEl) gameOverEl.style.display = "none";
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      timerIntervalId = null;
    }
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const cw = rect.width;
    const ch = rect.height;
    hearts = [];
    score = 0;
    level = 1;
    lastMilestone = -1;
    lastSpawn = 0;
    levelTimeLeft = LEVEL_TIME;
    levelTargetIndex = 0;
    heartCatcherRunning = true;
    mouseCanvasX = cw / 2;
    mouseCanvasY = ch / 2;
    updateScore();

    var gameWrap = canvas.parentElement;

    function updateMouseFromEvent(e) {
      var r = gameWrap.getBoundingClientRect();
      mouseCanvasX = e.clientX - r.left;
      mouseCanvasY = e.clientY - r.top;
      mouseCanvasX = Math.max(20, Math.min(r.width - 20, mouseCanvasX));
      mouseCanvasY = Math.max(30, Math.min(r.height - 30, mouseCanvasY));
    }

    function moveBasket(e) {
      if (!heartCatcherRunning) return;
      updateMouseFromEvent(e);
      if (basketEl) {
        basketEl.style.left = mouseCanvasX + "px";
        basketEl.style.top = mouseCanvasY + "px";
      }
    }
    gameWrap.addEventListener("mousemove", moveBasket);
    gameWrap.addEventListener("mouseenter", function () {
      gameWrap.classList.add("cursor-basket");
    });
    gameWrap.addEventListener("mouseleave", function () {
      gameWrap.classList.remove("cursor-basket");
    });

    var nextMegaIndex = 0;
    var megaActive = false;
    var megaWarningInProgress = false;

    function spawnItem() {
      var cfg = getLevelConfig();
      var lvl = getCurrentLevelNumber();
      var bombChance = Math.min(0.32, 0.08 + (lvl - 1) * 0.04);
      var isBomb = Math.random() < bombChance;
      var vy = cfg.speedMin + Math.random() * (cfg.speedMax - cfg.speedMin);
      hearts.push({
        x: Math.random() * (cw - heartSize),
        y: -heartSize,
        vy: vy,
        emoji: isBomb
          ? "💣"
          : cfg.emojis[Math.floor(Math.random() * cfg.emojis.length)],
        type: isBomb ? "bomb" : "heart",
        size: heartSize,
      });
    }

    function spawnMegaHeart(index) {
      if (index >= MEGA_HEART_SCORES.length) return;
      var sz = MEGA_HEART_SIZE;
      hearts.push({
        x: cw / 2 - sz / 2,
        y: -sz,
        vy: 0.85,
        emoji: "💖",
        type: "mega",
        megaIndex: index,
        size: sz,
      });
    }

    function triggerMegaHeartWarning() {
      if (
        nextMegaIndex >= MEGA_HEART_SCORES.length ||
        megaActive ||
        megaWarningInProgress
      )
        return;
      if (score < MEGA_HEART_SCORES[nextMegaIndex]) return;
      megaWarningInProgress = true;
      var warningEl = document.getElementById("mega-warning-overlay");
      if (warningEl) {
        warningEl.textContent = MEGA_HEART_WARNINGS[nextMegaIndex];
        warningEl.style.display = "flex";
      }
      setTimeout(function () {
        if (warningEl) warningEl.style.display = "none";
        megaWarningInProgress = false;
        megaActive = true;
        spawnMegaHeart(nextMegaIndex);
      }, 3000);
    }

    timerIntervalId = setInterval(function () {
      if (!heartCatcherRunning) return;
      levelTimeLeft--;
      if (levelTimeLeft <= 0) {
        gameOver();
        return;
      }
      updateScore();
    }, 1000);

    function draw() {
      if (!heartCatcherRunning || !ctx) return;
      if (
        score >= (MEGA_HEART_SCORES[nextMegaIndex] || 999) &&
        !megaActive &&
        !megaWarningInProgress
      ) {
        triggerMegaHeartWarning();
      }
      ctx.clearRect(0, 0, cw, ch);
      var cfg = getLevelConfig();
      var now = Date.now();
      if (now - lastSpawn > cfg.spawnInterval) {
        spawnItem();
        lastSpawn = now;
      }
      for (var i = hearts.length - 1; i >= 0; i--) {
        var h = hearts[i];
        var sz = h.size || heartSize;
        h.y += h.vy;
        ctx.font = sz + "px serif";
        if (h.type === "mega") {
          ctx.shadowColor = "rgba(255, 105, 180, 0.8)";
          ctx.shadowBlur = 12;
        }
        ctx.fillText(h.emoji, h.x, h.y + sz);
        if (h.type === "mega") {
          ctx.shadowBlur = 0;
        }
        if (h.y > ch) {
          if (h.type === "mega") {
            megaActive = false;
            nextMegaIndex++;
          }
          hearts.splice(i, 1);
        }
      }
      requestAnimationFrame(draw);
    }

    function isHeartInBasket(h) {
      var basketW = 70;
      var basketH = 60;
      var sz = h.size || heartSize;
      var heartBottom = h.y + sz;
      var heartCenterX = h.x + sz / 2;
      var basketLeft = mouseCanvasX - basketW / 2;
      var basketRight = mouseCanvasX + basketW / 2;
      var basketTop = mouseCanvasY - basketH / 2;
      var basketBottom = mouseCanvasY + basketH / 2;
      if (heartCenterX < basketLeft || heartCenterX > basketRight) return false;
      if (heartBottom < basketTop || h.y > basketBottom) return false;
      return true;
    }

    function showMegaMessage(msg) {
      var el = document.getElementById("mega-message-overlay");
      if (!el) return;
      el.innerHTML =
        msg +
        '<br><span class="mega-bonus-text">＋' +
        MEGA_HEART_POINTS +
        " bonus hearts!</span>";
      el.className = "mega-message-overlay visible";
      el.style.display = "flex";
      playYesCelebration();
      setTimeout(function () {
        el.style.display = "none";
        el.classList.remove("visible");
      }, 3500);
    }

    function tryScoop() {
      var caught = false;
      for (var i = hearts.length - 1; i >= 0; i--) {
        if (isHeartInBasket(hearts[i])) {
          var item = hearts[i];
          hearts.splice(i, 1);
          if (item.type === "bomb") {
            score = Math.max(0, score - BOMB_PENALTY);
            playBombSound();
            if (milestoneOverlay) {
              milestoneOverlay.textContent = "Ouch! -" + BOMB_PENALTY + " 💣";
              milestoneOverlay.classList.remove("visible");
              void milestoneOverlay.offsetWidth;
              milestoneOverlay.classList.add("visible");
              setTimeout(function () {
                milestoneOverlay.classList.remove("visible");
              }, 1200);
            }
          } else if (item.type === "mega") {
            megaActive = false;
            score += MEGA_HEART_POINTS;
            showMegaMessage(MEGA_HEART_MESSAGES[item.megaIndex]);
            if (item.megaIndex !== undefined)
              nextMegaIndex = item.megaIndex + 1;
          } else {
            score++;
            playCatchSound();
            while (
              levelTargetIndex < LEVEL_TARGETS.length &&
              score >= LEVEL_TARGETS[levelTargetIndex]
            ) {
              levelTargetIndex++;
              var timeBonus =
                LEVEL_TIME_BONUSES[levelTargetIndex - 1] !== undefined
                  ? LEVEL_TIME_BONUSES[levelTargetIndex - 1]
                  : 15;
              levelTimeLeft += timeBonus;
              if (milestoneOverlay) {
                milestoneOverlay.textContent =
                  "Level " +
                  (levelTargetIndex + 1) +
                  "! +" +
                  timeBonus +
                  "s 💕";
                milestoneOverlay.classList.remove("visible");
                void milestoneOverlay.offsetWidth;
                milestoneOverlay.classList.add("visible");
                setTimeout(function () {
                  milestoneOverlay.classList.remove("visible");
                }, 1500);
              }
            }
          }
          updateScore();
          caught = true;
          break;
        }
      }
      if (basketEl) {
        basketEl.classList.add("scooping");
        setTimeout(function () {
          basketEl.classList.remove("scooping");
        }, 400);
      }
    }

    gameWrap.addEventListener("click", function (e) {
      e.preventDefault();
      updateMouseFromEvent(e);
      if (basketEl) {
        basketEl.style.left = mouseCanvasX + "px";
        basketEl.style.top = mouseCanvasY + "px";
      }
      tryScoop();
    });
    gameWrap.addEventListener(
      "touchend",
      function (e) {
        if (e.changedTouches && e.changedTouches[0]) {
          e.preventDefault();
          var t = e.changedTouches[0];
          var r = gameWrap.getBoundingClientRect();
          mouseCanvasX = t.clientX - r.left;
          mouseCanvasY = t.clientY - r.top;
          mouseCanvasX = Math.max(20, Math.min(r.width - 20, mouseCanvasX));
          mouseCanvasY = Math.max(30, Math.min(r.height - 30, mouseCanvasY));
          if (basketEl) {
            basketEl.style.left = mouseCanvasX + "px";
            basketEl.style.top = mouseCanvasY + "px";
          }
          tryScoop();
        }
      },
      { passive: false },
    );

    if (basketEl) {
      basketEl.style.left = mouseCanvasX + "px";
      basketEl.style.top = mouseCanvasY + "px";
    }
    draw();
  }

  var heartGameRestart = document.getElementById("heart-game-restart");
  if (heartGameRestart) {
    heartGameRestart.addEventListener("click", function () {
      startHeartCatcher();
    });
  }

  // ----- Love Quiz: one set of correct answers -----
  const quizData = [
    {
      q: "Where did we first meet?",
      options: ["At school", "Through friends", "Online", "At a coffee shop"],
      correct: "At school",
    },
    {
      q: "What's my favorite thing about you?",
      options: ["Your smile", "Your laugh", "Your kindness", "Everything!"],
      correct: "Your smile",
    },
    {
      q: "What should I do for you next Valentine's?",
      options: [
        "Dinner and a movie",
        "Adventure outdoors",
        "Cozy night in",
        "Surprise me!",
      ],
      correct: "Surprise me!",
    },
  ];
  let quizIndex = 0;
  let quizAnswers = [];

  function initQuiz() {
    quizIndex = 0;
    quizAnswers = [];
    document.getElementById("quiz-result").style.display = "none";
    document.getElementById("quiz-content").style.display = "block";
    showQuizQuestion();
  }

  function showQuizQuestion() {
    const qEl = document.getElementById("quiz-question");
    const optsEl = document.getElementById("quiz-options");
    const nextBtn = document.getElementById("quiz-next");
    if (quizIndex >= quizData.length) {
      showQuizResult();
      return;
    }
    const item = quizData[quizIndex];
    if (qEl) qEl.textContent = item.q;
    if (optsEl) {
      optsEl.innerHTML = "";
      item.options.forEach(function (opt) {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz";
        radio.value = opt;
        radio.addEventListener("change", function () {
          quizAnswers[quizIndex] = opt;
          if (nextBtn) nextBtn.style.display = "inline-block";
        });
        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + opt));
        optsEl.appendChild(label);
      });
    }
    if (nextBtn) nextBtn.style.display = "none";
  }

  document.getElementById("quiz-next")?.addEventListener("click", function () {
    quizIndex++;
    showQuizQuestion();
  });

  function showQuizResult() {
    document.getElementById("quiz-content").style.display = "none";
    const resultDiv = document.getElementById("quiz-result");
    const resultText = document.getElementById("result-text");
    if (resultDiv) resultDiv.style.display = "block";
    var allCorrect = quizData.every(function (item, i) {
      return quizAnswers[i] === item.correct;
    });
    if (resultText) {
      if (allCorrect) {
        resultText.innerHTML =
          "You know me so well! 💕 I love you!<br><br>" +
          "<strong>Please check if you've received your prize money</strong> — I'm sending it to your account. 💗";
      } else {
        resultText.innerHTML =
          "You got some right! 💕 I still love you so much.<br><br>" +
          "<strong>Please check if you've received your prize money</strong> — I'm sending it to your account. 💗";
      }
    }
  }

  // ----- Message Board (draw / type, save image) -----
  let isDrawing = false;
  let isTextMode = false;

  function initMessageBoard() {
    const c = document.getElementById("message-canvas");
    const textArea = document.getElementById("message-text");
    const drawBtn = document.getElementById("draw-mode");
    const textBtn = document.getElementById("text-mode");
    const colorInput = document.getElementById("brush-color");
    const saveBtn = document.getElementById("save-board");
    if (!c) return;

    const ctx = c.getContext("2d");
    const rect = c.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const cw = rect.width,
      ch = rect.height;
    ctx.fillStyle = "#FFF0F5";
    ctx.fillRect(0, 0, cw, ch);

    function addHeartNear(x, y) {
      const h = document.createElement("span");
      h.textContent = ["❤️", "💕", "💗"][Math.floor(Math.random() * 3)];
      h.style.position = "fixed";
      h.style.left = x + Math.random() * 40 - 20 + "px";
      h.style.top = y - 20 + "px";
      h.style.fontSize = 14 + Math.random() * 12 + "px";
      h.style.pointerEvents = "none";
      h.style.zIndex = "10";
      h.style.animation = "floatUp 1.5s ease-out forwards";
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1500);
    }

    c.addEventListener("mousedown", function (e) {
      if (isTextMode) return;
      isDrawing = true;
      const x = e.offsetX || e.layerX;
      const y = e.offsetY || e.layerY;
      ctx.strokeStyle = colorInput?.value || "#FF69B4";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x, y);
      if (Math.random() > 0.7) addHeartNear(e.clientX, e.clientY);
    });
    c.addEventListener("mousemove", function (e) {
      if (!isDrawing || isTextMode) return;
      const x = e.offsetX || e.layerX;
      const y = e.offsetY || e.layerY;
      ctx.lineTo(x, y);
      ctx.stroke();
      if (Math.random() > 0.95) addHeartNear(e.clientX, e.clientY);
    });
    c.addEventListener("mouseup", () => {
      isDrawing = false;
    });
    c.addEventListener("mouseleave", () => {
      isDrawing = false;
    });

    textArea?.addEventListener("input", function () {
      if (Math.random() > 0.85) {
        const r = textArea.getBoundingClientRect();
        addHeartNear(
          r.left + Math.random() * r.width,
          r.top + Math.random() * r.height,
        );
      }
    });

    drawBtn?.addEventListener("click", function () {
      isTextMode = false;
      c.style.display = "block";
      if (textArea) textArea.style.display = "none";
    });
    textBtn?.addEventListener("click", function () {
      isTextMode = true;
      c.style.display = "none";
      if (textArea) textArea.style.display = "block";
    });

    saveBtn?.addEventListener("click", function () {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = c.width;
      tempCanvas.height = c.height;
      const tctx = tempCanvas.getContext("2d");
      tctx.fillStyle = "#FFF0F5";
      tctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      tctx.drawImage(c, 0, 0);
      if (isTextMode && textArea && textArea.value) {
        tctx.fillStyle = "#333";
        tctx.font = '24px "Comic Neue", cursive';
        const lines = textArea.value.split("\n");
        const lineHeight = 32;
        lines.forEach(function (line, i) {
          tctx.fillText(line, 20, 80 + i * lineHeight);
        });
      }
      const link = document.createElement("a");
      link.download = "valentine-message.png";
      link.href = tempCanvas.toDataURL("image/png");
      link.click();
      playClickSound();
    });
  }

  // ----- Photo wall: captions on hover (enhanced in HTML) -----
  document.querySelectorAll(".polaroid-frame").forEach(function (frame) {
    frame.addEventListener("mouseenter", function () {
      playClickSound();
    });
  });

  // ----- Easter egg: type "Shelly" -> heart fireworks -----
  const easterPrompt = document.getElementById("easter-prompt");
  const easterInput = document.getElementById("easter-input");
  const easterSubmit = document.getElementById("easter-submit");
  const easterFireworks = document.getElementById("easter-fireworks");
  const secretName = "shelly";

  function showEasterEgg() {
    if (!easterFireworks) return;
    const hearts = ["❤️", "💕", "💗", "💖", "💘"];
    for (let i = 0; i < 50; i++) {
      const h = document.createElement("span");
      h.className = "easter-heart-burst";
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      h.style.left = 30 + Math.random() * 40 + "%";
      h.style.top = 30 + Math.random() * 40 + "%";
      const angle = Math.random() * Math.PI * 2;
      const dist = 100 + Math.random() * 150;
      h.style.setProperty("--tx", Math.cos(angle) * dist + "px");
      h.style.setProperty("--ty", Math.sin(angle) * dist + "px");
      h.style.fontSize = 20 + Math.random() * 20 + "px";
      easterFireworks.appendChild(h);
      setTimeout(() => h.remove(), 1200);
    }
    playYesCelebration();
  }

  let easterRevealed = false;
  document.addEventListener("keydown", function (e) {
    if (e.key === "F2" && !easterRevealed) {
      easterRevealed = true;
      if (easterPrompt) easterPrompt.style.display = "flex";
    }
  });

  easterSubmit?.addEventListener("click", function () {
    const val = (easterInput?.value || "").trim().toLowerCase();
    if (val === secretName) {
      showEasterEgg();
      if (easterPrompt) easterPrompt.style.display = "none";
      if (easterInput) easterInput.value = "";
    }
  });
  easterInput?.addEventListener("keypress", function (e) {
    if (e.key === "Enter") easterSubmit?.click();
  });

  // ----- Optional: first-time voice greeting when landing is shown (only if she hasn't clicked Yes yet) -----
  const landing = document.getElementById("landing");
  if (landing && landing.classList.contains("active")) {
    setTimeout(function () {
      if (!voicePlayed) {
        speakGreeting();
      }
    }, 1500);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initValentines);
} else {
  initValentines();
}
