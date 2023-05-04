var crocDetails = localStorage.getItem("details") || []
const newCroc = JSON.parse(crocDetails);

function loadDetails() {
    let color = 0;
    if (newCroc.imgID == "img_1") {
        color = 0;
    } else if (newCroc.imgID == "img_2") {
        color = 1;
    } else if (newCroc.imgID == "img_3") {
        color = 3;
    }
    let detailsTitle = document.getElementsByClassName("detailsTitle");
    let detailsPrice = document.getElementsByClassName("detailsPrice");
    let detailsColorName = document.getElementsByClassName("detailsColorName");
    let detailsDesc = document.getElementsByClassName("detailsDesc");
    let detailsImg = document.getElementsByClassName("carousselImg");
    detailsTitle[0].innerHTML = newCroc.name
    detailsPrice[0].innerHTML = newCroc.price+"€";
    detailsColorName[0].innerHTML = newCroc.colors[color];
    detailsDesc[0].innerHTML = newCroc.description
    detailsImg[0].innerHTML = `<img src="${newCroc.img_1[0]}" id="carousselImg_size">`;
}
window.addEventListener('load',() => {
    loadDetails();
  });

