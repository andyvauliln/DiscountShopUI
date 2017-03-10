(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger','organizationService', 'categoryService', 'userService', 'shopService', 'imageService','shareService'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger, organizationService, categoryService, userService, shopService, imageService,shareService) {
    var service = {
      //Organization Api
      organizationService: organizationService,
      categoryService : categoryService,
      userService : userService,
      shopService : shopService,
      imageService : imageService,
      shareService : shareService
      
    };
 
    return service;
    
    
  }
})();
