(function () {
  'use strict';

  angular
    .module('app.organization')
    .controller('organizationController', organizationController);

  organizationController.$inject = ['$scope', '$q', 'logger', 'dataservice', 'appConfig', 'ModalService', 'organizationModel', 'shopModel', 'imageModel', 'shareModel'];
  /* @ngInject */
  function organizationController($scope, $q, logger, dataservice, appConfig, ModalService, organizationModel, shopModel, imageModel, shareModel) {
    var vm = this;
    //Organization
    vm.organizations = [];
    vm.editOrganization = editOrganization;
    vm.currentOrganization = null;
    vm.appConfig = appConfig;
    vm.statuses = [{value:true, text: 'Активный'},{value:false, text: 'Не активный'}];
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
          this.opened = {};
          this.open = function ($event, elementOpened) {
           $event.preventDefault();
           $event.stopPropagation();
          this.opened[elementOpened] = this.opened[elementOpened];
    };
        },
        controllerAs: 'vm'
      }).then(function (modal) {

        modal.element.modal();
        modal.close.then(function (result) {
          $scope.message = result ? "You said Yes" : "You said No";
        });
      });

    };

    vm.showStatuses = function(item){
      var selected = vm.statuses.filter(function(status){return item.isActive == status.value});
      return (item.isActive != null && selected.length) ? selected[0].text : 'Not set';
    }

    vm.attachOrganizationImage = function (files) {
      angular.forEach(files, function (flowFile, i) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
          var image = new imageModel(null);
          image.content = event.target.result.substr(event.target.result.indexOf('base64') + 7);
          dataservice.imageService.addOrUpdate(image).then(function (result) {

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

      return dataservice.organizationService.addOrUpdate(organization).then(function (result) {

        vm.currentOrganization = result;
        return result;
      });

    }
    vm.addOrganization = function () {

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

      if (vm.currentOrganization.objId == 0) {

        vm.saveOrganization(vm.currentOrganization).then(function () {

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

    vm.addShare = function (type) {

      var share = new shareModel(null)
      share.type = type;
      vm.currentOrganization.shares.unshift(share);
    }
    vm.saveShare = function (share) {

      if (share.objId > 0) {

        return dataservice.shareService.addOrUpdate(share);

      } else {

        return dataservice.shareService.addOrUpdate(share).then(function (result) {
          return dataservice.organizationService.attachShare(vm.currentOrganization.objId, result.objId).then(function (res) {
            vm.currentOrganization = res;
            return result;
          });

        })
      }
    }
    vm.getImageUrl = function(item){

      if(item.images.length > 0){

          return vm.appConfig.IMAGE_URL + item.images[0].name;
      }
      return '#'
    }

    vm.attachImageToCoupon = function (files, share) {
      if (share.objId == 0) {

        vm.saveShare(share).then(function (newShare) {

          vm.addImage(files[0]).then(function (newImage) {

            dataservice.shareService.setImage(newShare.objId, newImage.objId)
          })
        })
      } else if(share.images.length > 0) {

         vm.getImageContent(files[0]).then(function (content) {
         var image = share.images[0];  
         image.content = content;
         var share1 = share;
         dataservice.imageService.addOrUpdate(image).then(function(res){
          share1.images[0] = res;      
         })
        })
      }
      else{
        vm.addImage(files[0]).then(function (newImage) {

            dataservice.shareService.setImage(share.objId, newImage.objId).then(function(res){
              share.images.push(newImage)
            })
          })
      }
    }
    vm.deattachShare = function(share){

      var index = vm.currentOrganization.shares.indexOf(share);
      vm.currentOrganization.shares.splice(index, 1);   
      dataservice.organizationService.deattachShare(vm.currentOrganization.objId,share.objId);

    }

    vm.addImage = function(flowFile) {

      var deferred = $q.defer();
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        var image = new imageModel(null);
        image.content = event.target.result.substr(event.target.result.indexOf('base64') + 7);
        dataservice.imageService.addOrUpdate(image).then(function(res){
           deferred.resolve(res)
        });
      };
      fileReader.readAsDataURL(flowFile.file);
      return deferred.promise;
    }
    vm.getImageContent = function(flowFile) {

      var deferred = $q.defer();
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        var image = new imageModel(null);
        image.content = event.target.result.substr(event.target.result.indexOf('base64') + 7);
       
        deferred.resolve(image.content)
     
      };
      fileReader.readAsDataURL(flowFile.file);
      return deferred.promise;
    }

    vm.deleteOrganization = function (organization) {

      var index = vm.organizations.indexOf(organization);
      vm.organizations.splice(index, 1); 
      dataservice.organizationService.remove(organization.objId).then(function () {
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

      if (shop.objId > 0) {

        dataservice.shopService.addOrUpdate(shop);

      } else {

        dataservice.shopService.addOrUpdate(shop).then(function (result) {
          dataservice.organizationService.attachShop(vm.currentOrganization.objId, result.objId).then(function(res){
              shop = result;
          });

        })
      }

    }
    vm.addShop = function () {

      vm.currentOrganization.shops.unshift(new shopModel(null));
    }
    vm.deattachShop = function (shop) {

      var index = vm.currentOrganization.shops.indexOf(shop);
      vm.currentOrganization.shares.splice(index, 1); 
      dataservice.organizationService.deattachShop(vm.currentOrganization.objId, shop.objId)
    }

    vm.deattachImage = function (image) {

      var index = vm.currentOrganization.images.indexOf(image);
      vm.currentOrganization.images.splice(index, 1); 
      dataservice.organizationService.deattachImage(vm.currentOrganization.objId, image.objId)
    }

  }
})();
