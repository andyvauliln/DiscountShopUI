(function() {
  'use strict';

  angular
    .module('app.discountcard')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'discountcard',
        config: {
          url: '/',
          templateUrl: 'app/discountcard/discountcard.html',
          controller: 'discountcardController',
          controllerAs: 'vm',
          title: 'discountcard',
          settings: {
            nav: 1,
            content: '<i class="fa fa-discountcard"></i> Discount Cards'
          }
        }
      }
    ];
  }
})();
