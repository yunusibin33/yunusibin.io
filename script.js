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
  breakfast: {
    title: "Kahvaltı Menüsü",
    desc: "Güne keyifli ve zengin başlangıçlar",
    items: [
      {
        img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80",
        title: "Serpme Kahvaltı",
        desc: "Peynir çeşitleri, zeytin, bal, reçel, yumurta, sıcak ürünler ve demleme çay ile zengin sunum.",
        price: "280₺",
        tags: ["Popüler", "Paylaşımlık"]
      },
      {
        img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=400&q=80",
        title: "Kaşarlı Menemen",
        desc: "Domates, biber, yumurta ve eriyen kaşar peyniri ile sıcak servis.",
        price: "110₺",
        tags: ["Şef Önerisi"]
      },
      {
        img: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=400&q=80",
        title: "Avokadolu Tost",
        desc: "Ekşi mayalı ekmek, avokado ezmesi, yumurta ve taze yeşillik.",
        price: "145₺",
        tags: ["Yeni"]
      },
      {
        img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=400&q=80",
        title: "Pankek Tabağı",
        desc: "Meyve, çikolata sosu ve akçaağaç şurubu ile servis edilir.",
        price: "125₺",
        tags: ["Tatlı Kahvaltı"]
      },
      {
        img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=400&q=80",
        title: "Omlet Deluxe",
        desc: "Mantar, peynir ve yeşillik ile hazırlanmış özel omlet.",
        price: "120₺",
        tags: ["Protein"]
      }
    ]
  },

  food: {
    title: "Ana Yemekler",
    desc: "Doyurucu ve premium ana tabaklar",
    items: [
      {
        img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
        title: "Izgara Köfte",
        desc: "Patates püresi, köz sebze ve özel sos eşliğinde servis edilir.",
        price: "230₺",
        tags: ["Popüler"]
      },
      {
        img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80",
        title: "Tavuk Şiş",
        desc: "Özel marine edilmiş tavuk, pilav ve mevsim salata ile.",
        price: "210₺",
        tags: ["Şef Önerisi"]
      },
      {
        img: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=400&q=80",
        title: "Dana Bonfile",
        desc: "Yumuşak pişmiş bonfile, tereyağlı patates ve demi-glace sos.",
        price: "420₺",
        tags: ["Premium"]
      },
      {
        img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=400&q=80",
        title: "Fettucine Alfredo",
        desc: "Kremalı parmesan sos ve taze baharat dokunuşu.",
        price: "190₺",
        tags: ["Makarna"]
      },
      {
        img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
        title: "Gurme Pizza",
        desc: "Mozzarella, özel sos, roka ve ince hamur ile hazırlanır.",
        price: "240₺",
        tags: ["Yeni"]
      }
    ]
  },

  drink: {
    title: "İçecekler",
    desc: "Sıcak ve soğuk içecek seçenekleri",
    items: [
      {
        img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
        title: "Latte",
        desc: "Yoğun espresso ve kremsi süt köpüğü ile hazırlanır.",
        price: "95₺",
        tags: ["Kahve"]
      },
      {
        img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=80",
        title: "Frozen Berry",
        desc: "Orman meyveli buzlu içecek, ferah ve canlı tat.",
        price: "120₺",
        tags: ["Soğuk"]
      },
      {
        img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80",
        title: "Limonata Special",
        desc: "Taze limon, nane ve hafif soda dokunuşu.",
        price: "85₺",
        tags: ["Ferah"]
      },
      {
        img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80",
        title: "Türk Kahvesi",
        desc: "Geleneksel sunum ile bol köpüklü hazırlanır.",
        price: "70₺",
        tags: ["Klasik"]
      },
      {
        img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80",
        title: "Detoks Smoothie",
        desc: "Yeşil elma, salatalık, limon ve nane karışımı.",
        price: "130₺",
        tags: ["Fit"]
      }
    ]
  },

  dessert: {
    title: "Tatlılar",
    desc: "Günün en keyifli finali için seçkiler",
    items: [
      {
        img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80",
        title: "San Sebastian",
        desc: "Akışkan dokulu özel cheesecake, sos eşliğinde servis edilir.",
        price: "150₺",
        tags: ["Popüler"]
      },
      {
        img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80",
        title: "Tiramisu",
        desc: "Mascarpone kreması ve kahve aromasıyla hafif tatlı deneyimi.",
        price: "135₺",
        tags: ["İtalyan"]
      },
      {
        img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
        title: "Çikolatalı Sufle",
        desc: "Sıcak servis edilen yoğun kakao dolgusuyla hazırlanır.",
        price: "160₺",
        tags: ["Şef Önerisi"]
      },
      {
        img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80",
        title: "Magnolia",
        desc: "Bisküvi, krema ve meyve katmanları ile hafif sunum.",
        price: "125₺",
        tags: ["Yeni"]
      },
      {
        img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=400&q=80",
        title: "Waffle",
        desc: "Muz, çilek ve çikolata sos ile hazırlanan sıcak waffle.",
        price: "170₺",
        tags: ["Tatlı Keyfi"]
      }
    ]
  }
};

const qrMenuList = document.getElementById("qrMenuList");
const qrTabs = document.querySelectorAll(".qr-tab");
const qrSearchInput = document.getElementById("qrSearchInput");
const qrCategoryTitle = document.getElementById("qrCategoryTitle");
const qrCategoryDesc = document.getElementById("qrCategoryDesc");
const qrCount = document.getElementById("qrCount");

let activeCategory = "breakfast";

function createQrItem(item) {
  return `
    <article class="qr-item">
      <img src="${item.img}" alt="${item.title}">
      <div class="qr-item-content">
        <div class="qr-item-head">
          <h5>${item.title}</h5>
          <strong>${item.price}</strong>
        </div>
        <p>${item.desc}</p>
        <div class="qr-tags">
          ${item.tags.map(tag => `<span class="qr-tag">${tag}</span>`).join("")}
        </div>
      </div>
    </article>
  `;
}

function renderMenu(category, searchTerm = "") {
  const categoryData = qrMenuData[category];
  if (!categoryData || !qrMenuList) return;

  const filteredItems = categoryData.items.filter(item => {
    const text = `${item.title} ${item.desc} ${item.tags.join(" ")}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  qrCategoryTitle.textContent = categoryData.title;
  qrCategoryDesc.textContent = categoryData.desc;
  qrCount.textContent = `${filteredItems.length} Ürün`;

  qrMenuList.innerHTML = filteredItems.length
    ? filteredItems.map(createQrItem).join("")
    : `
      <div class="qr-item">
        <div class="qr-item-content">
          <div class="qr-item-head">
            <h5>Sonuç bulunamadı</h5>
          </div>
          <p>Arama kelimesini değiştirerek tekrar deneyin.</p>
        </div>
      </div>
    `;
}

qrTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    qrTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeCategory = tab.dataset.cat;
    if (qrSearchInput) qrSearchInput.value = "";
    renderMenu(activeCategory);
  });
});

if (qrSearchInput) {
  qrSearchInput.addEventListener("input", (e) => {
    renderMenu(activeCategory, e.target.value);
  });
}

renderMenu(activeCategory);

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