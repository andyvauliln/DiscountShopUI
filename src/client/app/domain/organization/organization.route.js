(function() {
  'use strict';

  angular
    .module('app.organization')
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
          templateUrl: 'app/domain/organization/organization.html',
          controller: 'organizationController',
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
