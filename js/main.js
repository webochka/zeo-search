let searchResult = document.getElementById('searchResult');
let input = document.getElementById('searchInput');

input.addEventListener('input', (e) => {
    let currentValue = input.value;

    setTimeout(function() {
        let newValue = input.value;
        if (currentValue === newValue && newValue.length > 3) {
            render(newValue);
        }
    }, 3000);
})

function render(newValue) {
    let promise = fetch(`https://www.googleapis.com/books/v1/volumes?q=${newValue}`);

    promise
        .then(function(v) {
            return v.json();
        })
        .then(function(body) {
            let result = "";

            if (typeof body.items == 'undefined') {
                result = `<div class="book-search__item">
                  <p class="book-search__error">no matches were found for your query</p>
                </div>`
            }

            else{

            body.items.forEach(function(item) {
                result += `
                  <div class="book-search__item">
                  <p class="book-search__title">${item.volumeInfo.title}</p>`

                if (typeof item.volumeInfo.description != 'undefined') {
                    result += `<p class="book-search__desc">${item.volumeInfo.description}</p>`
                }

                if (typeof item.volumeInfo.authors != 'undefined') {
                    result += `<p class="book-search__author">${item.volumeInfo.authors}</p>`
                }

                result += `
                  <a target="_blank" href="${item.volumeInfo.previewLink}" class="book-search__link">read more...</a>              
                  </div>`
            })

          }

            searchResult.innerHTML = result;
        })
}
