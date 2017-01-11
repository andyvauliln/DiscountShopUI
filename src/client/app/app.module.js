(function() {
  'use strict';

 var app = angular.module('app', [
    'app.core',
    'app.widgets',
    'app.user',
    'app.dashboard',
    'app.organization',
    'app.coupon',
    'app.discountcard',
    'app.layout',
    'app.shop'
  ]);
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
})();
