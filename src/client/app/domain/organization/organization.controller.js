(function () {
  'use strict';

  angular
    .module('app.organization')
    .controller('organizationController', organizationController);

  organizationController.$inject = ['$q', 'logger','organizationService', 'appConfig'];
  /* @ngInject */
  function organizationController($q, logger, organizationService, appConfig) {
    var vm = this;
    //Organization
    vm.organizations = [];
    vm.editOrganization = editOrganization;
    vm.currentOrganization = null;
    vm.appConfig = appConfig;
    //Shops
    vm.showShops = showShops;
    vm.deattachShop = deattachShop;
    vm.saveShop = saveShop;
    //DiscountCards
    vm.showDiscountCard = showDiscountCards;
    //Coupons
    vm.showCoupons = showCoupons;

    //Images
    vm.showImages = showImages;
    //Categories 
    vm.categories = [];
    
    vm.toggleTab = toggleTab;
        vm.flowConfig = {
      target: '',
      testChunks: false,
      singleFile: true,
      chunkSize: 9007199254740992,
    };

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

      organizationService.getAll().then(function (data) {

        vm.organizations = data;

      })
    }
    function toggleTab(tab) {
      
      $('.nav-tabs a[name="' + tab + '"]').tab('show');
      $('.tab-content div').removeClass("in active");

      $('.tab-content div[id="' + tab + '"]').addClass('in active');
    }
    function editOrganization(org) {
      vm.currentOrganization = org;
    }
    function showCoupons(org) {
      vm.currentOrganization = org;
    }
    function showDiscountCards(org) {
      vm.currentOrganization = org;
    }
    function showImages(org) {
      vm.currentOrganization = org;
    }
    function showShops(org) {
      vm.currentOrganization = org;
    }
    function saveShop() {
      
    }
    function deattachShop() {

    }
}
})();
