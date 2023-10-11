//Chow Ho Kin Wilkins 300367633

let users;
let pages = [];
const pageSize = 10;
const contactList = document.getElementsByClassName("contact-list")[0];
console.log(contactList);

// read the js file
// separate it into pages

fetch("./js/data.js")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        console.log(data.length);
        users = data;
        createPages(data);
        console.log(pages);
        updateUserList(0);
        createPageMenu();
    });

//break into pages
function createPages(data){
    const totalUser = document.getElementsByTagName("h3")[0];
    totalUser.innerText = `Total: ${data.length}`;
    for (i = 0; i < data.length; i += pageSize){
        const page = data.slice(i, i + pageSize);
        pages.push(page);
    }
};


// update the display
function updateUserList(pageNumber){
    contactList.innerHTML = "";
    for (i = 0; i < pages[pageNumber].length; i++){
        let item =
        `<li class="contact-item cf">
            <div class="contact-details">
                <img class="avatar" src="${pages[pageNumber][i].image}">
                <h3>${pages[pageNumber][i].name}</h3>
                <span class="email">${pages[pageNumber][i].email}</span>
            </div>
            <div class="joined-details">
                <span class="date">Joined ${pages[pageNumber][i].joined}</span>
            </div>
        </li>`;
        contactList.insertAdjacentHTML("beforeend", item);
    }
};

// add the page numbers at the bottom
function createPageMenu(){
    const pageList = document.createElement("ul");
    pageList.classList.add("pagination");
    contactList.insertAdjacentElement("afterEnd", pageList);
    
    for (j = 1; j < (pages.length + 1); j++){
        const listItem = document.createElement("li");
        listItem.classList.add("pagination");
        const linkItem = document.createElement("a");
        linkItem.innerText = j;
        listItem.appendChild(linkItem);
        pageList.appendChild(listItem);

        (function(p){linkItem.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(p);
            updateUserList(p-1);
        }
        )})(j);

    }
}