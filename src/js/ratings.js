require('jquery.rateit');

export const enableRatings = () => {
  return $(document).ready(() => {
    $('.product__rating').rateit({
      max: 5,
      value: 4.5,
      step: 0.5,
      mode: 'font',
      resetable: false
    });
  });
};
