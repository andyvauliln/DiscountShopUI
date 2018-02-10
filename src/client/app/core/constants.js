/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('appConfig', {
      API_HOST: 'http://dshopapidev.azurewebsites.net/api',
      IMAGE_URL: 'http://dshopapidev.azurewebsites.net/Resources/Images/',
      SHOP_STR: 'shop',
      IBEACON_STR: 'iBeacon',
      IMAGE_STR: 'image',
      DCARD_STR: 'dcard',
      COUPON_STR: 'coupon',
      CERTIFICATE_STR : 'certificate',
      SHARE_STR: 'share',
      SPECIALOFFER_STR: 'specialOffer',
      API_NOTIFICATION_ROUTE: '/notification/',
      API_NOTIFICATION_TEMPLATE_ROUTE: '/templates/',
      API_NOTIFICATION_ORGANIZATION_ROUTE: '/notification/organization',
      API_NOTIFICATION_SHARE_ROUTE: '/notification/share',
      API_ORGANIZATION_ROUTE: '/admin/organization/',
      API_IMAGE_ROUTE: '/images/',
      API_BEACON_ROUTE: '/images/',
      API_IMAGE_ROUTE2: '/image/',
      API_SHOP_ROUTE: '/shop/',
      API_SHARE_ROUTE: '/share/',
      API_IBEACON_ROUTE : '/beacon/',
      API_CATEGORY_ROUTE: '/category/',
      API_SETIMEGE_ROUTE: '/set-image/',
      API_ATTACH_SHARE_TO_ORGANIZATION_ROUTE: '/attach-share/',
      API_ATTACH_SHOP_TO_ORGANIZATION_ROUTE: '/attach-shop/',
      API_ATTACH_IBEACON_TO_ORGANIZATION_ROUTE: '/attach-ibeacon/',
      API_ATTACH_CATEGORY_TO_ORGANIZATION_ROUTE: '/attach-category/',
      API_ATTACH_IMAGE_TO_ORGANIZATION_ROUTE: '/set-image/',
      API_DEATTACH_IMAGE_FROM_ORGANIZATION_ROUTE: '/remove-image/',
      API_DEATTACH_SHOP_FROM_ORGANIZATION_ROUTE: '/deattach-shop/',
      API_DEATTACH_CATEGORY_FROM_ORGANIZATION_ROUTE: '/deattach-category/',
      API_DEATTACH_SHARE_FROM_ORGANIZATION_ROUTE: '/deattach-share/',
      API_ATTACH_SHARE_TO_USER_ROUTE: '/attach-share/',
      API_DEATTACH_SHARE_FROM_USER_ROUTE: '/remove-share/',
      API_USER_ROUTE: '/admin/user/',
      API_CITES_ROUTE: '/cities/',
      AUTH_COOKIE:'AUTH_COOKIE',
      GRANT_TYPE_KEY: 'grant_type=',
      GRANT_TYPE_LOGIN: 'password',
      CLIENT_ID: 123456,
      CLIENT_ID_KEY: '&client_id=',
      CLIENT_SECRET: 1,
      CLIENT_SECRET_KEY: '&client_secret=',
      API_EXPORT_ROUTE: '/organization/export/',
      USERNAME_KEY: '&username=',
      PASSWORD_KEY: '&password=',
      API_AUTH_TOKEN_PATH: '/token',
       methods: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
      }
    });
})();
