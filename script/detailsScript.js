var crocDetails = localStorage.getItem("details") || []
const newCroc = JSON.parse(crocDetails);
var imgId
var desc = 0;
var currColor = "img_1"
let detailsTitle = document.getElementsByClassName("detailsTitle");
let detailsPrice = document.getElementsByClassName("detailsPrice");
let detailsColorName = document.getElementsByClassName("detailsColorName");
let detailsDesc = document.getElementsByClassName("detailsDesc");
let detailsImg = document.getElementsByClassName("carousselImg");
let MiniCarousselImg = document.getElementsByClassName("MiniCarousselImg")

function loadDetails() {
    const detailsColors = document.querySelector(".detailsColors");
    const detailsSize = document.querySelector(".detailsSize");
    let color = 0;
    if (newCroc.imgID == "img_1") {
        color = 0;
    } else if (newCroc.imgID == "img_2") {
        color = 1;
    } else if (newCroc.imgID == "img_3") {
        color = 3;
    }
    imgId = 0;
    detailsTitle[0].innerHTML = newCroc.name
    detailsPrice[0].innerHTML = newCroc.price+"€";
    detailsColorName[0].innerHTML = "color: "+newCroc.colors[color];
    detailsDesc[0].innerHTML = newCroc.description.substr(0, 150) + '\u2026' + "<button class=\"moveDesc\" onclick=\"moveDesc()\">voir plus</button>"
    detailsImg[0].src = newCroc[currColor][imgId];
    for(let i = 0; i != MiniCarousselImg.length; i++) {
        MiniCarousselImg[i].src = newCroc[currColor][i];
    }
    console.log(newCroc.colors.length)
    for (let i = 0; i != newCroc.colors.length; i++) {
        let tmp = "img_" + (i+1)
        let imgColorSelector = document.createElement("img");
        imgColorSelector.classList.add("allColors");
        imgColorSelector.src = newCroc[tmp][0]
        imgColorSelector.addEventListener("click", swapColor)
        imgColorSelector.myParams = i;
        detailsColors.appendChild(imgColorSelector);
    }
    for (let i = 0; i != newCroc.sizes.length; i++) {
        let sizeCurr = document.createElement("div");
        sizeCurr.classList.add("size");
        sizeCurr.addEventListener("click", () => {
            console.log("clicked")
            sizeCurr.classList.toggle("size_selected");
        })
        sizeCurr.innerHTML = newCroc.sizes[i];
        detailsSize.appendChild(sizeCurr);

    }
}



function moveElem(i) {
    let detailsImg = document.getElementsByClassName("carousselImg");
    if (i == 1 && imgId < 2) {
        imgId+= 1
    } else if (i == 1 && imgId == 2) {
        imgId = 0
    } else if (i == -1 && imgId > 0) {
        imgId-= 1
    } else if (i == -1 && imgId == 0) {
        imgId = 2
    }
    detailsImg[0].src = newCroc[currColor][imgId];
}

function swapElem(i) {
    let detailsImg = document.getElementsByClassName("carousselImg");
    imgId = i
    detailsImg[0].src = newCroc[currColor][i];
}

function swapColor(e) {
    let i = e.currentTarget.myParams
    currColor = "img_" + (i+1)
    for(let i = 0; i != MiniCarousselImg.length; i++) {
        MiniCarousselImg[i].src = newCroc[currColor][i];
    }
    detailsColorName[0].innerHTML = "color: "+newCroc.colors[i]
    detailsImg[0].src = newCroc[currColor][imgId];
    
}

function moveDesc() {
    if (desc == 0) {
        detailsDesc[0].innerHTML = newCroc.description + "<button class=\"moveDesc\" onclick=\"moveDesc()\">voir moins</button>"
        desc = 1;
        return
    } else if (desc == 1) {
        detailsDesc[0].innerHTML = newCroc.description.substr(0, 150) + '\u2026' + "<button class=\"moveDesc\" onclick=\"moveDesc()\">voir plus</button>"
        desc = 0;
        return
    }
}

window.addEventListener('load',() => {
    console.log("loaded")
    loadDetails();
  });