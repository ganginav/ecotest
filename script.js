const books = [
    { 
        name: "AP Biology", 
        condition: "Like New", 
        originalPrice: "$25", 
        salePrice: "$20", 
        notes: "Minimal highlighting", 
        imageUrl: "https://m.media-amazon.com/images/I/41FSv-7pVSL._SX404_BO1,204,203,200_.jpg" 
    },
    { 
        name: "SAT Prep", 
        condition: "Good", 
        originalPrice: "$20", 
        salePrice: "$15", 
        notes: "Some wear on the cover", 
        imageUrl: "https://m.media-amazon.com/images/I/51MyxynfSvL._SX379_BO1,204,203,200_.jpg" 
    },
    { 
        name: "ACT Prep", 
        condition: "Fair", 
        originalPrice: "$15", 
        salePrice: "$10", 
        notes: "Several marked pages", 
        imageUrl: "https://m.media-amazon.com/images/I/41+5ieIdQ4L._SX329_BO1,204,203,200_.jpg" 
    },
    { 
        name: "GRE Prep", 
        condition: "Like New", 
        originalPrice: "$30", 
        salePrice: "$25", 
        notes: "Almost new", 
        imageUrl: "https://m.media-amazon.com/images/I/41GPOqD3qYL._SX348_BO1,204,203,200_.jpg" 
    },
    { 
        name: "MCAT Prep", 
        condition: "Good", 
        originalPrice: "$35", 
        salePrice: "$30", 
        notes: "A few notes in margins", 
        imageUrl: "https://m.media-amazon.com/images/I/41VWfbBQuLL._SX331_BO1,204,203,200_.jpg" 
    },
];

function displayBooks(filteredBooks = books) {
    const marketplace = document.getElementById('marketplace');
    marketplace.innerHTML = ''; // Clear the marketplace

    filteredBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'card';

        const bookImage = document.createElement('img');
        bookImage.src = book.imageUrl;
        bookImage.alt = book.name;
        bookCard.appendChild(bookImage);

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

function searchBooks() {
    const searchBar = document.getElementById('search-bar');
    const searchQuery = searchBar.value.toLowerCase();
    const filteredBooks = books.filter(book => book.name.toLowerCase().includes(searchQuery));
    displayBooks(filteredBooks);
}

document.getElementById('search-bar').addEventListener('input', searchBooks);

document.addEventListener('DOMContentLoaded', () => displayBooks(books));
