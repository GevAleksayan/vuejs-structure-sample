import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faAngleRight,
    faArrowLeft,
    faPlus,
    faAngleLeft,
    faAngleDown,
    faCaretRight,
    faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'


library.add(
    faAngleRight,
    faArrowLeft,
    faPlus,
    faAngleLeft,
    faAngleDown,
    faCaretRight,
    faMapMarkerAlt,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;