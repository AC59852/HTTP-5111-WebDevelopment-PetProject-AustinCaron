// switch statement for checking the page route
// if the page is home, run the home function

let page = window.location.pathname,
    navIcon = document.querySelector(".nav__icon"),
    navMenu = document.querySelector(".nav__list"),
    navClose = document.querySelector(".nav__close");

    navIcon.addEventListener("click", () => {
        navMenu.classList.toggle("nav__list--active");
        
        // add stop-scroll to body
        document.body.classList.toggle("stop-scroll");
    });

    navClose.addEventListener("click", () => {
        navMenu.classList.toggle("nav__list--active");
        document.body.classList.toggle("stop-scroll");
    });

switch (page) {
    case "/index.html":
        home();
        break;
    case "/":
        home();
        break;
    case "/anime.html":
        anime();
        break;
    case "/characters.html":
        characters();
        break;
    case "/aot.html":
        aot();
        break;
    case "/eren.html":
        eren();
        break;
}

function home() {

    let explore = document.querySelector(".explore__wrapper"),
        recent = document.querySelector(".recent__wrapper");
    
    fetchContent().then(data => {
        let thumbnails = data.thumbnails;

        // reverse the array so the most recent shows are at the top
        thumbnails = thumbnails.reverse();

        // limit the number of thumbnails to 10 if the window is less than 1366px
        if(window.innerWidth < 1366) {
            thumbnailsShuffled = thumbnails.slice(0, 10);
        } else {
            thumbnailsShuffled = thumbnails.slice(0, 12);
        }

        // create a div for each thumbnail and shuffle the array
        let shuffle = thumbnailsShuffled.sort(() => 0.5 - Math.random());

        // create a div for each thumbnail
        shuffle.forEach(thumbnail => {
            let div = document.createElement("a");
            div.classList.add("thumbnail", "explore__thumbnail");
            div.innerHTML = `
                <img src="${thumbnail.icon}" alt="${thumbnail.abbr}">
                <h3>${thumbnail.abbr}</h3>
            `;

            // if the thumbnail.tag is anime, wrap the div in a link to the anime page
            if (thumbnail.tag === "anime") {
                div.href = 'aot.html';
            } else if (thumbnail.tag === "character") {
                div.href = 'eren.html';
            }

            explore.appendChild(div);
        });

        // create a div for each thumbnail and add it to the recent section
        thumbnails.forEach(thumbnail => {
            let div = document.createElement("a");
            div.classList.add("thumbnail", "recent__thumbnail");
            div.innerHTML = `
                <img src="${thumbnail.icon}" alt="${thumbnail.abbr}">
                <h3>${thumbnail.abbr}</h3>
            `;

            if (thumbnail.tag === "anime") {
                div.href = 'aot.html';
            } else if (thumbnail.tag === "character") {
                div.href = 'eren.html';
            }

            recent.appendChild(div);
        });
    })

}

function anime() {
    let anime = document.querySelector(".anime__wrapper");
    fetchContent().then(data => {
        let thumbnails = data.thumbnails;

        // only get the thumbnails that are thumbnail.tag === anime
        let thumbnailsFiltered = thumbnails.filter(thumbnail => thumbnail.tag === "anime");

        // create a div for each thumbnail and add it to the recent section
        thumbnailsFiltered.forEach(thumbnail => {
            let div = document.createElement("a");
            div.classList.add("thumbnail", "anime__thumbnail");
            div.innerHTML = `
                <img src="${thumbnail.icon}" alt="${thumbnail.abbr}">
                <h3>${thumbnail.abbr}</h3>
            `;
            div.href = 'aot.html';
            anime.appendChild(div);
        });
    })
}

function aot() {
    let aotLogo = document.querySelector(".aot__logo"),
        aotContent = document.querySelector(".aot__content"),
        aotBck = document.querySelector(".aot__background");

    fetchContent().then(data => {
        let animeData = data.anime["Attack on Titan"];

        // console log data.anime Attack on Titan
        console.log(data.anime["Attack on Titan"]);

        // set the body background-image to animeData.bck

        if(window.innerWidth < 1366) {
            aotBck.style.backgroundImage = `url(${animeData.bck})`;
        } else {
            aotBck.style.backgroundImage = `url(${animeData.bck_full})`;
        }
        aotLogo.src = animeData.logo;

        // create a p tag for each item in animeData.landing_info and append it to aotContent
        animeData.landing_info.forEach(item => {
            let p = document.createElement("p");
            p.classList.add("aot__para")
            p.innerHTML = item.content;
            aotContent.appendChild(p);
        });
    })
}

function characters() {
    let name = document.querySelector(".characters__name"),
        image = document.querySelector(".characters__image"),
        bio = document.querySelector(".characters__bio");
        dots = document.querySelector(".characters__dots");

    fetchContent().then(data => {
        let characterData = data.anime["Attack on Titan"].characters;
        // store characterData in an array
        let characterArray = Object.values(characterData);

        // set the name, image and bio to the first character in the array
        name.innerHTML = characterArray[0].first_name;
        image.src = characterArray[0].card_img;
        bio.innerHTML = characterArray[0].bio;
        if(window.innerWidth < 1366) {
            name.style.fontSize = characterArray[0].fontRatio + "px";
        } else {
            name.style.fontSize = characterArray[0].fontRatio * 1.3 + "px";
        }

        document.querySelector(".characters__bck").style.backgroundImage = `url(${characterArray[0].card_bck})`;

        
        // order the array by the character.id
        characterArray.sort((a, b) => a.id - b.id);

        // create a span for each character and add it to the dots section
        characterArray.forEach(character => {
            let span = document.createElement("span");
            span.classList.add("characters__dot");
            dots.appendChild(span);

            // add class of dot--active to the first span
            if (characterArray.indexOf(character) === 0) {
                span.classList.add("dot--active");
            }

            // add an event listener to each span
            span.addEventListener("click", () => {
                // remove class of dot--active from all spans
                let spans = document.querySelectorAll(".characters__dot");
                spans.forEach(span => {
                    span.classList.remove("dot--active");
                });

                console.log(characterArray.indexOf(character));

                // add class of dot--active to the clicked span
                span.classList.add("dot--active");

                let characterContent = characterArray[characterArray.indexOf(character)];
                
                name.innerHTML = characterContent.first_name;
                image.src = characterContent.card_img;
                bio.innerHTML = characterContent.bio;

                if(window.innerWidth < 1366) {
                    name.style.fontSize = characterContent.fontRatio + "px";
                } else {
                    name.style.fontSize = characterContent.fontRatio * 1.2 + "px";
                }

                document.querySelector(".characters__bck").style.backgroundImage = `url(${characterArray[characterArray.indexOf(character)].card_bck})`;
            })
        });
    })
}

function eren() {
    fetchContent().then(data => {
        let firstName = document.querySelector(".eren__firstName"),
            lastName = document.querySelector(".eren__lastName"),
            hero = document.querySelector(".eren__heroImg"),
            profile = document.querySelector(".eren__profile"),
            basicInfo = document.querySelector(".eren__basicInfo");

        let eren = data.anime["Attack on Titan"].characters["Eren Yeager"];

        firstName.innerHTML = eren.first_name;
        lastName.innerHTML = eren.last_name;

        hero.src = eren.imgs["hero_img"];
        profile.src = eren.imgs["profile_img"];

        eren.basic_info.forEach(item => {
            let div = document.createElement("div");
            div.classList.add("eren__info");
            div.innerHTML = `
            <h4>${item.title}</h4>
            <p>${item.value}</p>
            `
            basicInfo.appendChild(div);
        });

        document.querySelectorAll(".eren__navItem").forEach(item => {
            item.addEventListener("click", () =>{
                // get the text content of the clicked item
                let content = item.textContent;

                if(content === 'Timeline') {
                    erenTimeline();
                } else if(content === 'Relationships') {
                    erenRelationships();
                } else if(content === 'Key Moments') {
                    erenKeyMoments();
                } else if(content === 'Skills') {
                    erenSkills();
                } else if(content === 'More') {
                    erenMore();
                }
            })
        })
    })
}

function erenTimeline() {
    fetchContent().then(data => {
        let eren = data.anime["Attack on Titan"].characters["Eren Yeager"],
            erenTimeline = eren.details["timeline"],
            content = document.querySelector(".eren__content"),
            nav = document.querySelector(".eren__nav--small");

            // clear the content div
            content.innerHTML = "";
            nav.innerHTML = "";

        eren.details["timeline"].forEach(item => {
            let li = document.createElement("p");
                li.classList.add("eren__year");
                li.innerHTML = item.year
            nav.appendChild(li);

            li.addEventListener("click", () => {
                erenTimeline[erenTimeline.indexOf(item)]["events"].forEach(event => {
                    let para = document.createElement("p");
                    para.classList.add("eren__event");
                    para.innerHTML = event.details

                    content.appendChild(para);
                })
            })
        })
    })
}

function erenRelationships() {
    fetchContent().then(data => {
        let eren = data.anime["Attack on Titan"].characters["Eren Yeager"],
            erenRelationships = eren.details["relationships"],
            content = document.querySelector(".eren__content"),
            nav = document.querySelector(".eren__nav--small");

            // clear the content div
            content.innerHTML = "";
            nav.innerHTML = "";

        eren.details["relationships"].forEach(item => {
            let li = document.createElement("p");
                li.classList.add("eren__person");
                li.innerHTML = item.name
            nav.appendChild(li);

            li.addEventListener("click", () => {
                let relationship = erenRelationships[erenRelationships.indexOf(item)];

                let div = document.createElement("div"),
                    relContent = document.createElement("div");

                div.classList.add("eren__relationship");
                relContent.classList.add("eren__relationshipContent");

                div.innerHTML = `
                <img src="${relationship.image}" alt="Image of Eren and ${relationship.name}">
                `

                relationship.content.forEach(item => {
                    let p = document.createElement("p");
                    p.innerHTML = item.details;

                    relContent.appendChild(p);
                })

                content.appendChild(div);
                div.appendChild(relContent);
            })
        })
    }) 
}

function erenKeyMoments() {
    fetchContent().then(data => {
        let eren = data.anime["Attack on Titan"].characters["Eren Yeager"],
            erenKeyMoments = eren.details["key moments"],
            content = document.querySelector(".eren__content"),
            nav = document.querySelector(".eren__nav--small");

            // clear the content div
            content.innerHTML = "";
            nav.innerHTML = "";

        erenKeyMoments.forEach(moment => {
            let div = document.createElement("div"),
                keyContent = document.createElement("div");

            div.classList.add("eren__keyMoment");
            keyContent.classList.add("eren__keyWrapper");

            div.innerHTML = `<img src="${moment.img} alt="Image of ${moment.title}"">`

            keyContent.innerHTML = `<h3>${moment.title}</h3>`

            moment.content.forEach(item => {
                let p = document.createElement("p");
                p.innerHTML = item.details;

                keyContent.appendChild(p);
            })

            content.appendChild(div);
            div.appendChild(keyContent);
        })
    }) 
}

function erenSkills() {
    fetchContent().then(data => {
        let eren = data.anime["Attack on Titan"].characters["Eren Yeager"],
            erenSkills = eren.details["skills"],
            content = document.querySelector(".eren__content"),
            nav = document.querySelector(".eren__nav--small");

            // clear the content div
            content.innerHTML = "";
            nav.innerHTML = "";

        erenSkills.forEach(skill => {
            let div = document.createElement("div"),
                skillContent = document.createElement("div");

            div.classList.add("eren__skill");
            skillContent.classList.add("eren__skillWrapper");

            div.innerHTML = `<h3>${skill.title}</h3>`

            skill.content.forEach(item => {
                let p = document.createElement("p");
                p.innerHTML = item.details;

                skillContent.appendChild(p);
            })

            content.appendChild(div);
            div.appendChild(skillContent);
        })
    }) 
}

function erenMore() {
    fetchContent().then(data => {
        let eren = data.anime["Attack on Titan"].characters["Eren Yeager"],
            erenMore = eren.details["more"],
            content = document.querySelector(".eren__content"),
            nav = document.querySelector(".eren__nav--small");

            // clear the content div
            content.innerHTML = "";
            nav.innerHTML = "";

        erenMore.forEach(item => {
            let div = document.createElement("p");

            div.classList.add("eren__more");

            div.innerHTML = item.content

            content.appendChild(div);
        })
    }) 
}

async function fetchContent(){
    const response = await fetch("https://api.npoint.io/9d18e4e8115d2a4fe31f");
    const data = await response.json();
    return data;
}