const carouselGallery = document.querySelector('[data-carousel="forecast__carousel-gallery"]');
const carouselCards = 8;

let index = 0;

export const moveSlides = ev => {
  const { carouselBtn } = ev.target.dataset;

  carouselBtn === "carousel-btn-next" ? index++ : index--;
  index = index === carouselCards  - 2 ? 0 : index < 0 ? carouselCards -3 : index;
  carouselGallery.style.transform = `translateX(-${index * 32}%)`;

  console.log(index);
}
