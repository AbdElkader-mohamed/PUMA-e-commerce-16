import { draggableSlid } from "./slider.js";

import {sendDataSingleProducts} from './sendDataUrl.js'
// data to sub product
export async function getData(flag, num) {
  let url = "https://abdelkader-mohamed.github.io/my-data-/PUMA/PUMA.json";
  let target,
    i = 0,
    slider;
  let fourProducts = document.querySelectorAll(".fourProducts");
  let data = await fetch(url);
  data = await data.json();
  let response = data.data;
  fourProducts.forEach((product) => {
    if (product.classList.contains(flag)) {
      target = product;
      if (product.classList.contains("carousel")) slider = product;
    }
  });
  response.forEach((item) => {
    if (item.type.includes(flag)) {
      i++;
      if (!num) renderData(item, target, slider);
      if (i <= num) renderData(item, target, slider);
    }
    if (flag == "single") {
      let arr = document.querySelector(`.${flag}`).dataset.target.split("-");
      if (item.type.includes(arr[0]))
        if (!num) renderData(item, target, slider);
        else if (item.type.includes(arr[0]) && item.type.includes(arr[1]))
          if (!num) renderData(item, target, slider);
          else if (
            item.type.includes(arr[0]) &&
            item.type.includes(arr[1]) &&
            item.type.includes(arr[2])
          )
            if (!num) renderData(item, target, slider);
    } else if (flag == "singleOne") {
      let arr = document.querySelector(`.${flag}`).dataset.target.split("-");
      if (item.type.includes(arr[0]))
        if (!num) renderData(item, target, slider);
        else if (item.type.includes(arr[0]) && item.type.includes(arr[1]))
          if (!num) renderData(item, target, slider);
          else if (
            item.type.includes(arr[0]) &&
            item.type.includes(arr[1]) &&
            item.type.includes(arr[2])
          )
            if (!num) renderData(item, target, slider);
    }
  });

  draggableSlid(document.querySelector(".carousel-1"));
  draggableSlid(document.querySelector(".carousel-2"));
}
//render elements to main 4 pages
function renderData(item, target, slider) {
  let { id, productName, cost, imageOne1 } = item;
  cost = `${cost.toString().slice(0, 1)},${cost.toString().slice(1)}.00`;
  if (imageOne1 == undefined || imageOne1 == null)
    imageOne1 = "./assets/image/loading.jpg";
  target.innerHTML += `
  <div class="product" >
  <button data-id="${id}" class="card-item">
  <div class="product-img">
    <img src="${imageOne1}" class="img-fluid" alt="">
  </div>
  <div class="product-info">
    <div class="product-name"><h3>${productName}</h3></div>
    <div class="product-cost" >
      <div><span>EGP</span><span>${cost}</span></div>
    </div>
  </div>
  <div class="trending" ></div>
</button>
  </div>
  `;
  checker(item, target, slider);
}
function searchBar(target,data,deletedBtns,gridControls,pagination,renderDataProducts,filterProducts) {
  let thisIs;
  target.addEventListener("keyup",function () {
  thisIs = this
    let newData =[];
    data.forEach(item => {
      if(item.productName.includes(this.value.toUpperCase()) || item.productName.includes(this.value) || `${item.productName.slice(0,1).toLowerCase()}${item.productName.slice(1)}`.includes(this.value)) newData.push(item)})
    filterProducts(newData,pagination,deletedBtns,gridControls)
    renderDataProducts(newData)
    pagination(newData)
    gridControls(newData)
    deletedBtns(newData)
  })
}
// data all target products
export async function getAllProducts(gridControls,pagination,deletedBtns,ifComingSoon) {
  let arr = getDataThro();
  let url = "https://abdelkader-mohamed.github.io/my-data-/PUMA/PUMA.json";
  let newData = [];
  let data = await fetch(url);
  data = await data.json();
  data.data.forEach((item) => {
    arr.forEach((into) => {
      into = into[1].split(",");
      if (into.length == 1) if (item.type.includes(into[0])) newData.push(item);
      if (into.length == 2)
        if (item.type.includes(into[0]) && item.type.includes(into[1]))
          newData.push(item);
      if (into.length == 3)
        if (
          item.type.includes(into[0]) &&
          item.type.includes(into[1]) &&
          item.type.includes(into[2])
        )
          newData.push(item);
      if (into.length == 4)
        if (
          item.type.includes(into[0]) &&
          item.type.includes(into[1]) &&
          item.type.includes(into[2]) &&
          item.type.includes(into[3])
        )
          newData.push(item);
      if (into.length == 5)
        if (
          item.type.includes(into[0]) &&
          item.type.includes(into[1]) &&
          item.type.includes(into[2]) &&
          item.type.includes(into[3]) &&
          item.type.includes(into[4])
        )
          newData.push(item);
    });
  });
  let newArr = arr[0][1].split(",").join(" ");
  let productsCount = document.querySelector(".products-count h3 span");
  let allProductsHead = document.querySelector(".allProducts-head h3");
  let allProductsSmText = document.querySelector(".allProducts-smText p");
  productsCount.textContent = newData.length;
  allProductsHead.textContent = newArr;
  allProductsSmText.textContent = newData[Math.floor(Math.random() * newData.length)].story;
  filterProducts(newData,pagination,deletedBtns,gridControls)
  renderDataProducts(newData);
  pagination(newData);
  gridControls(newData);
  deletedBtns(newData);
let target = document.querySelector("#searchBarInput")
  searchBar(target,newData,deletedBtns,gridControls,pagination,renderDataProducts,filterProducts)
}
//render elements to  in all products
function renderDataProducts(data) {
  let target = document.querySelector("#allProducts-container");
  target.innerHTML = ""
  data.forEach(item => {
    let {
      id,
      productName,
    cost,
    colors,
    imageOne1,
    imageOne2,
    imageOne3,
    imageOne4,
    imageOne5,
    imageOne6,
  } = item;
  cost = `${cost.toString().slice(0, 1)},${cost.toString().slice(1)}.00`;
  [imageOne1, imageOne2, imageOne3, imageOne4, imageOne5, imageOne6].forEach(
    (img) => {
      if (img == undefined || img == null) img = "./assets/image/loading.jpg";
    }
    );
    target.innerHTML += `
    <div class="col-sm-6 col-md-4 col-12 col-lg-3" >
          <button data-id="${id}" class="card-item">
          <div class="sliderParent" >
          <div class="product-img slider">
          <img src="${imageOne1}" class="img-fluid item-slider" draggable="false" alt="">
          <img src="${imageOne2}" class="img-fluid item-slider" draggable="false" alt="">
          <img src="${imageOne3}" class="img-fluid item-slider" draggable="false" alt="">
          <img src="${imageOne4}" class="img-fluid item-slider" draggable="false" alt="">
          <img src="${imageOne5}" class="img-fluid item-slider" draggable="false" alt="">
          <img src="${imageOne6}" class="img-fluid item-slider" draggable="false" alt="">
          </div>
          <div class="controls prev" id="left" ><i class="bi bi-chevron-left"></i></div>
          <div class="controls next" id="right" ><i class="bi bi-chevron-right"></i></div>
          </div>
          <div class="color" >
            <div class="color-count"><span>${colors[0]} Color's</span></div>
            <div class="row justify-content-center">
              <div class="col-4 g-2">
                <div class="products-img" ><img src="${imageOne5}" class="img-fluid" alt=""></div>
              </div>
              <div class="col-4 g-2">
                <div class="products-img" ><img src="${imageOne6}" class="img-fluid" alt=""></div>
              </div>
            </div>
          </div>
          <div class="product-info p-0">
            <div class="product-name"><h3>${productName}</h3></div>
            <div class="product-cost" >
              <div><span>EGP</span><span>${cost}</span></div>
            </div>
          </div>
          <div class="trending"></div>
        </button>
        </div>
      `;
    checker(item, target);
  })
  sendDataSingleProducts()
  if(data.length == 0)  ifComingSoon(newArr);
  document.querySelectorAll(".slider").forEach((slid) => draggableSlid(slid));
}
// function filter products 
function filterProducts(newData,pagination,deletedBtns,gridControls) {
  //to set product type
  let type = ["clothing","shoes","football","motorSport","shorts","jerseys","jackets","hoodies","sneakers","hats","bags","sandals"]
  newData.forEach(item => {
    for (let i = 0; i < type.length; i++) if(item.type.includes(type[i]))document.querySelector(`li[data-sort="${type[i]}"]`).classList.remove("d-none")
  })
  //to set gender select
  newData.forEach(item => {
    if(item.cost <= 1300)document.querySelector('li[data-sort="0-1300"]').classList.remove("d-none")
    if(item.cost <= 2950)document.querySelector('li[data-sort="1300-2950"]').classList.remove("d-none")
    if(item.cost <= 5050)document.querySelector('li[data-sort="2950-5050"]').classList.remove("d-none")
    if(item.cost <= 8350)document.querySelector('li[data-sort="5050-8350"]').classList.remove("d-none")
    if(item.cost >= 8350)document.querySelector('li[data-sort="8350-100000"]').classList.remove("d-none")
  })
  //to set price select
  newData.forEach(item => {
    if(item.type.includes("men"))document.querySelector('li[data-sort="men"]').classList.remove("d-none")
    if(item.type.includes("women"))document.querySelector('li[data-sort="women"]').classList.remove("d-none")
    if(item.type.includes("kids"))document.querySelector('li[data-sort="kids"]').classList.remove("d-none")
  })
  //to set  colors select
  let colorArr = [];
  let color ;
  newData.forEach(item => !colorArr.includes(item.colors[1]) ? colorArr.push(item.colors[1]) : '');
  for (let i = 0; i < colorArr.length; i++) {
    if (colorArr[i] == "white") color = "black"
    else if(colorArr[i] == "multi") {
      colorArr[i] = 'linear-gradient(135deg, rgba(131,58,180,1) 11%, rgba(253,29,29,1) 53%, rgba(252,176,69,1) 88%)'
      color = "white" 
    } 
    else color = "white" 
    document.querySelector("#listColor").innerHTML += `<li class="dropdown-item" style="background:${colorArr[i]} !important; color:${color}" data-sort="${colorArr[i] == "linear-gradient(135deg, rgba(131,58,180,1) 11%, rgba(253,29,29,1) 53%, rgba(252,176,69,1) 88%)" ? "multi" : colorArr[i] }">${colorArr[i] == "linear-gradient(135deg, rgba(131,58,180,1) 11%, rgba(253,29,29,1) 53%, rgba(252,176,69,1) 88%)" ? "multi" : colorArr[i] }</li>`
  }
  //to set  colors select
  let sizeArr = [];
  newData.forEach(item => item.size.forEach(sz => !sizeArr.includes(sz) ? sizeArr.push(sz) : "" ))
  sizeArr.sort().reverse()
  for (let i = 0; i < sizeArr.length; i++) document.querySelector("#listSize").innerHTML += `<li class="dropdown-item" data-sort='${sizeArr[i]}'>${sizeArr[i]}</li>`;
  /*-----*/
  let btns = document.querySelectorAll(".dropdown-item");
  btns.forEach((btn) => {
  btn.onclick = function () {
    if (this.dataset.sort == "low") { // sort from low to high
      newData = newData.sort((a,b) => a.cost - b.cost)
        renderDataProducts(newData);
        pagination(newData);
      }else if (this.dataset.sort == "trending") { // trending first
        newData = [...newData.filter((item) => item.type.includes("trending")),...newData.filter((item) => !item.type.includes("trending"))];
        renderDataProducts(newData);
        pagination(newData);
        deletedBtns(newData)
      }else if (this.dataset.sort == "high") { // sort from high to low 
        newData = newData.sort((a,b) => b.cost - a.cost)
        renderDataProducts(newData);
        pagination(newData);
      }else if (this.dataset.sort == "new") { // new first
        newData = [...newData.filter((item) => item.type.includes("new")),...newData.filter((item) => !item.type.includes("new"))];
        renderDataProducts(newData);
        pagination(newData);
      }else if (this.dataset.sort == "women") { // women only
        let updatedData = newData.filter((item) => item.type.includes("women"))
        renderDataProducts(updatedData);
        pagination(updatedData);
        deletedBtns(updatedData);
        gridControls(updatedData);
      }else if (this.dataset.sort == "men") { // men only
        let updatedData = newData.filter((item) => item.type.includes("men"))
        renderDataProducts(updatedData);
        pagination(updatedData);
        deletedBtns(updatedData);
        gridControls(updatedData);
      }else if (this.dataset.sort == "kids") { // kids only
        let updatedData = newData.filter((item) => item.type.includes("kids"))
        renderDataProducts(updatedData);
        pagination(updatedData);
        deletedBtns(updatedData);
        gridControls(updatedData);
      }else if (colorArr.includes(this.dataset.sort)) { // show by colors
        let updatedData = newData.filter((item) => item.colors[1] == this.dataset.sort)
        renderDataProducts(updatedData);
        pagination(updatedData);
        deletedBtns(updatedData);
        gridControls(updatedData);
      }else if (this.dataset.sort.includes("-")) { // show by price
        let updatedData = newData.filter((item) => item.cost >= this.dataset.sort.split("-")[0] && item.cost <= this.dataset.sort.split("-")[1] )
        renderDataProducts(updatedData);
        pagination(updatedData);
        deletedBtns(updatedData);
        gridControls(updatedData);
      }else if (sizeArr.includes(+this.dataset.sort)) { // show by size
        let updatedData = newData.filter((item) => item.size.includes(this.dataset.sort) || item.size.includes(+this.dataset.sort) )
        renderDataProducts(updatedData);
        pagination(updatedData);
        deletedBtns(updatedData);
        gridControls(updatedData);
      }else if (type.includes(this.dataset.sort)) { // show by size
        let updatedData = newData.filter((item) => item.type.includes(this.dataset.sort))
        renderDataProducts(updatedData);
        pagination(updatedData);
        deletedBtns(updatedData);
        gridControls(updatedData);
      }
      document.querySelectorAll(".slider").forEach((slid) => draggableSlid(slid));
    };
  });
  /*-----*/
}
// add data to single product page
export async function getDataSingleProduct() {
  let arr = getDataThro();
  let url = "https://abdelkader-mohamed.github.io/my-data-/PUMA/PUMA.json";
  let data = await fetch(url);
  data = await data.json();
  data.data.forEach((item) => {
    if (item.id == arr[0][1]) renderDataSingleProduct(item, data.data);
  });
}
// render elements to single product page
function renderDataSingleProduct(item) {
  let arrColor = [
    "white",
    "black",
    "blue",
    "red",
    "green",
    "pink",
    "yellow",
    "purple",
  ];
  let target = document.querySelectorAll(".fourProducts");
  let singleCost = document.querySelector(".singleProductInfo-cost");
  let {
    id,
    productName,
    smTitle,
    type,
    cost,
    costLeft,
    colors,
    size,
    imageOne1,
    imageOne2,
    imageOne3,
    imageOne4,
    imageOne5,
    imageOne6,
    story,
  } = item;
  cost = `${cost.toString().slice(0, 1)},${cost.toString().slice(1)}.00`;
  if (costLeft) {
    let costLeftOffer = `${costLeft.toString().slice(0, 1)},${costLeft
      .toString()
      .slice(1)}.00`;
    singleCost.innerHTML += `<div class="deleted" ><span>EGP </span> <span> ${costLeftOffer}</span></div>`;
    let percent = ((item.cost - costLeft) / costLeft) * 100;
    singleCost.querySelector("div").classList.add("offer");
    document.querySelectorAll(".singleImgs span").forEach((target) => {
      target.textContent = `${percent.toFixed()}%`;
    });
  } else {
    document.querySelectorAll(".singleImgs span").forEach((target) => {
      target.style.display = "none";
    });
  }
  target.forEach(
    (target) => (target.dataset.target = `${type.slice(-1)[0].join("-")}`)
  );
  type.forEach((attr, i) => {
    if (i < 4) {
      let btn = document.querySelectorAll(".breadcrumb li button");
      btn[i].dataset.target = attr;
      btn[i].textContent = attr;
    }
  });
  document.querySelector(".singleProductInfo-name h1").textContent =
    productName;
  if (type.includes("trending"))
    document.querySelector(
      `#trending`
    ).innerHTML = `<span><h3>Trending</h3></span>`;
  document.querySelector(".singleProductInfo-cost .cost .span").textContent =
    cost;
  document.querySelector(".singleProductInfo-smText span").textContent =
    smTitle;
  for (let i = 0; i < colors[0]; i++) {
    document.querySelector("#color .property-div").innerHTML += `
    <div class="p-1 text-center" >
    <input type="radio" name="color" id="${arrColor[i]}">
    <label for="${arrColor[i]}"><img src="${imageOne6}" class="img-fluid" alt=""></label>
    <span>${arrColor[i]}</span>
    </div>
  `;
  }
  if (size.length > 0) {
    for (let i = 0; i < size.length; i++) {
      document.querySelector("#size .property-div").innerHTML += `
  <div class="p-1" >
  <input type="radio" name="size" id="${size[i]}">
  <label for="${size[i]}">${size[i]}</label>
  </div>
  `;
    }
  }
  addToCartFavBtn(item);
  document.querySelector("#addToCart").dataset.id = id;
  document.querySelector("#addFavorites").dataset.id = id;
  document.querySelector("#story").textContent = story;
  document.querySelector(".details-story").textContent = story;
  document.querySelector(".style-id span").textContent = `${Math.floor(
    Math.random() * 50000
  )}_${id}`;
  document.querySelector(".color-type span").textContent = colors[1];
  document.querySelector(".pocket span").textContent = `${Math.floor(
    Math.random() * 100
  )}`;
  document.querySelector(".shell span").textContent = `${Math.floor(
    Math.random() * 100
  )}`;
  let imgs = document.querySelectorAll(".singleImgs img");
  [imageOne1, imageOne2, imageOne3, imageOne4, imageOne5, imageOne6].forEach(
    (img, i) => {
      imgs[i].src = img;
    }
  );
}
//  لسه مخلصتش
function addToCartFavBtn(item) {
  let cartData = JSON.parse(localStorage.getItem("cartData")) ?? [];
  let favData = JSON.parse(localStorage.getItem("favData")) ?? [];
  let radioColor = document.querySelectorAll(`input[name="color"]`);
  let radioSize = document.querySelectorAll(`input[name="size"]`);
  let favCount = document.querySelector("#favCount span");
  let addToCart = document.getElementById("addToCart");
  let addFavorites = document.getElementById("addFavorites");
  let color,
    size,
    count,
    style,
    flag = false,
    mark = false;
  addToCart.addEventListener("click", function () {
    radioColor.forEach((color) => {
      if (color.checked) flag = true;
    });
    radioSize.forEach((size) => {
      if (size.checked) mark = true;
    });
    handelData();
    if (flag && mark) {
      cartData.push(item);
      localStorage.setItem("cartData", JSON.stringify(cartData));
      addDataToModal(style, color, size, count);
      setNumsCartFav(count);
    }
  });
  addFavorites.addEventListener("click", function () {
    handelData();
    radioColor.forEach((color) => {
      if (color.checked) flag = true;
    });
    radioSize.forEach((size) => {
      if (size.checked) mark = true;
    });
    if (favData.some((item) => item.id == addFavorites.dataset.id))
      flag = false;
    if (flag && mark) {
      favData.push(item);
      localStorage.setItem("favData", JSON.stringify(favData));
      if (favCount) favCount.textContent = favData.length;
      addFavorites.querySelector("i").className = "bi bi-heart-fill";
      addFavorites.classList.add("remove");
      addDataAlert();
    }
  });

  function handelData() {
    handelValeDate("color");
    handelValeDate("size");
    count = document.querySelector(`select[name="count"]`).value;
    style = document.querySelector(".style-id span").textContent;
    let custom = [color, size, count, style];
    item.custom = custom;
  }
  function handelValeDate(target) {
    let radio = document.querySelectorAll(`input[name="${target}"]`);
    let valeDate = document.getElementById(`${target}`);
    let flag = false;
    radio.forEach((ok) => {
      if (ok.checked) {
        flag = true;
        valeDate.style = "border-color:transparent";
        target == "color" ? (color = ok.id) : (size = ok.id);
      }
    });
    if (!flag) {
      valeDate.style = "border-color:#ba2026;";
      valeDate.querySelector("h3 span").style = "display:inline !important;";
    }
  }
  function addDataToModal(style, color, size, count) {
    document.querySelector(".myModal").classList.add("active");
    document.querySelector(".ovarlay2").classList.add("active");
    let cost = `${item.cost.toString().slice(0, 1)},${item.cost
      .toString()
      .slice(1)}.00`;
    document.querySelector(".item img").src = item.imageOne1;
    document.querySelector(".product-name h3").textContent = item.productName;
    document.querySelector(".color-modal span").textContent = color;
    document.querySelector(".size-modal span").textContent = size;
    document.querySelector(".style-modal span").textContent = style;
    document.querySelector(".product-cost .cost").textContent = cost;
    document.querySelector(".modal-header span").textContent = count;
    document.querySelector("#cartLength span").innerHTML = `(${
      +document.querySelector("#cartCount span").textContent + +count
    })`;
    let singleCost = document.querySelector(".myModal .product-cost");
    if (item.costLeft) {
      let costLeftOffer = `${item.costLeft
        .toString()
        .slice(0, 1)},${item.costLeft.toString().slice(1)}.00`;
      singleCost.querySelector("div").classList.add("offer");
      singleCost.querySelector(".deleted .target").innerHTML = costLeftOffer;
    } else {
      singleCost.querySelector(".deleted").remove();
    }
  }
  function addDataAlert() {
    let cost = `${item.cost.toString().slice(0, 1)},${item.cost
      .toString()
      .slice(1)}.00`;
    document.querySelector(".alert-body img").src = item.imageOne1;
    document.querySelector(".alert-body .product-name h3").textContent =
      item.productName;
    document.querySelector(".alert-body .product-cost .cost").textContent =
      cost;
    if (item.costLeft) {
      let singleCost = document.querySelector(".alert-body .product-cost");
      let costLeftOffer = `${item.costLeft
        .toString()
        .slice(0, 1)},${item.costLeft.toString().slice(1)}.00`;
      singleCost.querySelector("div").classList.add("offer");
      singleCost.innerHTML += `<div class="deleted " ><span>EGP </span> <span> ${costLeftOffer}</span></div>`;
    }
    document.querySelector(".addAlert").classList.add("active");
    document.querySelector(".ovarlay2").classList.add("active");
  }
}
// function to get and set data  to fav & cart page 
let arr = [];
export function addDataFavCartPage(target, localStorageData) {
  let filtered = localStorageData.filter((item, i, arr) => arr.map((itm) => itm.id).lastIndexOf(item.id) === i);
  renderDataToTarget(target, filtered);
  if (target.id == "cartData") renderDataPromo();
}
// function render Data To fav & cart 
function renderDataToTarget(target, newData) {
  let countArr = [];
  let nums = getCount();
  Object.values(nums).forEach((arr) => {
    let count = 0;
    arr.forEach((item) => (count += +item.custom[2]));
    countArr.push(count);
  });
  newData = newData.sort((a, b) => a.id - b.id);
  newData.forEach((item, i) => {
    let { id, productName, imageOne1, type, cost, costLeft, custom } = item;
    let repeated = countArr[i];
    cost *= repeated;
    arr.push(cost);
    let costs = `${cost.toString().slice(0, 1)},${cost.toString().slice(1)}.00`;
    target.innerHTML += `
    <div id="item${id}" >
    <div class="row align-items-center">
      <div class="col-5">
        <button data-id="${id}" class="product-img mb-0 card-item">
          <img src="${imageOne1}" class="img-fluid" alt="">
        </button>
      </div>
      <div class="col-7">
        <div >
          <button data-id="${id}" class="product-name text-start card-item" ><h3>${productName}</h3></button>
          <div class="info color-item"> <p class="mb-1">color : <span>${custom[0]}</span></p> </div>
          <div class="info size-item"> <p class="mb-1">size : <span>(${custom[1]})</span></p> </div>
          <div class="info style-item"> <p class="mb-1">style : <span>${custom[3]}</span></p> </div>
          <div class="info count-item"> <p class="mb-1">Count : <span>(${repeated}) item(s)</span> </p> </div>
          <div class="d-flex justify-content-between align-items-center" >
            <div class="product-cost">
              <div><span >EGP</span> <span class="cost" >${costs}</span></div>
            </div>
            <div>
              <div class="trending m-auto"></div>
              <button class="btn main-btn main-btn--outline border-light" id="editItem" data-id="${id}">Edit <i class="bi bi-pencil-square ps-2 "></i> </button>
              <button class="btn main-btn main-btn--outline border-light ms-2" id="removeItem" data-id="${id}">Remove <i class="bi bi-trash  ps-2 "></i> </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    if(target.id == "favData") {
      let editItem = document.querySelectorAll("#editItem");
      editItem.forEach(btn =>{
        btn.classList.remove("main-btn--outline");
        btn.classList.add("main-btn--gold");
        btn.classList.add("addToCart");
        btn.textContent = "add to cart"
      })
    }
    if (type.includes("trending"))
      document.querySelector(
        `.trending`
      ).innerHTML = `<span><h3>Trending</h3></span>`;
    let newCost = document.querySelector(`#item${id}`);
    if (costLeft) {
      costLeft *= repeated;
      let costLeftOffer = `${costLeft.toString().slice(0, 1)},${costLeft
        .toString()
        .slice(1)}.00`;
      newCost.querySelector(
        ".product-cost"
      ).innerHTML += `<div class="deleted" ><span>EGP </span> <span> ${costLeftOffer}</span></div>`;
      let percent = ((cost - costLeft) / costLeft) * 100;
      newCost
        .querySelector(".product-img")
        .insertAdjacentHTML("afterbegin", `<span>${percent.toFixed()}%</span>`);
      newCost.querySelector(".product-cost div").classList.add("offer");
    }
  });
  // function handel removing from cart & favorites 
  Remove()
}
// function render Data To cart promo section 
function renderDataPromo() {
  document.querySelector(".checkoutAria").innerHTML = `
  <div>
  <div class="promocode accordion accordion-sm">
    <button class="btn main-btn accordion-btn p-4" >apply a promo code <i class="bi bi-plus fs-5"></i> </button>
    <div class="accordion-body p-4 py-0 position-relative" >
      <label class="text-story  mb-1" for="promoCode">Enter promo code </label>
      <form action="javascript:void(0)" class="btn-group" id="promoForm">
        <input type="text" class="form-control rounded-0 " name="promo" id="promoCode">
        <input type="submit" class="btn main-btn main-btn--dark disabled" value="apple" id="promo">
      </form>
      <small class="warningValidation" > <i class="bi bi-exclamation-octagon"></i>  Please fill out this field.</small>
      <small class="notPromoCode" > <i class="bi bi-exclamation-octagon"></i> This is not valid Promo Code </small>
    </div>
  </div>
  <div class="finallyCost">
    <table class="table table-borderless" >
      <tbody>
        <tr>
          <td>SubTotal</td>
          <td class="text-end subTotal " >EGP 3,269.00</td>
        </tr>
        <tr>
          <td>Shipping costs</td>
          <td  class="text-end shipping"></td>
        </tr>
        <tr class="promoHidden" >
          <td>Promo Coda sale</td>
          <td  class="text-end promoSale"></td>
        </tr>
      </tbody>
    </table>
    <hr class="divider my-2">
    <div>
      <div class="total" >
        <h3>Item(s) total</h3>
        <h3 class="totalCost text-end">EGP 3,369.00</h3>
        </div>
      <div class="singleProductInfo-smText mb-2">
        <span class="loading-text" >Taxes & Duties included</span>
      </div>
    </div>
    <button class="btn main-btn main-btn--gold w-100 fs-6" id="checkoutBtn">checkout</button>
  </div>
</div>
  `;
  setFinallyCost();
}
// checking if target hav a slider  or sale % or trending page
function checker(item, target, slider) {
  let { id, type, cost, costLeft } = item;
  if (type.includes("trending"))
    document.querySelector(
      `button[data-id="${id}"] .trending`
    ).innerHTML = `<span><h3>Trending</h3></span>`;
    let newCost = document.querySelector(`button[data-id="${id}"] .product-cost`);
  if (costLeft) {
    let offerPercent;
    if (document.querySelector(".sliderParent")) {
      offerPercent = document.querySelector(`button[data-id="${id}"] .sliderParent`);
    }else {
      offerPercent = document.querySelector(`button[data-id="${id}"] .product-img`);
    }
    let percent = ((cost - item.costLeft) / item.costLeft) * 100;
    let costLeft = `${item.costLeft.toString().slice(0, 1)},${item.costLeft
      .toString()
      .slice(1)}.00`;
    newCost.querySelector("div").classList.add("offer");
      newCost.innerHTML += `<div class="deleted" ><span>EGP </span> <span> ${costLeft}</span></div>`;
    offerPercent.innerHTML += `<span>${percent.toFixed()}%</span>`;
  }
  if (target.classList.contains("carousel")) {
    slider.querySelectorAll(".product").forEach((product) => {
      product.classList.add("item-slider");
      product.querySelector(".card-item").setAttribute("draggable", false);
      product
        .querySelector(".product-img img")
        .setAttribute("draggable", false);
    });
  }
}
export function setFinallyCost() {
  let subTotal = 0;
  let shipping = 100;
  arr.forEach((num) => (subTotal += num));
  let newSubTotal = `EGP ${subTotal.toString().slice(0, 1)},${subTotal
    .toString()
    .slice(1)}.00`;
  let final = subTotal + shipping;
  document.querySelector(".subTotal").textContent = newSubTotal;
  document.querySelector(".shipping").textContent = `EGP ${shipping}.00`;
  document.querySelector(".totalCost").textContent = `EGP ${final
    .toString()
    .slice(0, 1)},${final.toString().slice(1)}.00`;
}
  // function set count of length data in fav local & cart local 
export function setNumsCartFav(flag) {
  if( flag == "favData") {
    let favData = JSON.parse(localStorage.getItem("favData"));

    if (favData && favData.length != 0) document.querySelector("#favCount span").textContent = favData.length;
  }else {

    let countCart = getCount();
    let num = 0;
  Object.values(countCart).forEach((item) =>
    item.forEach((ite) => (num += +ite.custom[2]))
  );
  let cartSpan = document.querySelector("#cartCount span");
  if (Object.values(countCart).length > 0) {
    (cartSpan.style.opacity = "1"), (cartSpan.textContent = num);
  } else cartSpan.style.opacity = "0";
  if (document.querySelector(".cart-section")) document.querySelector(".cart-header h2 span").textContent = `(${num})`;
}
}
  // function get count to set  length fav & cart  
function getCount() {
  let data = JSON.parse(localStorage.getItem("cartData"));
  if (data) {
    var result = data.reduce(function (acc, car) {
      acc[car.id] = acc[car.id] || [];
      acc[car.id].push(car);
      return acc;
    }, Object.create(null));
    return result;
  }
}
  // function handel removing from cart & favorites 
function Remove() {
  let removeItem = document.querySelectorAll("#removeItem");
  removeItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      let itemName =
        e.target.parentElement.parentElement.parentElement.querySelector(
          ".product-name h3"
        ).textContent;
      document.querySelector(".removeditemCart .product-name h3").textContent =
        itemName;
      modalRemove(e.target.dataset.id);
    });
  });
}
  // function handel removing from cart & favorites 
function modalRemove(flag) {
  let data = JSON.parse(localStorage.getItem("cartData"));
  document.querySelector(".removeditemCart").classList.add("active");
  document.querySelector(".ovarlay2").classList.add("active");
  document.querySelector("#yasRemove").onclick = (_) => {
    document.getElementById(`item${flag}`).remove();
    data = data.filter((item) => item.id != flag);
    localStorage.setItem("cartData", JSON.stringify(data));
    setNumsCartFav();
    document.querySelector(".closeItem.active").classList.remove("active");
    document.querySelector(".ovarlay2").classList.remove("active");
    window.location.reload();
  };
}
  // function get data from url and return [] of arg
const getDataThro = function () {
  const searchParams = new URL(window.location.href).searchParams;
  const entries = new URLSearchParams(searchParams).entries();
  const arr = [...entries];
  return arr;
};

