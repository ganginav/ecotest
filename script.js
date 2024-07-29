const sheetUrl = 'https://spreadsheets.google.com/feeds/list/2PACX-1vQ4Y7JH6r-lo684eRID35zd6PBOw_IRT7KMSt1lkki0i5ZirBIJqtsiY9SuxWjMHEOnK3qGBnCLaIYA/od6/public/values?alt=json';

async function fetchBooks() {
    try {
        const response = await fetch(sheetUrl);
        const data = await response.json();
        const books = data.feed.entry.map(entry => ({
            name: entry.gsx$name.$t,
            condition: entry.gsx$condition.$t,
            originalPrice: entry.gsx$originalprice.$t,
            salePrice: entry.gsx$saleprice.$t,
            notes: entry.gsx$notes.$t,
            imageUrl: entry.gsx$imageurl.$t
        }));
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function displayBooks(books) {
    const marketplace = document.getElementById('marketplace');
    marketplace.innerHTML = ''; // Clear the marketplace

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'card';

        const bookName = document.createElement('h2');
        bookName.textContent = book.name;
        bookCard.appendChild(bookName);

        const bookCondition = document.createElement('p');
        bookCondition.textContent = `Condition: ${book.condition}`;
        bookCard.appendChild(bookCondition);

        const bookOriginalPrice = document.createElement('p');
        bookOriginalPrice.className = 'original-price';
        bookOriginalPrice.textContent = book.originalPrice;
        bookCard.appendChild(bookOriginalPrice);

        const bookSalePrice = document.createElement('p');
        bookSalePrice.className = 'sale-price';
        bookSalePrice.textContent = book.salePrice;
        bookCard.appendChild(bookSalePrice);

        const moreInfoButton = document.createElement('button');
        moreInfoButton.textContent = "More Info";
        moreInfoButton.onclick = () => showModal(book);
        bookCard.appendChild(moreInfoButton);

        marketplace.appendChild(bookCard);
    });
}

function showModal(book) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-image').src = book.imageUrl;
    document.getElementById('modal-title').textContent = book.name;
    document.getElementById('modal-condition').textContent = `Condition: ${book.condition}`;
    document.getElementById('modal-original-price').textContent = book.originalPrice;
    document.getElementById('modal-sale-price').textContent = book.salePrice;
    document.getElementById('modal-notes').textContent = `Notes: ${book.notes}`;

    modal.style.display = "block";

    const closeModal = document.querySelector('.close');
    closeModal.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

function searchBooks(books) {
    const searchBar = document.getElementById('search-bar');
    const searchQuery = searchBar.value.toLowerCase();
    const filteredBooks = books.filter(book => book.name.toLowerCase().includes(searchQuery));
    displayBooks(filteredBooks);
}

document.getElementById('search-bar').addEventListener('input', () => searchBooks(books));

document.addEventListener('DOMContentLoaded', fetchBooks);
