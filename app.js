class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBooks() {
    const myBooks = [
      {
        title: "he",
        author: "j",
        isbn: "123",
      },
      {
        title: "kk",
        author: "max",
        isbn: "9982",
      },
    ];

    const books = myBooks;

    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td style="padding:0 20px 0 20px;">${book.title}</td>
    <td style="padding:0 20px 0 20px;">${book.author}</td>
    <td style="padding:0 20px 0 20px;">${book.isbn}</td>
    <td style="padding:0 20px 0 20px;">X</td>`;

    list.appendChild(row);
  }
}

//Display a Book in table
document.addEventListener("DOMContentLoaded", UI.displayBooks);
