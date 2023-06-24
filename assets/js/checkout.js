window.addEventListener("load", _=> {
  let mainLoading = document.querySelector(".main-loding");
  mainLoading.classList.add("hidden")
  mainLoading.addEventListener("transitionend",function(){this.remove()})
})


getDataFromLocalStoreg()
function getDataFromLocalStoreg() {
  let data = JSON.parse(localStorage.getItem("cartData"))
  let count = 0 ;
  data.forEach(item => count += item.cost * item.custom[2])
  data.forEach(item => {
    let cost ;
      cost = item.cost * +item.custom[2] ;
    document.querySelector("#showFromLocalStoreg table tbody").innerHTML += `
    <tr>
    <td class="img p-0" ><img src="${item.imageOne1}" class="img-fluid" alt=""></td>
    <td>
    <div  class="product-name" ><h3>${item.productName}</h3></div>
    <div class="info color-item"> <p class="mb-1">color : <span>${item.custom[0]}</span></p> </div>
    <div class="info size-item"> <p class="mb-1">size : <span>${item.custom[1]}</span></p> </div>
    <div class="info style-item"> <p class="mb-1">style : <span>${item.custom[3]}</span></p> </div>
    </td>
    <td class="text-center" >
    <div class="info"><p class="m-0" >${item.custom[2]}</p></div>
    </td>
    <td class="text-center" >
      <div class="info"><p class="m-0" >EGP ${cost}.00</p></div>
      </td>
      <td class="text-end pe-4 itemCost" id="${item.id}" >
      <div class="info"><p class="mb-2" >EGP ${cost}.00</p></div>
      </td>
      </tr>
    <br>
    `
    if (item.costLeft) {
      let was = item.costLeft * item.custom[2];
      document.getElementById(item.id).innerHTML += `
      <div class="info"> <p class="mb-0" > was: <del>EGP ${was}.00</del></p></div>
      <div class="info"> <p> you save: EGP ${was - cost}.00</p></div>
      `
    }
  });
  document.querySelector(".supTotal span").textContent = "EGP" + " " + count ;
}