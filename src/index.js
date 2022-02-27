import './css/styles.css';
import API from './fetchCountries';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

API.input.addEventListener('input', debounce(API.workOnRequest, DEBOUNCE_DELAY));
