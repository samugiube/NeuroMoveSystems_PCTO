document.addEventListener("DOMContentLoaded", () => {

  // STILI GLOBALI INIETTATI VIA JS
  document.body.style.fontFamily = "Arial, sans-serif";
  document.body.style.margin = "0";
  document.body.style.background = "#f2f6f8";

  const header = document.querySelector("header");
  header.style.background = "linear-gradient(120deg, #1e3c72, #2a5298)";
  header.style.color = "white";
  header.style.padding = "40px";
  header.style.textAlign = "center";

  const nav = document.querySelector("nav");
  nav.style.background = "#222";
  nav.style.padding = "10px";
  nav.style.textAlign = "center";

  document.querySelectorAll("nav a").forEach(link => {
    link.style.color = "white";
    link.style.margin = "0 15px";
    link.style.textDecoration = "none";
    link.style.transition = "0.3s";

    link.addEventListener("mouseenter", () => {
      link.style.color = "#00e0ff";
      link.style.transform = "scale(1.2)";
    });

    link.addEventListener("mouseleave", () => {
      link.style.color = "white";
      link.style.transform = "scale(1)";
    });
  });

  // ANIMAZIONE DI INGRESSO ELEMENTI
  const elements = document.querySelectorAll("h1, h2, h3, p, ul, a, form");

  elements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "0.6s ease";

    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, i * 100);
  });

  // LINK ATTIVO
  const current = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.style.borderBottom = "3px solid #00e0ff";
    }
  });

  // PULSANTE HOME
  document.querySelectorAll("main a").forEach(btn => {
    btn.style.display = "inline-block";
    btn.style.marginTop = "20px";
    btn.style.padding = "12px 20px";
    btn.style.background = "#2a5298";
    btn.style.color = "white";
    btn.style.borderRadius = "8px";
    btn.style.transition = "0.3s";

    btn.addEventListener("mouseenter", () => {
      btn.style.background = "#00e0ff";
      btn.style.color = "black";
      btn.style.transform = "scale(1.1)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.background = "#2a5298";
      btn.style.color = "white";
      btn.style.transform = "scale(1)";
    });
  });

  // FOOTER
  const footer = document.querySelector("footer");
  footer.style.background = "#111";
  footer.style.color = "white";
  footer.style.textAlign = "center";
  footer.style.padding = "20px";
  footer.style.marginTop = "40px";

  // MINI GIOCO SCI SOLO SE SEI IN SOFTWARE
  if (document.title.includes("Software")) {
    creaSciatore();
  }
});

function creaSciatore() {
  const area = document.createElement("div");
  area.style.position = "relative";
  area.style.width = "100%";
  area.style.height = "200px";
  area.style.background = "linear-gradient(#fff, #cce7ff)";
  area.style.marginTop = "40px";
  area.style.overflow = "hidden";

  const skier = document.createElement("div");
  skier.textContent = "⛷️";
  skier.style.position = "absolute";
  skier.style.bottom = "20px";
  skier.style.left = "50%";
  skier.style.fontSize = "40px";
  skier.style.transition = "0.1s";

  area.appendChild(skier);
  document.querySelector("main").appendChild(area);

  let x = 50;

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") x -= 4;
    if (e.key === "ArrowRight") x += 4;

    x = Math.max(0, Math.min(95, x));
    skier.style.left = x + "%";
  });

  // bandierine animate
  setInterval(() => {
    const flag = document.createElement("div");
    flag.textContent = "🚩";
    flag.style.position = "absolute";
    flag.style.top = "0";
    flag.style.left = Math.random() * 95 + "%";
    flag.style.fontSize = "24px";

    area.appendChild(flag);

    let y = 0;
    const fall = setInterval(() => {
      y += 3;
      flag.style.top = y + "px";

      if (y > 200) {
        flag.remove();
        clearInterval(fall);
      }
    }, 20);
  }, 800);
}
