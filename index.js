var findButton = document.querySelector("#findButton");
var textInput = document.querySelector("#searchInput");
var responseList = document.querySelector(".response");
var loader = document.querySelector(".loadingDiv");
var isLoading = false;

findButton.addEventListener("click", search);

function toggleLoader() {
    isLoading ? loader.classList.add("loader") : loader.classList.remove("loader")
}

async function search() {
    if (responseList.childElementCount > 0) {
        responseList.replaceChildren();
    }
    isLoading = true;
    toggleLoader();
    var val = textInput.value;
    console.log('valeur:', val)
    fetch("https://google-search3.p.rapidapi.com/api/v1/search/q=" + val, {
        "method": "GET",
        "headers": {
            "x-user-agent": "desktop",
            "x-proxy-location": "FR",
            "x-rapidapi-host": "google-search3.p.rapidapi.com",
            "x-rapidapi-key": "b6ff693ca8mshef22cf2954b3f6fp16084djsn3aa38b030229"
        }
    }).then(response => {

        isLoading = false;
        toggleLoader();
        const data = response.json().then(data => {
            data.results.forEach(element => {
                const responseDiv = document.createElement("div");
                const titre = document.createElement("h1");
                const description = document.createElement("p");
                const lien = document.createElement("a");

                responseDiv.classList.add("result");
                titre.innerText = element.title;
                description.innerText = element.description;
                lien.innerHTML = element.link;
                lien.href = element.link;

                responseList.appendChild(responseDiv);
                responseDiv.appendChild(titre);
                responseDiv.appendChild(description);
                responseDiv.appendChild(lien);

            })
        });
    }).catch(err => {
        console.error(err);
    });
}







