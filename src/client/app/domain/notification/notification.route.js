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
        state: 'notifications',
        config: {
          url: '/notifications',
          templateUrl: 'app/domain/notification/notification.html',
          controller: 'notificationController',
          controllerAs: 'vm',
          title: 'notifications',
          settings: {
            nav: 1,
            content: '<i class="fa fa-notification"></i> Notifications'
          }
        }
      }
    ];
  }
})();
