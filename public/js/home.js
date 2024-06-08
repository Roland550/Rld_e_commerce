const productContainers = document.querySelectorAll('.product-container');
const nxtbtn =  document.querySelectorAll('.nxt-btn');
const prtbtn = document.querySelectorAll('.pre-btn');

productContainers.forEach((item, i) => {
    let containerDimenstions = item.getBoundingClientRect();
    let containerWidth = containerDimenstions.width;

    
        nxtbtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        })
        prtbtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        })
})


