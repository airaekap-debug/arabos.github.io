
const petalsContainer = document.getElementById("petals");
const openBtn = document.getElementById("openBtn");
const message = document.getElementById("message");
const stars = document.getElementById("stars");

// Membuat bunga dengan tiga lapisan kelopak
const layers = [
  { count: 10, distance: 35, size: 1 },
  { count: 8, distance: 22, size: 0.78 },
  { count: 6, distance: 10, size: 0.55 }
];

layers.forEach((layer, layerIndex) => {
  for (let i = 0; i < layer.count; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";

    const angle = (360 / layer.count) * i;
    const tilt = layerIndex * 12;

    petal.style.width = `${66 * layer.size}px`;
    petal.style.height = `${94 * layer.size}px`;
    petal.style.transitionDelay =
      `${layerIndex * 0.15 + i * 0.035}s`;

    const closed =
      `translate(-50%, -85%) rotateZ(${angle}deg) scale(0.08)`;

    const opened =
      `translate(-50%, -85%) rotateZ(${angle}deg) ` +
      `rotateX(${tilt}deg) translateY(-${layer.distance}px) ` +
      `rotateX(15deg)`;

    petal.dataset.closed = closed;
    petal.dataset.opened = opened;
    petal.style.transform = closed;

    petalsContainer.appendChild(petal);
  }
});

// Animasi bunga mekar
function bloom() {
  document.querySelectorAll(".petal").forEach((petal) => {
    petal.style.opacity = "1";
    petal.style.transform = petal.dataset.opened;
  });
}

// Mekar perlahan saat halaman dibuka
window.addEventListener("load", () => {
  setTimeout(bloom, 300);
});

// Tombol untuk membuka pesan
openBtn.addEventListener("click", () => {
  const isOpen = message.classList.toggle("show");

  openBtn.textContent = isOpen
    ? "Tutup pesan 💌"
    : "Buka pesan kecil 💌";

  if (isOpen) {
    message.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

    // Efek hati kecil saat pesan dibuka
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement("span");
      heart.textContent = Math.random() > 0.5 ? "💙" : "❤️";
      heart.style.position = "fixed";
      heart.style.left = `${20 + Math.random() * 60}%`;
      heart.style.top = `${30 + Math.random() * 40}%`;
      heart.style.zIndex = "10";
      heart.style.pointerEvents = "none";
      heart.style.fontSize = "20px";
      heart.style.transition = "transform 1.5s, opacity 1.5s";

      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform =
          `translate(${Math.random() * 100 - 50}px, -120px)`;
        heart.style.opacity = "0";
      });

      setTimeout(() => heart.remove(), 1600);
    }
  }
});

// Bintang kecil di latar belakang
for (let i = 0; i < 55; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.textContent = Math.random() > 0.7 ? "✦" : "·";

  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 3}s`;
  star.style.animationDuration = `${1 + Math.random() * 3}s`;

  stars.appendChild(star);
}
