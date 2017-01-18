/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('appConfig', {
      API_HOST: 'http://disshopapp.azurewebsites.net/api/',
      API_GET_ORGANIZATION_ROUTE: '/organizations/',
      API_GET_CATEGORY_ROUTE: '/categories/',
      API_GET_IMAGE_ROUTE: '/images/',
      API_GET_SHOP_ROUTE: '/shops/',
      API_GET_COUPON_ROUTE: '/coupons/',
      API_GET_DISCOUNTCARD_ROUTE: '/discountcards/',
      API_GET_COUPONCODE_ROUTE: '/couponcodes/',
       methods: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
      }
    });
})();
