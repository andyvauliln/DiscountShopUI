(function() {
  'use strict';

  angular
    .module('app.coupon')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'coupon',
        config: {
          url: '/',
          templateUrl: 'app/coupon/coupon.html',
          controller: 'couponController',
          controllerAs: 'vm',
          title: 'coupon',
          settings: {
            nav: 1,
            content: '<i class="fa fa-coupon"></i> Coupons'
          }
        }
      }
    ];
  }
})();
