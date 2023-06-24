import {getAllProducts} from './data.js'
getAllProducts(gridControls,pagination,deletedBtns,ifComingSoon);
function gridControls(newData) {
  let btns = document.querySelectorAll(".grid-controls .grid");
  let productsParent = document.getElementById("allProducts-container").children;
  let products = [...productsParent];
  btns.forEach(btn => {
    btn.addEventListener("click", _=> {
        if(btn.id === "item4") products.forEach(product => product.className = 'col-sm-6 col-md-4 col-12 col-lg-3 active')
        if(btn.id === "item3") products.forEach(product => product.className = 'col-12 col-lg-4 col-sm-6 col-md-4 active')
        if(btn.id === "item2") products.forEach(product => product.className = 'col-12 col-lg-6 col-sm-6 col-md-6 active')
        pagination(newData)
        deletedBtns(newData)
    })
  })
}
function pagination(newData) {
  let controls = document.querySelector(".pagination-controls");
  let items = document.querySelector("#allProducts-container").children ;
  let listItem = [...items]
  let limitProduct = 8 ;
  maxShow();
  add8()
  addAll()
  prev8()
  show8()
  function maxShow(){
    listItem.forEach((item,i) => {
      if ( i < limitProduct) item.classList.add("active");
      else item.classList.remove("active")
    })
  }
  function add8() {
    controls.querySelector("#add8").onclick = _=> {
      if ( limitProduct <= newData.length ) limitProduct += 8;
      maxShow()
    }
  }
  function addAll() {
    controls.querySelector("#addAll").onclick = function() {
      this.style.display = 'none' ;
      controls.querySelector("#show8").classList.remove("d-none");
      limitProduct = newData.length ;
      maxShow()
    }
  }
  function prev8() {
    controls.querySelector("#prev8").onclick = function() {
        if (limitProduct >= 24 ) {
          limitProduct -= 8 ;
        maxShow() 
        scrollTo({
          top:document.body.clientHeight - 1200,
          behavior:"smooth"
        })
      }
  }
  }
  function show8() {
      controls.querySelector("#show8").onclick = function(){
        this.classList.add("d-none");
        controls.querySelector("#addAll").style.display = 'block';
        limitProduct = 8 ;
        maxShow()
      window.scrollTo({
        top:0,
        behavior:"smooth"
      })
      }
  }
}
function deletedBtns(newData) {
  let controls = document.querySelector(".pagination-controls");
  let addAllBtn;
  let items = document.querySelector("#allProducts-container").children ;
  // if (controls.querySelector("#addAll")) {
    addAllBtn = controls.querySelector("#addAll")
    addAllBtn.querySelector("span").textContent = items.length ;
    if (newData.length <= 8 ) addAllBtn.style.display = 'none'
    else addAllBtn.style.display = 'block'
  // } 
  // if (controls.querySelector("#show8")) {
    controls.querySelector("#show8").classList.add("d-none");
  // } 
  // if(controls.querySelector("#add8")) {
    if (newData.length < 16 )  controls.querySelector("#add8").style.display = 'none' ;
    else controls.querySelector("#add8").style.display = 'block'
  // }
  // if(controls.querySelector("#prev8")) { 
    if (newData.length < 16 ) controls.querySelector("#prev8").style.display = 'none' ;
    else if (newData.length < 8 ) controls.querySelector("#prev8").style.display = 'none' ;
    else controls.querySelector("#prev8").style.display = 'block'
  // }
}
function ifComingSoon(newArr) {
  document.querySelector("#mainDiv").innerHTML =  `
  <div class=" position-absolute top-50 translate-middle-y text-center mt-5 ms-5 "style="z-index:1;">
  <h3 class="comingSoneHead" >Coming Soon</h3>
  <h3 class="comingSoneText" > ${newArr.toUpperCase()}</h3>
  <a href="index.html" class="btn main-btn main-btn--gold" > Back to Home  </a>
  </div>
  <video class="comingSoonVideo" src="./assets/video/23SS_ECOM_SP_Archive-Remastered_CNS_1440x500_15s.mp4" autoplay loop></video>
  `
}
document.querySelector("#openSortTap").onclick = _=> document.querySelector(".filter-controls").classList.toggle("active")
document.querySelector("#filterUp").onclick = _=> document.querySelector(".filter-controls").classList.toggle("active")



