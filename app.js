class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td style="padding:0 20px 0 20px;">${book.title}</td>
    <td style="padding:0 20px 0 20px;">${book.author}</td>
    <td style="padding:0 20px 0 20px;">${book.isbn}</td>
    <td style="padding:0 20px 0 20px;"><a href = "#" class = delete>X</a></td>`;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Display a Book in table
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Add a book using form
const bookForm = document.getElementById("bookForm");
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  if (title === "" || author === "" || isbn === "") {
    alert("fill in all fields");
  } else {
    //create new book with these values
    const book = new Book(title, author, isbn);

    //Add book to display in UI
    UI.addBookToList(book);

    //Add book to storage
    Store.addBook(book);

    //Clear Fields
    UI.clearFields();
  }
});

//Remove a book
document.getElementById("book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
});
