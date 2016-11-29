(function() {
  'use strict';

  angular
    .module('app.organizations')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'organizations',
        config: {
          url: '/',
          templateUrl: 'app/organizations/organizations.html',
          controller: 'organizationsController',
          controllerAs: 'vm',
          title: 'organizations',
          settings: {
            nav: 1,
            content: '<i class="fa fa-organizations"></i> Organizations'
          }
        }
      }
    ];
  }
})();
