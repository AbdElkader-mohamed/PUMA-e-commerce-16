import { addDataFavCartPage} from "./data.js";
let cartTarget = document.querySelector("#cartData");
let data = JSON.parse(localStorage.getItem("cartData"));
let empty = document.querySelector(".empty");

// set data in page 
if (data) {
  if (data.length > 0) addDataFavCartPage(cartTarget, data,"cartData");
  else empty.classList.add("active");
}
// function handel all accordions 
accordion();

// function edit in cart items  
edit();

//promo code validation
promoCodeHandel();

gotoCheckout();

function edit() {
  let arrColor = ["white","black","blue","red","green","pink","yellow","purple",];
  let editItem = document.querySelectorAll("#editItem");
  let modal = document.querySelector(".EditItemCart");
  editItem.forEach((item) => {
    item.addEventListener("click", function () {
      modal.querySelector("#color .property-div").innerHTML = "";
      modal.querySelector("#countItem").innerHTML = "";
      modal.querySelector("#sizeCount").innerHTML = "";
      let obj = JSON.parse(localStorage.getItem("cartData")).filter((item) => item.id == this.dataset.id);
      let {id,productName,imageOne1,costLeft,cost,colors,imageOne6,size,custom,} = obj.slice(-1)[0];
      modal.querySelector(".product-img img").src = imageOne1;
      let newCost = `${cost.toString().slice(0, 1)},${cost
        .toString()
        .slice(1)}.00`;
      modal.querySelector(".modal-header h2").textContent = productName;
      modal.querySelector(".singleProductInfo-cost .span").textContent =
        newCost;
      for (let i = 0; i < colors[0]; i++) {
        modal.querySelector("#color .property-div").innerHTML += `
        <div class="p-1 text-center" >
        <input type="radio" name="color" id="${arrColor[i]}">
        <label for="${arrColor[i]}"><img src="${imageOne6}" class="img-fluid" alt=""></label>
        <span>${arrColor[i]}</span>
        </div>
      `;
      }
      modal
        .querySelector(`#color .property-div #${custom[0]}`)
        .setAttribute("checked", true);
      for (let i = 0; i < size.length; i++)
        modal.querySelector(
          "#sizeCount"
        ).innerHTML += `<option value="${size[i]}" >${size[i]}</option>`;
      modal
        .querySelector(`#sizeCount  option[value="${custom[1]}"]`)
        .setAttribute("selected", true);
      let count = document.querySelector(
        `#item${id} .count-item span`
      ).textContent;
      count = count.slice(0, count.indexOf(")")).replace("(", "");
      let newCount = 8 ;
      for (let i = 1; i <= newCount; i++) modal.querySelector("#countItem").innerHTML += `<option value="${i}" >${i}</option>`;
      modal.querySelector(`#countItem  option[value="${count}"]`).setAttribute("selected", true);
      if (costLeft) {
        if (document.querySelector(".singleProductInfo-cost .deleted")) {
          modal.querySelector(".singleProductInfo-cost div").classList.remove("offer");
          modal.querySelector(".product-img span").remove();
          modal.querySelector(".singleProductInfo-cost .deleted").remove();
        }
        let costLeftOffer = `${costLeft.toString().slice(0, 1)},${costLeft.toString().slice(1)}.00`;
        modal.querySelector(".singleProductInfo-cost").innerHTML += `<div class="deleted" ><span>EGP </span> <span> ${costLeftOffer}</span></div>`;
        modal.querySelector(".singleProductInfo-cost div").classList.add("offer");
        let percent = ((cost - costLeft) / costLeft) * 100;
        modal.querySelector(".product-img").insertAdjacentHTML(  "afterbegin",  `<span>${percent.toFixed()}%</span>`);
      } else {
        if (document.querySelector(".singleProductInfo-cost .deleted")) {
          modal.querySelector(".singleProductInfo-cost div").classList.remove("offer");
          modal.querySelector(".product-img span").remove();
          modal.querySelector(".singleProductInfo-cost .deleted").remove();
        }
      }
      document.querySelector(".ovarlay2").classList.add("active");
      modal.classList.add("active");
      updateEditData(id);
    });
  });
}
// function update in localStorage 
function updateEditData(id) {
  let update = document.querySelector("#update");
  data = data.filter((item) => item.id == id);
  let newData = data.slice(-1)[0]
  let { custom } = newData;
  
  update.addEventListener("click", (_) => {
    let color;
    let colorRadio = document.querySelectorAll(`.property-div input`);
    let size = document.querySelector(`.EditItemCart #sizeCount`).value;
    let count = document.querySelector(`.EditItemCart #countItem`).value;
    colorRadio = colorRadio.forEach((item) =>item.checked ? (color = item.id) : "");
    custom[0] = color;
    custom[1] = size;
    custom[2] = count ;
    let myData = JSON.parse(localStorage.getItem("cartData"));
    myData.pop()
    myData.push(newData);
    localStorage.setItem("cartData", JSON.stringify(myData));
    window.location.reload()
  });
}
function accordion() {
  document.querySelectorAll(".accordion-btn").forEach((btn) => {
    btn.addEventListener("click", (_) => {
      btn.nextElementSibling.classList.toggle("active");
      btn.querySelector("i").classList.toggle("bi-plus");
      btn.querySelector("i").classList.toggle("bi-dash");
    });
  });
}
function promoCodeHandel() {
let inputPromo = document.querySelector("#promoCode");
  let warningPromo = document.querySelector(".notPromoCode");
  let btnApple = document.querySelector("#promo");
  let warning = document.querySelector(".warningValidation");
  inputPromo.addEventListener("keydown", () => btnApple.classList.remove("disabled"));
  inputPromo.addEventListener("keyup", function () {
    if (this.value == "") {
      warningPromo.classList.remove("active");
      inputPromo.classList.add("notValid");
      warning.style.display = "inline";
      btnApple.classList.add("disabled");
    } else {
      inputPromo.classList.remove("notValid");
      warning.style.display = "none";
    }
  });
  let promoForm = document.querySelector("#promoForm");
  let subTotal, percent;
  promoForm.addEventListener("submit", (_) => {
    let val = inputPromo.value;
    let sale;
    switch (val) {
      case "boda55":
        sale = 20;
        handelOfferCost(sale);
        document.querySelector(".promoHidden").add("active");
        break;
      case "eraaSoft98":
        sale = 50;
        handelOfferCost(sale);
        document.querySelector(".promoHidden").add("active");
        break;
      case "hamada":
        sale = 30;
        handelOfferCost(sale);
        document.querySelector(".promoHidden").add("active");
        break;
      default:
        sale = 0;
        warningPromo.classList.add("active");
        document.querySelector(".promoHidden").classList.remove("active");
        document.querySelector(".promoSale").textContent = ""
        handelOfferCost(sale);
        break;
      }
    function handelOfferCost(sale) {
      subTotal = document.querySelector(".subTotal").textContent;
      subTotal = subTotal.slice(3, -3).replace(",", "");
      if (sale != 0) {
        warningPromo.classList.remove("active");
        percent = `0.${sale}` * +subTotal;
        percent = Math.floor(percent);
        document.querySelector(".promoHidden").classList.add("active");
        document.querySelector(".promoSale").textContent = `EGP ${percent.toString().slice(0, 1)},${percent.toString().slice(1)}.00`;
        let finaleData = subTotal - percent;
        document.querySelector(".totalCost").textContent = `EGP ${finaleData.toString().slice(0, 1)},${finaleData.toString().slice(1)}.00`;
        let data = [sale] ;
        sessionStorage.setItem("promoCode",JSON.stringify(data))
      }else {
        let finaleData = +subTotal + 100;
        document.querySelector(".promoSale").textContent = ""
        document.querySelector(".totalCost").textContent = `EGP ${finaleData.toString().slice(0, 1)},${finaleData.toString().slice(1)}.00`;
      }
      inputPromo.classList.remove("notValid");
      inputPromo.blur();
      inputPromo.value = "";
      btnApple.classList.add("disabled")
    }
  });
}


function gotoCheckout(){
  document.getElementById("checkoutBtn").addEventListener("click", _=> {
    window.open("checkout.html","_self")
  })
}

