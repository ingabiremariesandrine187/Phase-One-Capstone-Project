// Lab3/fetchBooks.js

// Fetch books from Open Library API
async function fetchBooks(query = "javascript") {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    renderBooks(data.docs);
  } catch (error) {
    console.error("Error fetching books:", error);
    const container = document.querySelector("main");
    container.innerHTML = `
      <h2 class="text-2xl font-bold mb-6 text-yellow-800">Book Collection</h2>
      <p class="text-red-500 text-center">Failed to load books. Please try again.</p>
    `;
  }
}

// Render book cards in index.html
function renderBooks(books) {
  const container = document.querySelector("main");
  container.innerHTML = `
    <h2 class="text-2xl font-bold mb-6 text-yellow-800">Book Collection</h2>
  `;

  const bookGrid = document.createElement("div");
  bookGrid.className = "grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  if (books.length === 0) {
    bookGrid.innerHTML = `<p class="text-gray-600 text-center col-span-full">No books found.</p>`;
    container.appendChild(bookGrid);
    return;
  }

  books.forEach(book => {
    const title = book.title || "Unknown Title";
    const author = book.author_name ? book.author_name[0] : "Unknown Author";
    const coverId = book.cover_i;
    const img = coverId
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : "https://via.placeholder.com/150x220?text=No+Cover";

    const card = document.createElement("div");
    card.className =
      "bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1";

    card.innerHTML = `
      <div class="h-56 w-full overflow-hidden">
        <img src="${img}" alt="${title}" class="h-full w-full object-cover" />
      </div>
      <div class="p-4 flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-lg mb-1">${title}</h3>
          <p class="text-sm text-gray-500 mb-3">by ${author}</p>
        </div>
        <button 
          class="add-fav-btn bg-yellow-800 hover:bg-yellow-700 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2 transition"
          data-title="${title}" 
          data-author="${author}" 
          data-img="${img}">
          <i class="fa-solid fa-heart"></i> Add to Favorites
        </button>
      </div>
    `;

    bookGrid.appendChild(card);
  });

  container.appendChild(bookGrid);

  // Attach event listeners for add-to-favorite buttons
  document.querySelectorAll(".add-fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const book = {
        title: btn.dataset.title,
        author: btn.dataset.author,
        img: btn.dataset.img,
      };
      addToFavorites(book); // from favourite.js
    });
  });
}

// When DOM is ready, fetch default books
document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();

  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  if (searchButton && searchInput) {
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim();
      fetchBooks(query || "javascript");
    });

    // Also allow Enter key search
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        fetchBooks(query || "javascript");
      }
    });
  }
});
