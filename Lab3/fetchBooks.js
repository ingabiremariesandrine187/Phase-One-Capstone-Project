// Lab3/fetchBooks.js

// Fetch books from Open Library API
async function fetchBooks(query = "javascript") {
  const url = `https://openlibrary.org/search.json?q=${query}&limit=12`;
  const response = await fetch(url);
  const data = await response.json();

  // Render the books
  renderBooks(data.docs);
}

// Render book cards in index.html
function renderBooks(books) {
  const container = document.querySelector("main");

  // Create a section for the book cards
  const bookGrid = document.createElement("div");
  bookGrid.className = "grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  // If no books
  if (books.length === 0) {
    container.innerHTML = `<p class="text-gray-600 text-center col-span-full">No books found.</p>`;
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

  // Optional: Add search functionality
  const searchInput = document.querySelector("input[type='text']");
  const searchButton = document.querySelector("button");

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      const query = searchInput.value.trim() || "javascript";
      document.querySelector("main").innerHTML = `
        <h2 class="text-2xl font-bold mb-6 text-yellow-800">Book Collection</h2>
      `;
      fetchBooks(query);
    });
  }
});
