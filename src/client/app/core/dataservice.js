(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger','organizationService', 'categoryService', 
                        'userService', 'shopService', 'imageService','shareService', 'notificationService', 
                        'iBeaconService'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger, organizationService, categoryService, 
                      userService, shopService, imageService,shareService, notificationService, 
                      iBeaconService) {
    var service = {
      //Organization Api
      organizationService: organizationService,
      categoryService : categoryService,
      userService : userService,
      shopService : shopService,
      imageService : imageService,
      shareService : shareService,
      notificationService : notificationService,
      iBeaconService : iBeaconService,
      
    };
 
    return service;
    
    
  }
})();
