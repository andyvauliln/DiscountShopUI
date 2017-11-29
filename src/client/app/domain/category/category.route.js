(function() {
  'use strict';

  angular
    .module('app.category')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'categories',
        config: {
          url: '/category',
          templateUrl: 'app/domain/category/category.list.html',
          controller: 'categoryController',
          controllerAs: 'vm',
          title: 'category',
          settings: {
            nav: 1,
            content: '<i class="fa fa-categories"></i> Categories'
          }
        }
      }
    ];
  }
})();
