/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('appConfig', {
      API_HOST: 'http://dshopapi.azurewebsites.net/api',
      IMAGE_URL: 'http://dshopapi.azurewebsites.net/Resources/Images/',
      SHOP_STR: 'shop',
      IMAGE_STR: 'image',
      DCARD_STR: 'dcard',
      COUPON_STR: 'coupon',
      CERTIFICATE_STR : 'certificate',
      SHARE_STR: 'share',
      SPECIALOFFER_STR: 'specialOffer',
      API_NOTIFICATION_ROUTE: '/notification/',
      API_ORGANIZATION_ROUTE: '/organization-simple/',
      API_ORGANIZATION_SIMPLE_ROUTE : '/organization/simple',
      API_IMAGE_ROUTE: '/images/',
      API_IMAGE_ROUTE2: '/image/',
      API_SHOP_ROUTE: '/shop/',
      API_SHARE_ROUTE: '/share/',
      API_CATEGORY_ROUTE: '/category/',
      API_SETIMEGE_ROUTE: '/set-image/',
      API_ATTACH_SHARE_TO_ORGANIZATION_ROUTE: '/attach-share/',
      API_ATTACH_SHOP_TO_ORGANIZATION_ROUTE: '/attach-shop/',
      API_ATTACH_CATEGORY_TO_ORGANIZATION_ROUTE: '/attach-category/',
      API_ATTACH_IMAGE_TO_ORGANIZATION_ROUTE: '/set-image/',
      API_DEATTACH_IMAGE_FROM_ORGANIZATION_ROUTE: '/remove-image/',
      API_DEATTACH_SHOP_FROM_ORGANIZATION_ROUTE: '/deattach-shop/',
      API_DEATTACH_CATEGORY_FROM_ORGANIZATION_ROUTE: '/deattach-category/',
      API_DEATTACH_SHARE_FROM_ORGANIZATION_ROUTE: '/deattach-share/',
      API_ATTACH_SHARE_TO_USER_ROUTE: '/attach-share/',
      API_DEATTACH_SHARE_FROM_USER_ROUTE: '/remove-share/',
      API_USER_ROUTE: '/user-simple/',
      API_CITES_ROUTE: '/cities/',
      API_EXPORT_ROUTE: '/organization/export/',
       methods: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
      }
    });
})();
