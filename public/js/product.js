const productImages = document.querySelectorAll(".product-images img");
const productImageSlide = document.querySelector(".image-slider");

let activeImageSlider = 0;

productImages.forEach((item, i) => {
    item.addEventListener('click', () => {
        productImages[activeImageSlider].classList.remove('active');
        item.classList.add('active');
        productImageSlide.style.backgroundImage = `url('${item.src}')`;
        activeImageSlider = i;
    })
})

// toggle size buttons 

const sizeBtns = document.querySelectorAll('.size-radio-btn');

let checkBtn = 0;

sizeBtns.forEach((item, i) =>{
    item.addEventListener('click', () => {
        sizeBtns[checkBtn].classList.remove('check');
        item.classList.add('check');
        checkBtn = i;
    })
})