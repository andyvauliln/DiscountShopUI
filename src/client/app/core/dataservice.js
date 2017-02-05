(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['organizationService', 'categoryService', 'organizationService', 'organizationService', 'organizationService','organizationService'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      //Organization Api
      getOrganizations: getOrganizations,
      getOrganizationById : getOrganizationById,
      updateOrganizations : updateOrganizations,
      removeOrganizations : removeOrganizations,
      
    };
 
    return service;
    
    
  }
})();
