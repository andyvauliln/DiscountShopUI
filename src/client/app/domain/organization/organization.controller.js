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
    vm.editOrganization = editOrganization;
    vm.currentOrganization = null;
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
