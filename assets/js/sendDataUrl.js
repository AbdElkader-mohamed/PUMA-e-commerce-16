export function sendDataAllProducts() {
  let targets = document.querySelectorAll(".go-to-target")
  let url = 'all-products.html?' ;
  let obj = {}
  let arr = []
  targets.forEach(target => {
    target.addEventListener("click", function(){
      let data_target = this.dataset.target;
    data_target.split("-").forEach(into => {
      arr.push(into)
      obj.product = arr;
    })
      const searchParams = new URLSearchParams(obj) ;
      window.location.href = url + searchParams.toString();
    })
  })
}
export function sendDataSingleProducts(arrayOffItems) {
    let url = 'single-product.html?' ;
    let obj ={};
    arrayOffItems.forEach(item => {
      item.addEventListener("click", e => {
      if(!e.target.classList.contains("bi")){
        obj.singleProductId = item.dataset.id
        const searchParams = new URLSearchParams(obj) ;
        window.location.href = url + searchParams.toString();
      }
    })
    })
}

