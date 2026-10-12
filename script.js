/**
 * JIHANE BENZERKANE — ACADEMIC & ENGINEERING PORTFOLIO
 * Subtle Japanese Autumn Rain & Drifting Leaves Canvas
 * Real Project Snapshot Gallery & Lightbox
 * Functional Contact Form
 */

// ============================================================================
// SUBTLE JAPANESE AUTUMN RAIN & DRIFTING LEAVES CANVAS
// Barely noticeable, peaceful, non-distracting atmospheric background
// ============================================================================
function initAutumnRainCanvas() {
  const canvas = document.getElementById('autumn-rain-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Rain Drops (visible gentle autumn rain streaks)
  const rainCount = width > 768 ? 78 : 42;
  const rainDrops = [];
  for (let i = 0; i < rainCount; i++) {
    rainDrops.push({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 22 + 14,
      width: Math.random() * 0.5 + 1.1,
      speed: Math.random() * 2.8 + 2.8,
      alpha: Math.random() * 0.13 + 0.08, // clearly discernible, cozy autumn rainfall
    });
  }

  // Autumn Leaves (sparse, slow tumbling maple/ginkgo leaves)
  const leafCount = width > 768 ? 14 : 7;
  const leaves = [];
  const leafColors = ['#bd5334', '#d4883b', '#9e3f24', '#c27e36'];

  for (let i = 0; i < leafCount; i++) {
    leaves.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 5,
      speedY: Math.random() * 0.4 + 0.25,
      speedX: Math.random() * 0.3 - 0.1,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      oscillationSpeed: Math.random() * 0.01 + 0.005,
      color: leafColors[Math.floor(Math.random() * leafColors.length)],
      alpha: Math.random() * 0.12 + 0.06, // subtle warm fall leaves
    });
  }

  let tick = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);
    tick += 1;

    // Draw Autumn Rain Droplets
    for (let i = 0; i < rainDrops.length; i++) {
      const drop = rainDrops[i];
      ctx.lineWidth = drop.width;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x - 3.5, drop.y + drop.length);
      ctx.strokeStyle = `rgba(242, 235, 226, ${drop.alpha})`;
      ctx.stroke();

      drop.y += drop.speed;
      drop.x -= 0.6; // slight slant

      if (drop.y > height) {
        drop.y = -drop.length;
        drop.x = Math.random() * width;
      }
      if (drop.x < 0) {
        drop.x = width;
      }
    }

    // Draw Drifting Autumn Leaves
    for (let i = 0; i < leaves.length; i++) {
      const leaf = leaves[i];
      ctx.save();
      ctx.translate(leaf.x + Math.sin(tick * leaf.oscillationSpeed) * 15, leaf.y);
      ctx.rotate(leaf.angle);

      ctx.fillStyle = leaf.color;
      ctx.globalAlpha = leaf.alpha;

      // Small stylized leaf shape
      ctx.beginPath();
      ctx.ellipse(0, 0, leaf.size, leaf.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      leaf.y += leaf.speedY;
      leaf.x += leaf.speedX;
      leaf.angle += leaf.rotationSpeed;

      if (leaf.y > height + 20) {
        leaf.y = -20;
        leaf.x = Math.random() * width;
      }
      if (leaf.x < -20) leaf.x = width + 20;
      if (leaf.x > width + 20) leaf.x = -20;
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(render);
  }

  render();
}

// ============================================================================
// REAL F1TRACK PROJECT SNAPSHOT GALLERY & LIGHTBOX
// ============================================================================
const snapshotData = {
  telemetry: {
    src: 'assets/f1track_real/F1Track_Telemetry.png',
    title: 'Car Telemetry Channels & Velocity Interface',
    caption: 'Live OpenF1 stream refreshed every 500ms · Speed, RPM, Throttle, Brake & DRS channels',
    label: 'OPENF1 TELEMETRY CHANNELS',
  },
  predictions: {
    src: 'assets/f1track_real/F1Track_Predictions.png',
    title: '2026 Race Predictions · Monte Carlo Engine',
    caption: '50,000 iterations modeling race outcome probabilities across 22 drivers with spread metrics',
    label: '50,000 MONTE CARLO ITERATIONS',
  },
  studio3d: {
    src: 'assets/f1track_real/F1Track_3DViewer.png',
    title: 'Technical Studio · Interactive 3D Car Explorer',
    caption: 'Three.js 3D inspection studio with ground perspective grid and technical component inspection nodes',
    label: 'THREE.JS 3D TECHNICAL STUDIO',
  },
  home: {
    src: 'assets/f1track_real/F1Track_HomePage.png',
    title: 'F1Track Landing Dashboard & Historical Dataset',
    caption: 'Historical database (1950–2026) of 185,000+ records across 33 relational tables and 20+ REST APIs',
    label: 'HISTORICAL ARCHIVE & DASHBOARD',
  },
};

function initSnapshotGallery() {
  const tabs = document.querySelectorAll('.snap-tab-btn');
  const imgEl = document.getElementById('active-snapshot-img');
  const titleEl = document.getElementById('snapshot-caption-title');
  const tagEl = document.getElementById('snapshot-caption-tag');

  if (!tabs.length || !imgEl) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.dataset.snap;
      const data = snapshotData[key];
      if (data) {
        imgEl.style.opacity = '0.4';
        setTimeout(() => {
          imgEl.src = data.src;
          imgEl.alt = data.title;
          if (titleEl) titleEl.textContent = data.title;
          if (tagEl) tagEl.textContent = data.label;
          imgEl.style.opacity = '1';
        }, 120);
      }
    });
  });

  // Lightbox view
  const lightbox = document.getElementById('snapshot-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (lightbox && lightboxImg && closeBtn) {
    imgEl.addEventListener('click', () => {
      lightboxImg.src = imgEl.src;
      lightboxTitle.textContent = titleEl ? titleEl.textContent : 'F1Track Project Snapshot';
      lightbox.classList.add('active');
    });

    const closeLightbox = () => lightbox.classList.remove('active');
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
}

// ============================================================================
// FUNCTIONAL CONTACT BOX HANDLER
// ============================================================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value || 'Portfolio Inquiry';
    const message = document.getElementById('contact-message').value;

    if (feedback) {
      feedback.textContent = `Thank you, ${name}! Generating email dispatch to benzerkane.jihane@etu.uae.ac.ma...`;
      feedback.classList.add('show');
    }

    // Direct mailto trigger fallback
    const mailtoUri = `mailto:benzerkane.jihane@etu.uae.ac.ma?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoUri;

    setTimeout(() => {
      form.reset();
      if (feedback) {
        feedback.textContent = 'Message ready in your email client. You can also reach me directly at benzerkane.jihane@etu.uae.ac.ma';
      }
    }, 1500);
  });
}

// ============================================================================
// NAVIGATION
// ============================================================================
function initNavigation() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initAutumnRainCanvas();
  initSnapshotGallery();
  initContactForm();
  initNavigation();
});
