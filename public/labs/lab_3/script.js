let width = 130;
let visible = 3;
let sliderList = onigiri.querySelector("ul");
let slides = onigiri.querySelectorAll("li");
let curr = 0;

onigiri.querySelector(".previous").onclick = function () {
  curr += width * visible;
  curr = Math.min(curr, 0);
  sliderList.style.marginLeft = curr + "px";
};

onigiri.querySelector(".next").onclick = function () {
  curr -= width * visible;
  curr = Math.max(curr, -width * (slides.length - visible));
  sliderList.style.marginLeft = curr + "px";
};
