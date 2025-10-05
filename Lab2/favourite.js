const FAVOURITES_KEY = "bookFavourites";
//get favourited from  Local storage
function getFavourites(){
const favourites = localStorage.getItem(FAVOURITES_KEY);
return favourites ? JSON.parse(favourites): [];
}

//save favorites to localStorage
function saveFavourites(favourites){
    localStorage.setItem(FAVOURITES_KEY,JSON.stringify(favourites))

}
//BOOK LOGIC
//add a book to favourites
function addFavourite(book){
    const favourites = getFavourites();
    if(!favourites.find(f => f.id === book.id)){
        favourites.push(book);
        saveFavourites(favourites);
    }
}

//remove a book from favourites
function removeFavourite(bookId){
    const favourite = getFavourites().filter(f.id !== bookId);
    saveFavourites(favourites);

}
//display favourites in the grid
function displayFavourites(){
    const container = document.getElementById("booklist");
    const favourites = getFavourites();
    container.innerHTML="";
    if (favourites.length === 0){
        container.innerHTML = `<p class="text-gray-500 text-center w-full">No favourite books yet!</p>`;
        return;
    }
}
favourites.forEach(book => {
    const card = document.createElement("div");
    card.className = "bg-white shadow-md rounded-lg overflow-hidden";
    card.innerHTML = `
     <img src="${book.image}" alt="${book.title}" class="h-56 w-full object-cover">
      <div class="p-4">
        <h3 class="font-bold text-lg mb-2">${book.title}</h3>
        <p class="text-sm text-gray-500">${book.author}</p>
        <button class="remove-btn bg-red-500 text-white px-3 py-1 mt-3 rounded hover:bg-red-600">
          Remove
        </button>
      </div>`;
const removeBtn = card.querySelector(".remove-btn");
removeBtn.addEventListener("click", () => {
    removeFavourite(book.id);
    displayFavourites();
});
container.appendChild(card);
});
//initialise demo favourites (hardcoded data)
function initialiseFavourites(){
    const demoBooks = [
        { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "../Assets/book1.jpg" },
        {id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", image: "../Assets/book2.jpg"},
          { id: 3, title: "1984", author: "George Orwell", image: "../Assets/book3.jpg" }
    ];
    if(getFavourites().length === 0){
        demoBooks.forEach(addFavourite);
    }
    displayFavourites();
}
window.onload = initializeFavourites;
