(function () {
  'use strict';

  angular
    .module('app.organization')
    .controller('organizationController', organizationController);

  organizationController.$inject = ['$q', 'logger','organizationService'];
  /* @ngInject */
  function organizationController($q, logger, organizationService) {
    var vm = this;
    //Organization
    vm.organizations = [];
    //Categories 
    vm.categories = [];
  
    activate();
    function activate() {
      logger.info('Activated Organization View');
      var promises = [getOrganizations()];
      return $q.all(promises).then(function () {
        logger.info('Activated Organization View');
      });
    }

    //Organization
    function getOrganizations() {

    organizationService.getAll().then(function(data){

      vm.organizations = data;

    })
  }
}
})();
