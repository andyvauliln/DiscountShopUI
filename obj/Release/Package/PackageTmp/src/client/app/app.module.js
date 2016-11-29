(function() {
  'use strict';

 var app = angular.module('app', [
    'app.core',
    'app.widgets',
    'app.user',
    'app.dashboard',
    'app.organizations',
    'app.coupon',
    'app.discountcard',
    'app.layout',
    'app.shop'
  ]);
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
})();
