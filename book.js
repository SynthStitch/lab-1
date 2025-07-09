const book1 = {
    "title": "How to make time",
    "author": "Daniel",
    "year": 2023,
    "publisher": "Self-Published",
    "description": "A guide to managing your time effectively."
}

console.log(book1.title); // Output: How to make time
console.log(book1.author); // Output: Daniel
console.log(book1.year); // Output: 2023
console.log(book1.publisher); // Output: Self-Published
console.log(book1.description); // Output: A guide to managing your time effectively.

console.log(book1); // Output: { title: 'How to make time', author: 'Daniel', year: 2023, publisher: 'Self-Published' }

book1["description"] = "only really works with a time machine."; 
console.log(`Actually ${book1.description}`); // Output: Only really works with a time machine.

// Create an array of 5 book objects
const books = [
    {
    "title": "Stalking the wild pendulum",
    "author": "Itzhak Bentov",
    "year": 1977,
    "publisher": "Destiny Books",
    "description": "A book that explores the nature of time and consciousness."
    },
    {
    "title": "The way of hermes",
    "author": "Clement Salaman",
    "year": 1999,
    "publisher": "inner Traditions",
    "description": "A collection of writings attributed to Hermes Trismegistus, exploring the nature of reality and the divine."
    },
    { 
    "title": "The Kybalion",
    "author": "Three Initiates",
    "year": 1908,
    "publisher": "Yogi Publication Society",
    "description": "A book that explores the principles of Hermetic philosophy, including the nature of reality and the mind."
    },
    {
    "title": "The Secret Teachings of All Ages",
    "author": "Manly P. Hall",
    "year": 1928,
    "publisher": "Philosophical Research Society",
    "description": "A comprehensive introduction to the esoteric traditions of the world, including Hermeticism, Kabbalah, and alchemy."
    },
    {
    "title": "Everymans talmud",
    "author": "Abraham Cohen",
    "year": 1949,
    "publisher": "Schocken Books",
    "description": "A translation and commentary on the Talmud, providing insight into Jewish law and tradition."
    }
]

// Log the array of books
console.log(`I actually have ${books.length} books in my collection. 
    On top of ${book1.title}, I also have: ${books.map(book => book.title).join(', ')}.`);
