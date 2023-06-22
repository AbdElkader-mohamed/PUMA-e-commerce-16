import { addDataFavCartPage,setFinallyCost } from "./data.js";
let cartTarget = document.querySelector("#cartData");
let data = JSON.parse(localStorage.getItem("cartData"));
let empty = document.querySelector(".empty");

if (data.length > 0) addDataFavCartPage(cartTarget, data,"cartData");
else empty.classList.add("active");
accordion();
edit();
promoCodeHandel();
dataCheckout();
function edit() {
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
  let editItem = document.querySelectorAll("#editItem");
  let modal = document.querySelector(".EditItemCart");
  editItem.forEach((item) => {
    item.addEventListener("click", function () {
      modal.querySelector("#color .property-div").innerHTML = "";
      modal.querySelector("#countItem").innerHTML = "";
      modal.querySelector("#sizeCount").innerHTML = "";
      document.querySelector(".ovarlay2").classList.add("active");
      modal.classList.add("active");
      let obj = data.filter((item) => item.id == this.dataset.id);
      let {
        id,
        productName,
        imageOne1,
        costLeft,
        cost,
        colors,
        imageOne6,
        size,
        custom,
      } = obj.slice(-1)[0];


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
      let newCount = count < 3 ? 3 : count;
      for (let i = 1; i <= newCount; i++)
        modal.querySelector(
          "#countItem"
        ).innerHTML += `<option value="${i}" >${i}</option>`;
      modal
        .querySelector(`#countItem  option[value="${count}"]`)
        .setAttribute("selected", true);
      if (costLeft) {
        if (document.querySelector(".singleProductInfo-cost .deleted")) {
          modal
            .querySelector(".singleProductInfo-cost div")
            .classList.remove("offer");
          modal.querySelector(".product-img span").remove();
          modal.querySelector(".singleProductInfo-cost .deleted").remove();
        }
        let costLeftOffer = `${costLeft.toString().slice(0, 1)},${costLeft
          .toString()
          .slice(1)}.00`;
        modal.querySelector(
          ".singleProductInfo-cost"
        ).innerHTML += `<div class="deleted" ><span>EGP </span> <span> ${costLeftOffer}</span></div>`;
        modal
          .querySelector(".singleProductInfo-cost div")
          .classList.add("offer");
        let percent = ((cost - costLeft) / costLeft) * 100;
        modal
          .querySelector(".product-img")
          .insertAdjacentHTML(
            "afterbegin",
            `<span>${percent.toFixed()}%</span>`
          );
      } else {
        if (document.querySelector(".singleProductInfo-cost .deleted")) {
          modal
            .querySelector(".singleProductInfo-cost div")
            .classList.remove("offer");
          modal.querySelector(".product-img span").remove();
          modal.querySelector(".singleProductInfo-cost .deleted").remove();
        }
      }
      updateEditData(id);
    });
  });
}
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
    colorRadio = colorRadio.forEach((item) =>
      item.checked ? (color = item.id) : ""
      
      );
    custom[0] = color;
    custom[1] = size;
    custom[2] = count;
    let myData = JSON.parse(localStorage.getItem("cartData"));

    myData.push(newData);
    localStorage.setItem("cartData", JSON.stringify(myData));
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
  let warningPromo = document.querySelector(".notPromoCode");
  let inputPromo = document.querySelector("#promoCode");
  let btnApple = document.querySelector("#promo");
  let warning = document.querySelector(".warningValidation");
  inputPromo.addEventListener("keydown", () =>
    btnApple.classList.remove("disabled")
  );
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
        break;
      case "eraaSoft98":
        sale = 50;
        handelOfferCost(sale);
        break;
      case "hamada":
        sale = 30;
        handelOfferCost(sale);
        break;
      default:
        sale = 0;
        warningPromo.classList.add("active");
        setFinallyCost();
        setDataCheckout();
        document.querySelector(".promoHidden").remove("active");
        document.querySelector(".promoSale").textContent = ""
        break;
    }
    setDataCheckout()
    function handelOfferCost(sale) {
      warningPromo.classList.remove("active");
      subTotal = document.querySelector(".subTotal").textContent;
      subTotal = subTotal.slice(3, -3).replace(",", "");
      percent = `0.${sale}` * +subTotal;
      percent = percent.toFixed(2);
      document.querySelector(".promoHidden").classList.add("active");
      document.querySelector(".promoSale").textContent = `EGP ${percent}`;
    }
    if (sale != 0) {
      let finaleData = subTotal - percent;
      finaleData = `${finaleData.toString().slice(0, 1)},${finaleData.toString().slice(1)}`;
      document.querySelector(".totalCost").textContent = finaleData;
    }
    inputPromo.classList.remove("notValid");
    inputPromo.blur();
    inputPromo.value = "";
  });
}
function dataCheckout() {
  let checkoutBtn = document.querySelector("#checkoutBtn");
  checkoutBtn.onclick = (_) => {
    setDataCheckout()
  } 
  function setDataCheckout() {
    let subTotal = document.querySelector(".subTotal").textContent;
    let promo = document.querySelector(".promoSale").textContent;
    let finale = document.querySelector(".totalCost").textContent;
    let shipping = document.querySelector(".shipping").textContent;
    localStorage.setItem("dataCheckout",JSON.stringify([subTotal, shipping, finale, promo])
    );
  }
}
