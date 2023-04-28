const url = "http://localhost:3000";
const container = document.querySelector(".ctn-crocs");
const pickers = document.querySelectorAll(".picker");
let crocs;
let filteredCrocs;

//chargement des crocs

function LoadCrocs() {
    fetch(`${url}/crocs`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            crocs = data.crocs;
            filteredCrocs = crocs;
            console.log(crocs, filteredCrocs);
            getCrocs();
            loadcart();
            
        })
        .catch(error => console.log("erreur : " + error));
}

//récupération des crocs
var img_nbr = "img_1";
function getCrocs() {
    
    container.innerHTML = "";
    console.log(filteredCrocs);
    filteredCrocs.forEach(croc => {
        let crocctn = document.createElement("div");
        crocctn.classList.add("croc-item");
        if (croc.colors.length == 3) {
            crocctn.innerHTML = `
        <img class="croc-img" src="${croc.img_1[0]}" />
        <div class="nom-croc"> ${croc.name} </div>
        <div> ${croc.price}€ </div>
        <button onclick="addcrocs(${croc.id})"> Ajouter au panier </button>
        <a href="details.html" target="blank" class="crocsDetails">détails</a>
        <div class ="color-picker-ctn">
        <div class=" picker round ${croc.colors[0]}" onclick="Switch(0,this, ${croc.id})"></div>
        <div class=" picker round ${croc.colors[1]}" onclick="Switch(1,this, ${croc.id})"></div>
        <div class=" picker round ${croc.colors[2]}" onclick="Switch(2,this, ${croc.id})"></div>
        </div>
        `;
        }else if (croc.colors.length == 2) {
            crocctn.innerHTML = `
        <img class="croc-img" src="${croc.img_1[0]}" />
        <div class="nom-croc"> ${croc.name} </div>
        <div> ${croc.price}€ </div>
        <button onclick="addcrocs(${croc.id})"> Ajouter au panier </button>
        <a href="details.html" target="blank" class="crocsDetails">détails</a>
        <div class ="color-picker-ctn">
            <div class=" picker round ${croc.colors[0]}" onclick="Switch(0,this, ${croc.id})"></div>
            <div class=" picker round ${croc.colors[1]}" onclick="Switch(1,this, ${croc.id})"></div>
        </div>
        `;
        }else if (croc.colors.length == 1) {
            crocctn.innerHTML = `
        <img class="croc-img" src="${croc.img_1[0]}" />
        <div class="nom-croc"> ${croc.name} </div>
        <div> ${croc.price}€ </div>
        <button onclick="addcrocs(${croc.id})"> Ajouter au panier </button>
        <a href="details.html" target="blank" class="crocsDetails">détails</a>
        <div class ="color-picker-ctn">
            <div class=" picker round ${croc.colors[0]}" onclick="Switch(0,this, ${croc.id})"></div>
        </div>
        `;
        }
        /*crocctn.onmouseover = function() {
            document.getElementsByClassName("croc-img")[croc.id-1].src = croc[img_nbr][1];
        }
        crocctn.onmouseleave = function() {
            document.getElementsByClassName("croc-img")[croc.id-1].src = croc[img_nbr][0];
        }*/
        
        container.appendChild(crocctn);
    });
}
var tmp = img_nbr;
function Switch(i, element, id) {
    
    id -=1;
    img_nbr = "img_" + (i + 1);
    if (crocs[id].colors.length >= i+1) {
        element.src = crocs[id][img_nbr][0];
        console.log(element.src)
    }
} 

//Filtrage

pickers.forEach(picker => {
    picker.addEventListener("click", SelectItem);
});

function SelectItem(e) {
    let picker = e.target;
    let color = e.target.classList[2];
    pickers.forEach((e) => {
        e.classList.remove("selected");

    });
    picker.classList.add("selected");

    console.log(color);
    FilterByColor(color);
}

//Filtrage par couleur

function FilterByColor(color) {
    if (color === "all") {
        filteredCrocs = crocs;
        getCrocs();
    } else {
        filteredCrocs = crocs.filter((croc) => croc.colors[0] === color || croc.colors[1] === color || croc.colors[2] === color);
        if (filteredCrocs.length <= 0) {
            container.innerHTML = "Aucun résultat";
        } else {
            getCrocs();
        }
    }
    
    getCrocs();
    
}

//Tri par prix

const priceBtnAsc = document.querySelector(".price-btn-asc");

priceBtnAsc.addEventListener("click", sortByPriceAsc);

function compareByPriceAscending (a, b) {
    return a.price - b.price;
}

function sortByPriceAsc() {
    filteredCrocs.sort(compareByPriceAscending);
    getCrocs();
}

//toggle cart

const cartIcon = document.querySelector(".cart-icon");
const cartCtn = document.querySelector(".cart-ctn");

cartIcon.addEventListener("click", toggleCart);

function toggleCart() {
    cartCtn.classList.toggle("open-cart");
    if(cartCtn.classList.contains("open-cart")) {
        cartIcon.src = "crocs/logo/close.png";
    } else {
        cartIcon.src = "crocs/logo/cart.png";
    }
}

//localStorage

let cartList = JSON.parse(localStorage.getItem("cart")) || [];

function addcrocs(id) {
    let croc = crocs.find(croc => croc.id === id);
    cartList.push(croc);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();
}

function loadcart() {
    cartCtn.innerHTML = "";
    cartList.forEach(croc => {
        let crocCart = document.createElement("div");
        crocCart.classList.add("cart-item");
        crocCart.innerHTML = `
        <img class="cart-croc-img" src="${croc.img_1[0]}" />
        <div> ${croc.name} </div>
        <div> ${croc.price}€ </div>
        <button onclick="removefromcard(${croc.id})"> Supprimer </button>
        `;
        cartCtn.appendChild(crocCart);
    });
}

function removefromcard(id) {
    let indexToRemove = cartList.findIndex(croc => croc.id === id);
    cartList.splice(indexToRemove, 1);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();
}

//lancement de la fonction

LoadCrocs();