import Swiper from 'swiper';

export const enableSlider = () => {
  return new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
  	speed: 400,
	  autoplay: 3000,
  	centeredSlides: true,
  });
};
