import {addDataFavCartPage ,addToCartFromFav} from './data.js'
let data = JSON.parse(localStorage.getItem("favData"))
let target = document.querySelector("#favData")
let empty = document.querySelector(".empty");

if(data) {
  if ( data.length > 0) addDataFavCartPage(target, data,"favData");
  else empty.classList.add("active");
}
document.querySelectorAll(".addToCart").forEach(item => addToCartFromFav(item))


