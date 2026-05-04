const content = document.getElementById("content");
const catalogLink = document.getElementById("catalogLink");
const showCatalogBtn = document.getElementById("showCatalogBtn");

catalogLink.addEventListener("click", function (event) {
  event.preventDefault();
  loadCatalog();
});

showCatalogBtn.addEventListener("click", loadCatalog);

async function getJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Помилка завантаження файлу: " + url);
  }

  return await response.json();
}

async function loadCatalog() {
  try {
    const categories = await getJSON("data/categories.json");

    let html = `
      <h2>Каталог</h2>
      <p>Оберіть категорію, щоб переглянути товари.</p>
      <div class="category-grid">
    `;

    categories.forEach(category => {
      html += `
        <div class="category-card">
          <h3>${category.name}</h3>
          <p>${category.notes || "Опис категорії відсутній."}</p>
          <a href="#" class="category-link" data-shortname="${category.shortname}">
            Переглянути
          </a>
        </div>
      `;
    });

    html += `
      </div>
      <div class="special-box">
        <h3>Specials</h3>
        <p>Натисніть, щоб відкрити випадкову категорію каталогу.</p>
        <a href="#" class="special-link" id="specialsLink">Specials</a>
      </div>
    `;

    content.innerHTML = html;

    document.querySelectorAll(".category-link").forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        loadCategory(this.dataset.shortname);
      });
    });

    document.getElementById("specialsLink").addEventListener("click", function (event) {
      event.preventDefault();
      const randomIndex = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[randomIndex];
      loadCategory(randomCategory.shortname);
    });
  } catch (error) {
    content.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

async function loadCategory(shortname) {
  try {
    const categoryData = await getJSON(`data/${shortname}.json`);

    let html = `
      <h2>${categoryData.categoryName}</h2>
      <p>${categoryData.categoryDescription}</p>
      <div class="products-grid">
    `;

    categoryData.items.forEach(item => {
      html += `
        <article class="product-card">
          <img src="https://placehold.co/200x200?text=${encodeURIComponent(item.name)}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p class="price">${item.price} грн</p>
        </article>
      `;
    });

    html += `
      </div>
      <a href="#" class="back-link" id="backToCatalog">← Повернутися до каталогу</a>
    `;

    content.innerHTML = html;

    document.getElementById("backToCatalog").addEventListener("click", function (event) {
      event.preventDefault();
      loadCatalog();
    });
  } catch (error) {
    content.innerHTML = `<p class="error">${error.message}</p>`;
  }
}
