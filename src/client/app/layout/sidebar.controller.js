(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$state', 'routerHelper', 'dataservice'];
  /* @ngInject */
  function SidebarController($state, routerHelper, dataservice) {
    var vm = this;
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;

    activate();

    vm.IsLoged = function(){

     return dataservice.userService.isUserLoggedIn();
     
    }

    function activate() { getNavRoutes(); }

    function getNavRoutes() {
      //if (dataservice.userService.isUserLoggedIn()) {
                vm.navRoutes = states.filter(function (r) {
                    return r.settings && r.settings.nav;
                }).sort(function (r1, r2) {
                    return r1.settings.nav - r2.settings.nav;
                });
    //  }
    }

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }
  }
})();
