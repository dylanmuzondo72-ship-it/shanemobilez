const phoneNumber = "263788278675";

const products = [
  { series: "16", name: "iPhone 16 Pro Max", image: "iphone16pro.webp", tag: "Flagship power", options: [{ storage: "256GB", price: 1050 }] },
  { series: "16", name: "iPhone 16 Pro", image: "iphone16pro.webp", tag: "Pro performance", options: [{ storage: "256GB", price: 840 }] },
  { series: "16", name: "iPhone 16 Plus", image: "iphone16.webp", tag: "Big screen", options: [{ storage: "256GB", price: 840 }] },
  { series: "16", name: "iPhone 16", image: "iphone16.webp", tag: "Latest value", options: [{ storage: "256GB", price: 760 }] },

  { series: "15", name: "iPhone 15 Pro Max", image: "iphone15pro.webp", tag: "Premium flagship", options: [{ storage: "256GB", price: 750 }] },
  { series: "15", name: "iPhone 15 Pro", image: "iphone15pro.webp", tag: "Pro camera", options: [{ storage: "128GB", price: 690 }, { storage: "256GB", price: 710 }] },
  { series: "15", name: "iPhone 15 Plus", image: "iphone15.webp", tag: "Large display", options: [{ storage: "128GB", price: 610 }, { storage: "256GB", price: 650 }] },
  { series: "15", name: "iPhone 15", image: "iphone15.webp", tag: "USB-C everyday", options: [{ storage: "128GB", price: 560 }, { storage: "256GB", price: 610 }] },

  { series: "14", name: "iPhone 14 Pro Max", image: "iphone14pro.webp", tag: "Big Pro display", options: [{ storage: "128GB", price: 570 }, { storage: "256GB", price: 600 }] },
  { series: "14", name: "iPhone 14 Pro", image: "iphone14pro.webp", tag: "Dynamic Island", options: [{ storage: "128GB", price: 560 }, { storage: "256GB", price: 590 }] },
  { series: "14", name: "iPhone 14 Plus", image: "iphone14.webp", tag: "Battery choice", options: [{ storage: "128GB", price: 470 }, { storage: "256GB", price: 500 }] },
  { series: "14", name: "iPhone 14", image: "iphone14.webp", tag: "Clean daily phone", options: [{ storage: "128GB", price: 460 }, { storage: "256GB", price: 500 }] },

  { series: "13", name: "iPhone 13 Pro Max", image: "iphone13pro.webp", tag: "Big Pro value", options: [{ storage: "128GB", price: 520 }, { storage: "256GB", price: 550 }] },
  { series: "13", name: "iPhone 13 Pro", image: "iphone13pro.webp", tag: "Triple camera", options: [{ storage: "128GB", price: 500 }, { storage: "256GB", price: 520 }] },
  { series: "13", name: "iPhone 13", image: "iphone13.webp", tag: "Best value", options: [{ storage: "128GB", price: 400 }, { storage: "256GB", price: 430 }] },

  { series: "12", name: "iPhone 12 Pro Max", image: "iphone12pro.webp", tag: "Big screen deal", options: [{ storage: "128GB", price: 360 }, { storage: "256GB", price: 380 }] },
  { series: "12", name: "iPhone 12 Pro", image: "iphone12pro.webp", tag: "Pro compact", options: [{ storage: "128GB", price: 330 }, { storage: "256GB", price: 350 }] },
  { series: "12", name: "iPhone 12", image: "iphone12.webp", tag: "Affordable OLED", options: [{ storage: "64GB", price: 250 }, { storage: "128GB", price: 260 }] },

  { series: "11", name: "iPhone 11 Pro Max", image: "iphone11pro.webp", tag: "Budget big Pro", options: [{ storage: "256GB", price: 300 }] },
  { series: "11", name: "iPhone 11 Pro", image: "iphone11pro.webp", tag: "Compact Pro", options: [{ storage: "64GB", price: 270 }, { storage: "256GB", price: 290 }] },
  { series: "11", name: "iPhone 11", image: "iphone11.webp", tag: "Starter iPhone", options: [{ storage: "64GB", price: 210 }, { storage: "128GB", price: 220 }] }
];

const productGrid = document.getElementById("productGrid");
const featuredGrid = document.getElementById("featuredGrid");
const filters = document.querySelectorAll(".filter");
const searchInput = document.getElementById("searchInput");
let activeSeries = "All";

function money(value) {
  return `$${value.toLocaleString("en-US")}`;
}

function lowestPrice(product) {
  return Math.min(...product.options.map(option => option.price));
}

function whatsappUrl(product, option) {
  const text = `Hi ShaneMobilez, is the ${product.name} ${option.storage} for ${money(option.price)} available?`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
}

function productMatches(product, query) {
  if (!query) return true;
  const text = `${product.name} ${product.series} ${product.tag} ${product.options.map(o => `${o.storage} ${o.price}`).join(" ")}`.toLowerCase();
  return text.includes(query.toLowerCase());
}

function productCard(product) {
  const optionRows = product.options.map(option => `
    <div class="option-row">
      <span>${option.storage}</span>
      <strong>${money(option.price)}</strong>
      <a href="${whatsappUrl(product, option)}" target="_blank" rel="noopener">Order</a>
    </div>
  `).join("");

  return `
    <article class="product-card" data-series="${product.series}">
      <div class="product-media">
        <img src="assets/${product.image}" alt="${product.name}" loading="lazy" decoding="async">
      </div>
      <div class="product-body">
        <span class="series-pill">iPhone ${product.series} Series</span>
        <h3>${product.name}</h3>
        <p>${product.tag} • Brand New Boxed</p>
        <div class="starting">Starting from <strong>${money(lowestPrice(product))}</strong></div>
        <div class="options">${optionRows}</div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const query = searchInput.value.trim();
  const filtered = products.filter(product => {
    const seriesOk = activeSeries === "All" || product.series === activeSeries;
    return seriesOk && productMatches(product, query);
  });

  productGrid.innerHTML = filtered.length ? filtered.map(productCard).join("") : `
    <div class="empty-state">
      <h3>No matching iPhones found</h3>
      <p>Try another model or clear the search box.</p>
    </div>
  `;
}

function renderFeatured() {
  const featured = products.filter(product => ["iPhone 16 Pro Max", "iPhone 15 Pro Max", "iPhone 14 Pro Max", "iPhone 13 Pro Max"].includes(product.name));
  featuredGrid.innerHTML = featured.map(product => `
    <article class="featured-card">
      <img src="assets/${product.image}" alt="${product.name}" loading="lazy" decoding="async">
      <div>
        <span>Brand New Boxed</span>
        <h4>${product.name}</h4>
        <p>From <strong>${money(lowestPrice(product))}</strong></p>
      </div>
    </article>
  `).join("");
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    activeSeries = button.dataset.series;
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);
document.getElementById("year").textContent = new Date().getFullYear();
renderFeatured();
renderProducts();
