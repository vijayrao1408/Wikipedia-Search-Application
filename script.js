let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;

    let divEl = document.createElement("div");
    divEl.classList.add("result-item");
    searchResultsEl.appendChild(divEl);

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    divEl.appendChild(titleEl);

    let titleBreak = document.createElement("br");
    divEl.appendChild(titleBreak);

    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    divEl.appendChild(urlEl);

    let urlBreak = document.createElement("br");
    divEl.appendChild(urlBreak);

    let paraEl = document.createElement("p");
    paraEl.textContent = description;
    paraEl.classList.add("link-description");
    divEl.appendChild(paraEl);
}

function displayResult(search_results) {
    spinnerEl.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = "";

        let userVal = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + userVal;

        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
