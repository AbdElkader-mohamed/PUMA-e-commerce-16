import {sendDataAllProducts,sendDataSingleProducts} from './sendDataUrl.js'
import {setNumsCartFav} from './data.js'
const overLay = document.querySelector(".ovarlay") ; 
const overLay2 = document.querySelector(".ovarlay2") ; 
let nav = document.querySelector(".navbar") ;
let btnMenuOpen = document.querySelector(".navbar-toggler.open") ;
let mobileNav = document.querySelector(".mobile-nav") ;
let scrollBtn = document.querySelector(".scrollTo")

navBarHandel();
sendDataAllProducts();
sendDataSingleProducts();
if(JSON.parse(localStorage.getItem("cartData"))) setNumsCartFav("cartData")
if(JSON.parse(localStorage.getItem("favData"))) setNumsCartFav("favData")
cartOffcanvas()
scroll();
loaders();
close()
closeAnyModal()

function navBarHandel() {
  navDesktop();
  navMobile();
}
function navDesktop() {
  let links = document.querySelectorAll(".nav-link.main");
  links.forEach(link => {
    link.addEventListener("mouseenter", _ => {
      links.forEach(link => link.classList.remove('active'))
      document.querySelectorAll(".navbar .menu").forEach(menu =>{
        menu.classList.remove("active")
        menu.addEventListener("mouseleave",_=>{
          setTimeout(_=>{
            menu.classList.remove('active')
            link.classList.remove('active')
          },500)
        })
      })
      link.nextElementSibling.classList.add("active");
      link.classList.add("active");
    });
    nav.addEventListener("mousemove",e=>{
      if (e.target.classList.contains("navbar-collapse") || e.target.classList.contains("navbar-brand") ) {
          link.nextElementSibling.classList.remove("active");
          link.classList.remove("active");
        }
    })
  })
}
function navMobile() {
  btnMenuOpen.addEventListener("click", _=> {
    mobileNav.classList.toggle('active');
    btnMenuOpen.querySelector("i").classList.toggle("bi-list")
    btnMenuOpen.querySelector("i").classList.toggle("bi-x")
    nav.classList.toggle("bg-dark");
    nav.classList.toggle("bg-white");
    document.querySelector(".logo").classList.toggle("mob");
    overLay.classList.toggle('active');
  })
mobNavBtnPrev()
}
function mobNavBtnPrev() {
  document.querySelectorAll(".previous").forEach(prev => prev.addEventListener('click', _=> prev.closest(".tab-content").classList.remove("active")))
  document.querySelectorAll(".nav-mob button").forEach(btn => btn.addEventListener("click", _ =>document.getElementById(btn.dataset.target).classList.add('active')));
}
function scroll() {
  window.addEventListener("scroll",_=>{
    if (scrollY >= 500) scrollBtn.classList.add("active")
    else scrollBtn.classList.remove("active");
  })
  scrollBtn.addEventListener("click",_=> {
    scrollTo({
      top: 0,
      behavior:"smooth"
    })
  })
}
function loaders() {
  window.addEventListener("load", _=> {
    let loadingText = document.querySelectorAll(".loading-text") ;
    let loadingBanner = document.querySelectorAll(".loading-banner") ;
    // let loadingBannerCanvas = document.querySelectorAll(".cartOffcanvas .loading-banner") ;
    let mainLoading = document.querySelector(".main-loding");
    mainLoading.classList.add("hidden")
    mainLoading.addEventListener("transitionend",function(){this.remove()})
    loadingText.forEach(load => {
      load.classList.remove("loading-text")
    })
    loadingBanner.forEach(load => {
      load.classList.add("hidden")
      load.addEventListener("transitionend",_=> load.remove())
    })
  })

}
function cartOffcanvas() {
  let dataCart = JSON.parse(localStorage.getItem("cartData"));
  let offcanvas = document.querySelector(".cartOffcanvas") ;
  let toggleOffcanvas = document.querySelector("#GoToCart") ;
  
  toggleOffcanvas.addEventListener("click", function() {
    document.getElementById(this.dataset.target).classList.toggle("active");
    overLay2.classList.toggle("active");
  })
}
function close() {
  document.querySelectorAll(".closeBtn").forEach(item => {
    item.onclick = _=> {
      document.querySelector(".closeItem.active").classList.remove("active")
      document.querySelector(".ovarlay2").classList.remove("active")
    }
  })
}
function closeAnyModal() {
  overLay.onclick = function() {
    document.querySelectorAll(".closeItem").forEach(item => item.classList.remove("active"));
    this.classList.remove("active")
  }
  overLay2.onclick = function() {
    this.classList.remove("active")
    document.querySelectorAll(".closeItem").forEach(item => item.classList.remove("active"))
  }
}



// var objs = [
//   { id: 3, postcode: "xxx", street: "xxx", city: "xxx" },
//   { id: 1, postcode: "xxx", street: "xxx", city: "xxx" },
//   { id: 1, postcode: "xxx", street: "xxx", city: "xxx" },
//   { id: 2, postcode: "xxx", street: "xxx", city: "xxx" },
//   { id: 2, postcode: "xxx", street: "xxx", city: "xxx" },
//   { id: 2, postcode: "xxx", street: "xxx", city: "xxx" },
//   { id: 5, postcode: "xxx", street: "xxx", city: "xxx" },
//   { id: 2, postcode: "xxx", street: "xxx", city: "xxx" },
//   { id: 2, postcode: "xxx", street: "xxx", city: "xxx" },
//   { id: 3, postcode: "xxx", street: "xxx", city: "xxx" },
//   { id: 3, postcode: "xxx", street: "xxx", city: "xxx" },
//   { id: 3, postcode: "xxx", street: "xxx", city: "xxx" },
//   { id: 3, postcode: "xxx", street: "xxx", city: "xxx" }
// ];

// var result = objs.reduce(function(r, a) {
//  r[a.id] = r[a.id] || [];
//  r[a.id].push(a);
//  return r;
// }, Object.create(null));

// console.log(Object.values(result));