const url = "http://localhost:3000";
const container = document.querySelector(".ctn-crocs");
const pickers = document.querySelectorAll(".picker");
let crocs;
let filteredCrocs;
let catFilters = [{key: 0, value: false}, {key: 1, value: false}, {key: 2, value: false}, {key: 3, value: false}, {key: 4, value: false}]


//lancement de la fonction
//console.log(window.location.pathname.slice(0, window.location.pathname.length-5).split('/').pop().toString())

//chargement des crocs

function LoadCrocs() {
    fetch(`${url}/crocs`)
    .then(response => {
            return response.json();
        })
        .then(data => {
            crocs = data.crocs;
            filteredCrocs = crocs;
            getCrocs();
            loadcart();
        })
}
    
function FilterCrocs() {
    let catTab = ["promo", "femme", "homme", "enfant", "special"]
    if (catFilters[0].value == false && catFilters[1].value == false && catFilters[2].value == false && catFilters[3].value == false && catFilters[4].value == false) {
        filteredCrocs = crocs
    } else {
        filteredCrocs = []
        for (let i = 0; i != catFilters.length; i++) {
            if (catFilters[i].value == true) {
                for (let j = 0; j != crocs.length; j++) {
                    if (crocs[j].category.includes(catTab[catFilters[i].key])) {
                        filteredCrocs.push(crocs[j])
                    }
                }
            }
        }
    }
    getCrocs();
    loadcart();
}
    
function catFilter(catKey) {
    for (let i = 0; i != catFilters.length; i++) {
        if (catFilters[i].key == catKey) {
            catFilters[i].value = !catFilters[i].value
        }
    }
    FilterCrocs()
}

//récupération des crocs
function getCrocs() {
    console.log(filteredCrocs)
    container.innerHTML = "";
    filteredCrocs.forEach(function(croc, x)  {
        let tmp = "";
        let price = "";
        for(let i = 0;i != croc.colors.length; i++) {
            tmp += "<div class=\" picker round "+croc.colors[i]+"\" onclick=\"Switch("+i+","+ x+")\"></div>\n";
        }
        if (croc.reduction != 0) {
            let reduc = croc.price-(croc.reduction*croc.price)/100;
            price = "<p class=\"oldPrice\">"+croc.price+"€</p><p>&nbsp "+reduc.toFixed(2)+"€</p><p class=reduc>&nbsp-"+croc.reduction+"%</p>";
        } else {
            price = croc.price + "€";
        }
        let crocctn = document.createElement("div");
        crocctn.classList.add("croc-item");
        crocctn.innerHTML += `<img class="croc-img" src="${croc.img_1[0]}" onmouseover="Hover(${x})" onmouseleave="LeaveHover(${x})" />
        <div class="nom-croc"> ${croc.name} </div>
        <div class="crocPrice"> ${price} </div>
        <div onclick="addcrocs(${croc.id})" class="ajout"> Ajouter au panier </div>
        <a href="details.html" class="crocsDetails"target="blank" onclick="Details(${croc.id})">détails</a>
        <div class ="color-picker-ctn">
            ${tmp}
        </div>`;
        
        container.appendChild(crocctn);
    });
}


var details = JSON.parse(localStorage.getItem("details")) || [];
function Details(id) {
    let croc = crocs.find(croc => croc.id === id);
    details = croc;
    localStorage.setItem("details", JSON.stringify(details));
}

function Switch(i, id) {
    img = document.getElementsByClassName("croc-img")
    
    filteredCrocs[id].imgID = "img_" + (i + 1);
    if (filteredCrocs[id].colors.length >= i+1) {
        img[id].src = filteredCrocs[id][filteredCrocs[id].imgID][0];
    }
}

function Hover(i) {
    img = document.getElementsByClassName("croc-img")
    img[i].src = filteredCrocs[i][filteredCrocs[i].imgID][1];
}

function LeaveHover(i) {
    img = document.getElementsByClassName("croc-img")
    img[i].src = filteredCrocs[i][filteredCrocs[i].imgID][0];
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


function SwapCategory(element){
    element.classList.toggle("Filter");
}


function showSortList() {
    sortList = document.getElementById("sortList")
    arrow = document.getElementById("arrow")
    sortList.classList.toggle("invisSortList")
    if (sortList.classList.contains("invisSortList")) {
        arrow.innerHTML = "&#8680;"
    } else {
        arrow.innerHTML = "&#8681;"
    }
}

//Filtrage par couleur

function FilterByColor(color) {
    if (color === "all") {
        filteredCrocs = crocs;
    } else {
        filteredCrocs = crocs.filter((croc) => croc.colors[0] === color || croc.colors[1] === color || croc.colors[2] === color);
        if (filteredCrocs.length <= 0) {
            container.innerHTML = "Aucun résultat";
        }
    }
    
    
    
}

//Tri par prix

const priceBtnAsc = document.querySelector(".price-btn-asc");


if (priceBtnAsc != null) {
    priceBtnAsc.addEventListener("click", sortByPriceAsc);
}

function compareByPriceAscending (a, b) {
    tmp1 = a.price
    tmp2 = b.price
    if (a.reduction != 0) {
        tmp1 = a.price-(a.reduction*a.price)/100;
    }
    if (b.reduction != 0) {
        tmp2 = b.price-(b.reduction*b.price)/100;
    }
    return tmp1 - tmp2;
}

function sortByPriceAsc() {
    filteredCrocs.sort(compareByPriceAscending);
    getCrocs();
}

const priceBtnDes = document.querySelector(".price-btn-des");
if (priceBtnDes != null) {
    priceBtnDes.addEventListener("click", sortByPriceDes);
}

function compareByPriceDescending (a, b) {
    tmp1 = a.price
    tmp2 = b.price
    if (a.reduction != 0) {
        tmp1 = a.price-(a.reduction*a.price)/100;
    }
    if (b.reduction != 0) {
        tmp2 = b.price-(b.reduction*b.price)/100;
    }
    return tmp2 - tmp1;
}

function sortByPriceDes() {
    filteredCrocs.sort(compareByPriceDescending);
    getCrocs();
}

//toggle 

const cartIcon = document.querySelector(".cart-icon");
const cartCtn = document.querySelector(".cart-ctn");

if (cartIcon != null) {
    cartIcon.addEventListener("click", toggleCart);
}

function toggleCart() {
    cartCtn.classList.toggle("open-cart");
    if(cartCtn.classList.contains("open-cart")) {
        cartIcon.style.backgroundImage = "url('../style/img/close.png')";
    } else {
        cartIcon.style.backgroundImage = "url('../style/img/panier.png')";
    }
}

//localStorage

let cartList = JSON.parse(localStorage.getItem("cart")) || [];
function addcrocs(id) {
    let croc = crocs.find(croc => croc.id === id);
    let imgValue = 0;
    if (croc.imgID == "img_1") {
        imgValue = 0;
    } else if (croc.imgID == "img_2") {
        imgValue = 1;
    }else if (croc.imgID == "img_3") {
        imgValue = 2;
    }         
    let price = 0
    if (croc.reduction != 0) {
        let reduc = croc.price-(croc.reduction*croc.price)/100;
        price = reduc.toFixed(2);
    } else {
        price = croc.price;
    }       
    let tmp = "<img class=\"cart-croc-img\" src=\""+croc[croc.imgID][0]+"\" /> <div> "+croc.name+" </div> <div class=\"cartCrocPrice\"> "+price+"€ </div> <img id=\"poubelle\" onclick=\"removefromcart("+croc.id+", "+imgValue+")\" src=\"../style/img/trash.png\" />";
    cartList.push(tmp);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();
}

function loadcart() {
    let tmp = "<button class=\"vider\" onclick=\"clearCart()\">Vider Le Panier</button>"
    cartCtn.innerHTML = tmp;
    cartList.forEach(function(croc, x) {
        let crocCart = document.createElement("div");
        crocCart.classList.add("cart-item");
        crocCart.innerHTML =  cartList[x];
        cartCtn.appendChild(crocCart);
    });

    let totalValue = 0;
    let cartCrocPrice = document.getElementsByClassName("cartCrocPrice")
    if (cartCrocPrice.length > 0) {
        for (let i = 0; i <= cartCrocPrice.length-1; i++) {
            totalValue += parseFloat(cartCrocPrice[i].innerHTML)
        }
        cartCtn.innerHTML += "<button class=\"confirmButton\">Acheter ("+totalValue.toFixed(2)+"€)</button>"
    }
}

function removefromcart(id, value) {
    let toRemove = 0;
    let croc = crocs[id-1]
    let crocHtml = document.getElementsByClassName("cart-croc-img")
    let IDimg = ""
    if (value == 0) {
        IDimg = "img_1";
    } else if (value == 1) {
        IDimg = "img_2";
    } else if (value == 2) {
        IDimg = "img_3";
    }
    let simplifiedImg = ""
    let simplifiedSrc = ""
    for (var i = 0; i != cartList.length; i++) {
        simplifiedImg = croc[IDimg][0].slice(0, croc[IDimg][0].length-5).split('/').pop().toString();
        simplifiedSrc = crocHtml[i].src.slice(0, crocHtml[i].src.length-5).split('/').pop().toString();
        if (simplifiedSrc == simplifiedImg) {
            toRemove = i;
        }
    }
    cartList.splice(toRemove, 1);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();
}

function clearCart() {
    cartList = []
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();
}

window.addEventListener('load',() => {
    LoadCrocs();
});