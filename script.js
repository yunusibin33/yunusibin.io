const reveals = document.querySelectorAll(".reveal");
const mobileToggle = document.querySelector(".mobile-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-menu a");
const cursorGlow = document.querySelector(".cursor-glow");
const tiltCards = document.querySelectorAll(".tilt-card");
const header = document.querySelector(".header");

const sectorTabs = document.querySelectorAll(".sector-tab");
const sectorPanels = document.querySelectorAll(".sector-panel");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;

  reveals.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      item.classList.add("active");
    }
  });
};

revealOnScroll();
window.addEventListener("scroll", revealOnScroll);

if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

document.addEventListener("mousemove", (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.style.background = "rgba(6, 8, 22, 0.88)";
    header.style.borderBottom = "1px solid rgba(255,255,255,0.08)";
  } else {
    header.style.background = "rgba(6, 8, 22, 0.62)";
    header.style.borderBottom = "1px solid rgba(255,255,255,0.06)";
  }
});

sectorTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.sector;

    sectorTabs.forEach((btn) => btn.classList.remove("active"));
    sectorPanels.forEach((panel) => panel.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

document.querySelector(".contact-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Form backend ile bağlandığında teklif talepleri aktif olacaktır.");
});
/* =========================
   360 TOUR DEMO
========================= */
const sceneButtons = document.querySelectorAll(".tour-btn");
const sceneGroups = {
  lobby: document.getElementById("scene-lobby"),
  showroom: document.getElementById("scene-showroom"),
  cafe: document.getElementById("scene-cafe")
};

function switchScene(sceneName) {
  Object.keys(sceneGroups).forEach((key) => {
    if (sceneGroups[key]) {
      sceneGroups[key].setAttribute("visible", key === sceneName);
    }
  });

  sceneButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.scene === sceneName);
  });
}

sceneButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    switchScene(btn.dataset.scene);
  });
});

document.querySelectorAll(".portal").forEach((portal) => {
  portal.addEventListener("click", () => {
    const target = portal.getAttribute("data-target");
    switchScene(target);
  });
});

/* =========================
   QR MENU DEMO
========================= */
const qrMenuData = {
  main: [
    {
      title: "Izgara Bonfile",
      desc: "Özel sos, köz sebze ve tereyağlı patates ile servis edilir.",
      price: "420₺"
    },
    {
      title: "Tavuk Supreme",
      desc: "Kremalı mantar sos ve mevsim sebzeleri ile premium sunum.",
      price: "290₺"
    },
    {
      title: "Fettucine Alfredo",
      desc: "Parmesan dokunuşu ve yoğun kıvamlı özel sos.",
      price: "260₺"
    }
  ],
  drink: [
    {
      title: "Soğuk Latte",
      desc: "Yoğun espresso, süt ve buz ile ferah kahve deneyimi.",
      price: "110₺"
    },
    {
      title: "Limonata Special",
      desc: "Taze nane ve doğal limon ile hazırlanan yaz içeceği.",
      price: "95₺"
    },
    {
      title: "Berry Smoothie",
      desc: "Orman meyveli, hafif ve enerji veren özel karışım.",
      price: "135₺"
    }
  ],
  dessert: [
    {
      title: "San Sebastian",
      desc: "Akışkan kıvam, hafif yanık doku ve özel sos ile sunum.",
      price: "160₺"
    },
    {
      title: "Lotus Magnolia",
      desc: "Katmanlı krema, lotus kırıntısı ve premium sunum.",
      price: "170₺"
    },
    {
      title: "Çikolatalı Sufle",
      desc: "Sıcak servis, yoğun kakao ve dondurma eşliği.",
      price: "185₺"
    }
  ]
};

const qrProducts = document.getElementById("qrProducts");
const qrTabs = document.querySelectorAll(".qr-tab");

function renderQrProducts(category) {
  if (!qrProducts) return;

  qrProducts.innerHTML = qrMenuData[category]
    .map(
      (item) => `
        <article class="qr-product-card">
          <div class="qr-product-card-top">
            <div>
              <h4>${item.title}</h4>
              <p>${item.desc}</p>
            </div>
            <strong>${item.price}</strong>
          </div>
        </article>
      `
    )
    .join("");
}

qrTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    qrTabs.forEach((btn) => btn.classList.remove("active"));
    tab.classList.add("active");
    renderQrProducts(tab.dataset.category);
  });
});

renderQrProducts("main");

/* =========================
   GENERAL SHOWROOM
========================= */
const showroomData = [
  {
    sector: "law",
    badge: "HUKUK",
    title: "Hukuk Bürosu Dijital Sunumu",
    desc: "Prestij, güven ve uzmanlık hissi veren kurumsal yapı.",
    items: ["Kurumsal web sitesi", "Uzmanlık alanları", "Randevu formu", "Google görünürlük temeli"]
  },
  {
    sector: "restaurant",
    badge: "RESTORAN",
    title: "Restoran & Kafe Deneyimi",
    desc: "QR menü, 360 mekan deneyimi ve rezervasyon akışı ile modern yapı.",
    items: ["QR menü", "360 sanal tur", "Kampanya alanı", "Mobil rezervasyon"]
  },
  {
    sector: "clinic",
    badge: "KLİNİK",
    title: "Klinik ve Sağlık Merkezi",
    desc: "Temiz, güvenilir ve hasta odaklı dijital yüz.",
    items: ["Doktor profilleri", "Online randevu", "Hizmet sayfaları", "Kurumsal iletişim akışı"]
  },
  {
    sector: "realestate",
    badge: "EMLAK",
    title: "Emlak & Gayrimenkul",
    desc: "Portföy odaklı, yüksek görsel kaliteye sahip satış yapısı.",
    items: ["Portföy listeleme", "360 iç mekan turu", "İlan filtreleme", "Hızlı teklif alanı"]
  },
  {
    sector: "beauty",
    badge: "GÜZELLİK",
    title: "Güzellik Merkezi Sunumu",
    desc: "Şık, soft ve güven veren premium marka görünümü.",
    items: ["Hizmet paketleri", "Öncesi/sonrası alanı", "Online randevu", "Instagram yönlendirmesi"]
  },
  {
    sector: "hotel",
    badge: "OTEL",
    title: "Otel & Konaklama Deneyimi",
    desc: "Oda tanıtımı, rezervasyon ve sanal gezi odaklı yapı.",
    items: ["Oda sunumu", "360 alan gezisi", "Rezervasyon CTA", "Konum / iletişim"]
  },
  {
    sector: "corporate",
    badge: "KURUMSAL",
    title: "Kurumsal Firma Web Sunumu",
    desc: "Kurumsal duruş, güven veren içerik mimarisi ve profesyonel görünüm.",
    items: ["Hizmet tanıtımı", "Referans alanı", "Teklif formu", "SEO altyapısı"]
  }
];

const showroomGrid = document.getElementById("showroomGrid");
const showroomChips = document.querySelectorAll(".showroom-chip");

function renderShowroom(filter = "all") {
  if (!showroomGrid) return;

  const filtered = filter === "all"
    ? showroomData
    : showroomData.filter((item) => item.sector === filter);

  showroomGrid.innerHTML = filtered
    .map(
      (item) => `
        <article class="showroom-card glass reveal active">
          <div class="showroom-card-top">
            <span class="showroom-badge">${item.badge}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <ul class="showroom-list">
            ${item.items.map((sub) => `<li>${sub}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

showroomChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    showroomChips.forEach((btn) => btn.classList.remove("active"));
    chip.classList.add("active");
    renderShowroom(chip.dataset.sector);
  });
});

renderShowroom("all");
const realTourButtons = document.querySelectorAll(".real-tour-btn");
const realTourFrame = document.getElementById("realTourFrame");

realTourButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tourUrl = button.dataset.tour;
    if (!realTourFrame || !tourUrl) return;

    realTourButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    realTourFrame.src = tourUrl;
  });
});