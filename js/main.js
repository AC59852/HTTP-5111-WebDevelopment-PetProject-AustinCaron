// switch statement for checking the page route
// if the page is home, run the home function

let page = window.location.pathname;
switch (page) {
    case "/index.html":
        home();
        break;
    case "/anime.html":
        anime();
        break;
    case "characters.html":
        characters();
        break;
    case "aot.html":
        aot();
        break;
    case "eren.html":
        eren();
        break;
}

function home() {

    let explore = document.querySelector(".explore__wrapper"),
        recent = document.querySelector(".recent__wrapper");
    
    fetchContent().then(data => {
        let thumbnails = data.thumbnails;

        // limit the number of thumbnails to 10
        thumbnails = thumbnails.slice(0, 10);

        // create a div for each thumbnail and shuffle the array
        let shuffle = thumbnails.sort(() => 0.5 - Math.random());

        // create a div for each thumbnail
        shuffle.forEach(thumbnail => {
            let div = document.createElement("div");
            div.classList.add("explore__thumbnail");
            div.innerHTML = `
            <img src="${thumbnail.icon}" alt="${thumbnail.abbr}">
            <h3>${thumbnail.abbr}</h3>
            `;

            // if the thumbnail.tag is anime, wrap the div in a link to the anime page
            if (thumbnail.tag === "anime") {
                div.innerHTML = `
                <a href="aot.html">
                    ${div.innerHTML}
                </a>
                `;
            } else if (thumbnail.tag === "character") {
                div.innerHTML = `
                <a href="eren.html">
                    ${div.innerHTML}
                </a>
                `;
            }

            explore.appendChild(div);
        });

        // create a div for each thumbnail and add it to the recent section
        // thumbnails.forEach(thumbnail => {
        //     let div = document.createElement("div");
        //     div.classList.add("recent__thumbnail");
        //     div.innerHTML = `
        //     <img src="${thumbnail.icon}" alt="${thumbnail.abbr}">
        //     <h3>${thumbnail.abbr}</h3>
        //     `;

        //     recent.appendChild(div);
        // });
    })

}

async function fetchContent(){
    const response = await fetch("https://api.npoint.io/9d18e4e8115d2a4fe31f");
    const data = await response.json();
    return data;
}