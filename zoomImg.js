export default class Zoom {
  box = `<div class="zoomBox hide"><img class="zoom" src="" alt="" /></div>`;
  zoomIndex = 2;
  zoomActive = false;
  constructor(dimensions, parent) {
    // SETUP
    this.dimensions = dimensions;
    this.parent = parent;
    this.img = this.parent.querySelector("img");
    this.parent.insertAdjacentHTML("beforeend", this.box);
    this.zoomBox = document.querySelector(".zoomBox");
    this.zoomBox.style.width = `${dimensions[0]}px`;
    this.zoomBox.style.height = `${dimensions[1]}px`;
    this.zoom = document.querySelector(".zoom");
    this.parentCords = this.parent.getBoundingClientRect();
    this.zoomCords = this.zoomBox.getBoundingClientRect();
    this.imgCords = this.img.getBoundingClientRect();
    // Events "click,mousemove,wheel(up/down)"
    this.parent.addEventListener("click", this.clickHandle.bind(this));
    document.addEventListener("mousemove", this.zoomHandle.bind(this));
    this.parent.addEventListener("wheel", this.wheelHandle.bind(this));
    this.parent.addEventListener("mouseleave", (e) => {
      this.parent.classList.remove("zoom-out");
      this.zoomBox.classList.add("hide");
    });
    this.parent.addEventListener("mouseenter", (e) => {
      if (this.zoomActive) {
        this.parent.classList.add("zoom-out");
        this.zoomBox.classList.remove("hide");
      }
    });
  }
  zoomHandle = (e) => {
    if (this.zoomActive) {
      this.zoomCords = this.zoomBox.getBoundingClientRect();
      this.zoomBox.style.left = `${
        e.x - this.parentCords.x - this.zoomCords.width / 2
      }px`;
      this.zoomBox.style.top = `${
        e.y - this.parentCords.y - this.zoomCords.height / 2
      }px`;
      this.zoom.src = "./tiger.jpg";
      this.zoom.style.width = `${this.imgCords.width * this.zoomIndex}px`;
      this.zoom.style.height = `${this.imgCords.height * this.zoomIndex}px`;
      this.zoom.style.left = `${-(
        (e.x - this.parentCords.x) * this.zoomIndex -
        this.zoomCords.width / 2
      )}px`;
      this.zoom.style.top = `${-(
        (e.y - this.parentCords.y) * this.zoomIndex -
        this.zoomCords.height / 2
      )}px`;
    }

    //         if (e.y <= this.parentCords.y) {
    //             this.zoomBox.style.left = `${e.x - this.parentCords.x - this.zoomCords.width / 2}px`;
    //             if (this.parentCords.y < this.zoomCords.height / 2) {
    //                 this.zoomBox.style.top = `-${this.parentCords.y}px`;
    //             } else { this.zoomBox.style.top = `-${this.zoomCords.height / 2}px`; }
    //
    //         } else if (e.x < this.parentCords.x) {
    //             this.zoomBox.style.top = `${e.y - this.parentCords.y - this.zoomCords.height / 2}px`;
    //             if (this.parentCords.x < this.zoomCords.width / 2) {
    //                 this.zoomBox.style.left = `-${this.parentCords.x}px`;
    //             } else {
    //                 this.zoomBox.style.left = `-${this.zoomCords.width / 2}px`;
    //             }
    //         } else {
    //             this.zoomBox.style.left = `${e.x - this.parentCords.x - this.zoomCords.width / 2}px`;
    //             this.zoomBox.style.top = `${e.y - this.parentCords.y - this.zoomCords.height / 2}px`;
    //         }
  };
  clickHandle(e) {
    this.parent.classList.toggle("zoom-out");
    this.zoomBox.classList.toggle("hide");
    this.zoomIndex = 2;
    if (this.parent.classList.contains("zoom-out")) {
      this.zoomActive = true;
      this.zoomHandle(e);
    } else {
      this.zoomActive = false;
    }
  }
  wheelHandle(e) {
    if (this.zoomActive) {
      const zoomStyle = window.getComputedStyle(this.zoom);
      if (e.deltaY < 0) {
        this.zoomIndex += 0.5;
      }
      if (
        e.deltaY > 0 &&
        parseInt(zoomStyle.width) + parseInt(zoomStyle.left) >
          this.zoomCords.width * 2 &&
        parseInt(zoomStyle.height) + parseInt(zoomStyle.top) >
          this.zoomCords.height * 2
      ) {
        this.zoomIndex -= 0.5;
      }
      this.zoomHandle(e);
    }
  }
}
