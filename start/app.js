// *****************************************
// *** Begin Utility functions

function getAuthorId(author) {
    return author.name.split(' ').pop();
}

function buildAuthorElement(author) {
    const id = getAuthorId(author);
    return `
      <div class="author" id="${id}">
        <img src="${author.image}" />
        <h2>${author.name}</h2>
        <div class="books"></div>
      </div>
    `;
}

function buildBookElement(book) {
    return `
      <div>
        <img src="${book.image}" />
        <h2>${book.title}</h2>
      </div>
    `;
}

/*
__V1, V2, and V3 functions__
function appendAuthor(author) {
  const authorElement = buildAuthorElement(author);
  $('#authors').append(authorElement);
}

function appendBook(book, author) {
  const authorId = getAuthorId(author);
  const bookElement = buildBookElement(book);
  $(`#${authorId} .books`).append(bookElement);
}*/

// *** End Utility functions
// *****************************************


function renderRoot(authors) {
    authors.forEach(author => {
        $('#authors').append(buildAuthorElement(author));
        if (author.books) {
            author.books.forEach(book => {
                const selector = `#${getAuthorId(author)} .books`;
                const bookElement = buildBookElement(book);
                $(selector).append(bookElement);
            });
        }
    });
}

const query = `
{
  authors {
    id
    name
    image
    books {
      id
      authorId
      image
      title
    }
  }
}`;

function fetchDataV4() {
    const url = `http://localhost:5000?query=${query}`;
    $.get(url, res => {
        renderRoot(res.data.authors);
    });
}

$(document).ready(() => {
  /*
   __V1__
   PROBLEMS: No order guarantee (e.g. Rowling and Tolkien reverse), too many network requests,
   if one call fails they all fail. Ideally would have only one call.
   $.get('http://localhost:5000/authors', authorLinks => {
    authorLinks.forEach(authorLink => {
      $.get(authorLink.href, authorData => {
        appendAuthor(authorData);
          $.get(authorData.books, bookLinks => {
            bookLinks.forEach(bookLink => {
              $.get(bookLink.href, bookData => {
                appendBook(bookData, authorData);
              })
            })
          })
        })
      })
   });
   __V2__
   $.get('http://localhost:5000/everything', allData => {
   allData.forEach(authorData => {
   appendAuthor(authorData);
   authorData.books.forEach(book=>appendBook(book, authorData));
   })
   });
  __V3__
  PROBLEMS: Client tells server in single request what it needs, which is helpful.
  But to include description field, could add route, query param, send a payload
  in the request body. Easier to do with GraphQL.
  $.get('http://localhost:5000/everything', allData => {
    allData.forEach(authorData => {
    appendAuthor(authorData);
      authorData.books.forEach(book=>appendBook(book, authorData));
    })
  });

  __V4__
   */
    fetchDataV4();
});
