import {addDataFavCartPage , setNumsCartFav} from './data.js'

let data = JSON.parse(localStorage.getItem("favData"))
let target = document.querySelector("#favData")
let empty = document.querySelector(".empty");

if (data.length > 0) addDataFavCartPage(target, data,"favData");
else empty.classList.add("active");
// Remove()

// function Remove() {
//   let removeItem = document.querySelectorAll("#removeItem");
//   removeItem.forEach((item) => {
//     item.addEventListener("click", (e) => {
//       let itemName =
//         e.target.parentElement.parentElement.parentElement.querySelector(
//           ".product-name h3"
//         ).textContent;
//       document.querySelector(".removeditemCart .product-name h3").textContent =
//         itemName;
//       modalRemove(e.target.dataset.id);
//     });
//   });
// }
// function modalRemove(flag) {
//   let data = JSON.parse(localStorage.getItem("favData"));
//   document.querySelector(".removeditemCart").classList.add("active");
//   document.querySelector(".ovarlay2").classList.add("active");
//   document.querySelector("#yasRemove").onclick = (_) => {
//     document.getElementById(`item${flag}`).remove();
//     data = data.filter((item) => item.id != flag);
//     localStorage.setItem("favData", JSON.stringify(data));
//     setNumsCartFav();
//     document.querySelector(".closeItem.active").classList.remove("active");
//     document.querySelector(".ovarlay2").classList.remove("active");
//     window.location.reload();
//   };
// }