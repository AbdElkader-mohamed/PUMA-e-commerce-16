import {getDataSingleProduct,getData} from './data.js'
import {draggableSlid} from './slider.js'
// set  product  info in page 
getDataSingleProduct();

// handel data to sliders 
getData("singleOne");

// handel data to sliders 
getData("single");

// handel all accordion
accordion();

//checking from page size 
checking();

// close any item with class closeItem 
closeItem();

//refresh page
document.querySelector(".myModal .closeBtn").addEventListener("click", _ => window.location.reload())
document.querySelector(".ovarlay2").addEventListener("click", _ => window.location.reload())

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





