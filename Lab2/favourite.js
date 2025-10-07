// Lab2/favourite.js

// Get favorites from localStorage
function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// Save favorites to localStorage
function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Add a book to favorites
function addToFavorites(book) {
  const favorites = getFavorites();
  const exists = favorites.some(fav => fav.title === book.title);
  if (!exists) {
    favorites.push(book);
    saveFavorites(favorites);
    alert(`✅ "${book.title}" added to favorites!`);
  } else {
    alert(`⚠️ "${book.title}" is already in favorites.`);
  }
}

// Remove from favorites
function removeFromFavorites(title) {
  let favorites = getFavorites();
  favorites = favorites.filter(fav => fav.title !== title);
  saveFavorites(favorites);
  renderFavorites();
}

// Render favorites (for favourite.html)
function renderFavorites() {
  const container = document.getElementById("favorites-list");
  if (!container) return;

  const favorites = getFavorites();
  container.innerHTML = "";

  if (favorites.length === 0) {
    container.innerHTML = `<p class="text-gray-600 text-center col-span-full">💔 No favorite books yet.</p>`;
    return;
  }

  favorites.forEach(book => {
    const card = document.createElement("div");
    card.className =
      "bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1";

    card.innerHTML = `
      <div class="h-56 w-full overflow-hidden">
        <img src="${book.img}" alt="${book.title}" class="h-full w-full object-cover" />
      </div>
      <div class="p-4 flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-lg mb-1">${book.title}</h3>
          <p class="text-sm text-gray-500 mb-3">by ${book.author}</p>
        </div>
        <button 
          class="remove-fav-btn bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2 transition"
          data-title="${book.title}">
          <i class="fa-solid fa-trash"></i> Remove
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  // Attach remove events
  document.querySelectorAll(".remove-fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.title;
      removeFromFavorites(title);
    });
  });
}
