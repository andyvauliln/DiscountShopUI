(function () {
  'use strict';

  angular
    .module('app.organization')
    .controller('organizationController', organizationController);

  organizationController.$inject = ['$scope', '$q', 'logger', 'dataservice', 'appConfig', 'ModalService', 'organizationModel', 'shopModel', 'imageModel'];
  /* @ngInject */
  function organizationController($scope, $q, logger, dataservice, appConfig, ModalService, organizationModel, shopModel, imageModel) {
    var vm = this;
    //Organization
    vm.organizations = [];
    vm.editOrganization = editOrganization;
    vm.currentOrganization = null;
    vm.appConfig = appConfig;
    //Shops

 
    //DiscountCards

    //Coupons


    //Images
    vm.showOrgDiteils = showOrgDiteils;
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
      var promises = [getOrganizations(), getCategories()];
      return $q.all(promises).then(function () {
        logger.info('Activated Organization View');
      });
    }

    $scope.opened = {};
    $scope.open = function ($event, elementOpened) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened[elementOpened] = !$scope.opened[elementOpened];
    };

    vm.editOrgaziation = function (organization) {
      vm.currentOrganization = organization;

      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: "app/domain/organization/organization.edit.html",
        controller:
        function (close) {
          this.currentOrganization = vm.currentOrganization;
          this.close = result => close(result, 500);
          this.categories = vm.categories;
          this.showCategories = vm.showCategories;
          this.attachCategory = vm.attachCategory;
          this.saveOrganization = vm.saveOrganization;
        },
        controllerAs: 'vm'
      }).then(function (modal) {

        modal.element.modal();
        modal.close.then(function (result) {
          $scope.message = result ? "You said Yes" : "You said No";
        });
      });

    };

    vm.attachOrganizationImage = function(files) {
      angular.forEach(files, function (flowFile, i) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
          var image = new imageModel(null);
          image.content = event.target.result.substr(event.target.result.indexOf('base64') + 7);
          dataservice.imageService.addOrUpdate(image).then(function(result){

            dataservice.organizationService.attachImage(vm.currentOrganization.objId, result.objId);
            
          });
        };
        fileReader.readAsDataURL(flowFile.file);

      });
    }

    vm.showCategories = function () {

      var selected = [];
      angular.forEach(vm.categories, function (s) {
        if (vm.currentOrganization.categoryIds.indexOf(s.objId) >= 0) {
          selected.push(s.name);
        }
      });
      return selected.length ? selected.join(', ') : 'Not set';
    }

    vm.saveOrganization = function (organization) {

    return dataservice.organizationService.addOrUpdate(organization).then(function(result){

        vm.currentOrganization = result;
        return result;
     });

    }
    vm.addOrganization = function(){

      vm.organizations.unshift(new organizationModel(null));
    }

    //Organization
    function getOrganizations() {

      dataservice.organizationService.getAll().then(function (data) {

        vm.organizations = data;

      })
    }
    function getCategories() {

       dataservice.categoryService.getAll().then(function (data) {

        vm.categories = data;

      })
    }
    vm.attachCategory = function (categoryIds) {

      if(vm.currentOrganization.objId == 0){

        vm.saveOrganization(vm.currentOrganization).then(function(){

          vm.attachCategory(categoryIds);
          vm.currentOrganization.categoryIds = categoryIds;

        });
      }
      else {

        categoryIds.forEach(function (id) {

          if (vm.currentOrganization.categories.filter(function (e) { e.objId == id }).length == 0) {

            dataservice.organizationService.attachCategory(vm.currentOrganization.objId, id)
          }

        });
        vm.currentOrganization.categories.forEach(function (category) {

          if (categoryIds.indexOf(category.objId) < 0) {

            dataservice.organizationService.deattachCategory(vm.currentOrganization.objId, category.objId)
          }

        });

      }
     

    }

    vm.deleteOrganization = function(organization){

      dataservice.organizationService.remove(organization.objId).then(function(){

         getOrganizations();
      });
      
    }



    //ToDo: redevelope
    function toggleTab(tab) {

      $('.nav-tabs a[name="' + tab + '"]').tab('show');
      $('.tab-content div').removeClass("in active");

      $('.tab-content div[id="' + tab + '"]').addClass('in active');
    }
    function editOrganization(org) {
      vm.currentOrganization = org;
    }

    function showOrgDiteils(org, tab) {
      vm.currentOrganization = org;
      if (tab) {
        toggleTab(tab)
      }
    }
    vm.saveShop = function (shop) {

      if(shop.objId > 0){

        dataservice.shopService.addOrUpdate(shop);

      } else {

          dataservice.shopService.addOrUpdate(shop).then(function(result){
            dataservice.organizationService.attachShop(vm.currentOrganization.objId, result.objId);

          })
      }
     
    }
    vm.addShop = function () {

      vm.currentOrganization.shops.unshift(new shopModel(null));
    }
    vm.deattachShop = function(shop) {

      vm.organizationService.deattachShop(vm.currentOrganization,shop.id)
    }
    vm.addShop = function () {

      
    }
    vm.deattachShop = function(shop) {

      vm.organizationService.deattachShop(vm.currentOrganization,shop.id)
    }
  }
})();
