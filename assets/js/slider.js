export function draggableSlid(draggableSlid) {
  let firstItemWidth = draggableSlid.querySelector(".item-slider").offsetWidth;
  let controls = draggableSlid.parentElement.querySelectorAll(".controls") ;
  let slidChildren = [...draggableSlid.children]
  let isDragging = false , startX,startScrollLeft,interval;
  let itemParView = Math.round(draggableSlid.offsetWidth / firstItemWidth);
  if (!draggableSlid.classList.contains("singleImgs")) {
    slidChildren.slice(-itemParView).reverse().forEach(item => {
      draggableSlid.insertAdjacentHTML("afterbegin", item.outerHTML);
    })
    slidChildren.slice( 0 ,itemParView).forEach(item => {
      draggableSlid.insertAdjacentHTML("beforeend", item.outerHTML);
    })
  }
controls.forEach(control => {
  control.addEventListener("click", _=> {
    draggableSlid.scrollLeft += control.id === "left" ? -firstItemWidth : firstItemWidth ;
  })
})
const dragStart = (e) => {
  isDragging = true;
  draggableSlid.classList.add("dragging")
  startX = e.pageX;
  startScrollLeft = draggableSlid.scrollLeft;
}
const dragging = (e) => {
  if (!isDragging) return ;
  draggableSlid.scrollLeft = startScrollLeft - (e.pageX - startX)
}
const stopDrag = () => {
  isDragging = false;
  draggableSlid.classList.remove("dragging");
}
const autoPlay = () => {interval = setInterval(() => draggableSlid.scrollLeft += firstItemWidth,3000)}
if(!draggableSlid.classList.contains("slider") && !draggableSlid.classList.contains("singleImgs")) autoPlay()

const stop = () => {
  draggableSlid.addEventListener("mouseenter",_=> clearInterval(interval));
  draggableSlid.addEventListener("mouseleave",_=> draggableSlid.classList.contains("slider")  || draggableSlid.classList.contains("singleImgs")  ? clearInterval(interval) : autoPlay() );
  controls.forEach(control => control.addEventListener("mouseenter",_=> clearInterval(interval)))
};
stop()
const infinite = () => {
  if (draggableSlid.scrollLeft === 0) {
    draggableSlid.classList.add("noBehavior");
    draggableSlid.scrollLeft = draggableSlid.scrollWidth - (2 * draggableSlid.offsetWidth);
    draggableSlid.classList.remove("noBehavior");
  }else if (Math.ceil(draggableSlid.scrollLeft) >= draggableSlid.scrollWidth - draggableSlid.offsetWidth){
    draggableSlid.classList.add("noBehavior");
    draggableSlid.scrollLeft = draggableSlid.offsetWidth;
    draggableSlid.classList.remove("noBehavior");
  }
}
  draggableSlid.addEventListener("mousedown",dragStart)
  draggableSlid.addEventListener("mousemove",dragging)
  draggableSlid.addEventListener("mouseup",stopDrag)
  if (!draggableSlid.classList.contains("singleImgs")) {
    draggableSlid.addEventListener("scroll",infinite)
  }
}

// draggableSlid.addEventListener("touchstart",dragStart)
// draggableSlid.addEventListener("touchmove",dragging)
// draggableSlid.addEventListener("touchend",stopDrag)