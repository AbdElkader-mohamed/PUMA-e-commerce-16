import {getDataSingleProduct,getData} from './data.js'
import {draggableSlid} from './slider.js'

getDataSingleProduct();

getData("singleOne");

getData("single");

accordion();
//checking from page size 
checking();

closeItem();




function checking() {
  setInterval(_=>{
    if (window.innerWidth <= 992) {
      draggableSlid(document.querySelector(".singleImgs"))
    } 
    if (window.innerWidth <= 650) {
      let width = window.innerWidth - 30 ;
      document.querySelector(".myModal").style.maxWidth = `${width}px` ;
    } 
    if (window.innerWidth <= 575) {
      let width = window.innerWidth;
      document.querySelector(".addAlert").style.maxWidth = `${width}px !important` ;
      document.querySelector(".removedAlert").style.minWidth = `${width}px !important` ;
    } 
  });
}
function accordion() {
  document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", _=> {
      btn.nextElementSibling.classList.toggle("active");
      btn.querySelector("i").classList.toggle("bi-plus")
      btn.querySelector("i").classList.toggle("bi-dash")
    })
  });
}
function closeItem() {
  let btns = document.querySelectorAll(".closeBtn");
  let ovarlay2 = document.querySelector(".ovarlay2")
  btns.forEach(btn => {
    btn.onclick = _ => {
      btn.closest(".closeItem").classList.remove("active");
      ovarlay2.classList.remove("active")
    }
  })
  ovarlay2.onclick = _=> {
  let item = document.querySelector(".closeItem.active");
    item.classList.remove("active");
    ovarlay2.classList.remove("active")
  }
}
let addFavorites = document.querySelector("#addFavorites") ;
let flag = document.querySelector(".singleImgs img") ;
let favCount= document.querySelector("#favCount span");
let favData = JSON.parse(localStorage.getItem("favData"));

flag.onload = _=> {
  if (favData.some(item => item.id == addFavorites.dataset.id) && favData.length != 0) {
    addFavorites.querySelector("i").className = 'bi bi-heart-fill';
    addFavorites.classList.add("remove");
  }
}
addFavorites.onclick = _=> {
  if (addFavorites.classList.contains("remove")) remove()
}
function remove() {
  favData = favData.filter(item => item.id != addFavorites.dataset.id)
  localStorage.setItem("favData",JSON.stringify(favData))
  if (favData.length == 0) favCount.style.display = 'none'
  if (favCount) favCount.textContent = favData.length ;
  addFavorites.querySelector("i").className = 'bi bi-heart';
  addFavorites.classList.remove("remove");
  setTimeout(_=>{
    window.location.reload()
  },3000)
  document.querySelector(".removedAlert").classList.add("active")
  document.querySelector(".ovarlay2").classList.add("active")
}





