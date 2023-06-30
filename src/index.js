// Load svg files
const svgModules = require.context('assets/icons', true, /\.svg$/);
svgModules.keys().forEach(svgModules);

require('sass/main.scss');
import 'js/misc.js';
import * as config from 'js/config';
import {countdown} from 'js/countdown';
import {enableSlider} from 'js/slider';
import {enableRatings} from 'js/ratings';
import {toggleSidebar} from 'js/sidebar';
import {GetRandomColor} from 'js/misc';

if (config.DEBUG) {
  $.each($('div, svg, a, h1, h2, h3, h4, h5, h6'), (index, item) =>
    $(item).attr('style', `background-color: ${GetRandomColor()}`));
}

document
  .getElementsByClassName('mobileHeader__toggleSidebar')[0]
  .addEventListener('click', () => toggleSidebar());

document
  .getElementsByClassName('sidebar__overlay')[0]
  .addEventListener('click', () => toggleSidebar());

countdown();
enableSlider();
enableRatings();
