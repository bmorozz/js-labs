const burgerBtn = document.getElementById("burgerBtn");
const menu = document.getElementById("menu");

burgerBtn.addEventListener("click", () => {
  menu.classList.toggle("show");
});

const slides = document.getElementById("slides");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
const totalSlides = dots.length;

function showSlide(index) {
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }

  slides.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentSlide].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  showSlide(currentSlide + 1);
});

prevBtn.addEventListener("click", () => {
  showSlide(currentSlide - 1);
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

setInterval(() => {
  showSlide(currentSlide + 1);
}, 3000);
