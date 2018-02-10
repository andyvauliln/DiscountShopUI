(function () {
  'use strict';

  angular
    .module('app.organization')
    .controller('organizationController', organizationController);

  organizationController.$inject = ['$scope', '$q',  'logger', 'dataservice', 'appConfig', 'ModalService', 'organizationModel', 'shopModel', 'imageModel', 'shareModel', 'iBeaconModel'];
  /* @ngInject */
  function organizationController($scope, $q, logger, dataservice,  appConfig, ModalService, organizationModel, shopModel, imageModel, shareModel,iBeaconModel) {
    var vm = this;
    //Organization
    vm.organizations = [];
    vm.editOrganization = editOrganization;
    vm.currentOrganization = null;
    vm.appConfig = appConfig;
    vm.IsShowCategoryFilter = false;
    vm.isShowCategoryFilter = false;
    vm.statuses = [{value:true, text: 'Активный'},{value:false, text: 'Не активный'}];
    vm.exportUrl = appConfig.API_HOST + appConfig.API_EXPORT_ROUTE;

    $scope.opened = {};
    $scope.open = function ($event, elementOpened) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened[elementOpened] = !$scope.opened[elementOpened];
    };

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
      var promises = [getOrganizations(), getCategories()];
      return $q.all(promises).then(function () {
        logger.info('Activated Organization View');
      });
    }

    vm.showMessageWindowForOrganization = function (orgniazationId) {

      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: "app/layout/notification.template.html",
        controller:
        function (close) {
          this.message = "";
          this.targetId = orgniazationId;
          this.close = result => close(result, 500);
          this.sendPushNotification = dataservice.notificationService.sendPushNotificationToOrganization;
          this.opened = {};
         
          this.open = function ($event, elementOpened) {
           $event.preventDefault();
           $event.stopPropagation();
          this.opened[elementOpened] = !this.opened[elementOpened];
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
    
    vm.showMessageWindowForShare = function (shareId) {

      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: "app/layout/notification.template.html",
        controller:
        function (close) {
          this.message = "";
          this.targetId = shareId;
          this.close = result => close(result, 500);
          this.sendPushNotification = dataservice.notificationService.sendPushNotificationToShare;
          this.opened = {};
          this.OS = { name : 'All'}
          this.open = function ($event, elementOpened) {
           $event.preventDefault();
           $event.stopPropagation();
          this.opened[elementOpened] = !this.opened[elementOpened];
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
          this.setDescription = function(org){
            this.currentOrganization.objDescription = org;
          };
          this.options = {
            language: 'en',
            allowedContent: true,
            entities: false
          };
          this.open = function ($event, elementOpened) {
            $event.preventDefault();
            $event.stopPropagation();
            this.opened[elementOpened] = !this.opened[elementOpened];
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

    vm.filterValue = {};
    vm.filterByCategory = function(item) {
      var res = false;
    if (vm.filteredCategories.length > 0) {

     
       for (var i = 0; i < vm.filteredCategories.length; i++){

          if(item.categories.filter(function(elem){return elem.name === vm.filteredCategories[i]}).length > 0){

            res = true;
          }
          
        }
      return res;
    }
    else { 
      return item;
    }
  };
    vm.filteredCategories = []
    vm.filterCategory = function(category){

      var indexOfelem = vm.filteredCategories.indexOf(category.name);

      if(indexOfelem >= 0){

        vm.filteredCategories.splice(indexOfelem, 1);

      }
      else{
         vm.filteredCategories.push(category.name);
      }
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

            dataservice.organizationService.attachImage(vm.currentOrganization.objId, result.objId).then(function(res){
              vm.currentOrganization = res;
            });

          });
        };
        fileReader.readAsDataURL(flowFile.file);

      });
    }
     vm.getShares = function(){ 
      return (vm.currentOrganization && vm.currentOrganization.shares) ? vm.currentOrganization.shares : [];
      };

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
        var index = vm.organizations.indexOf(organization);
        vm.organizations[index] = result;
        vm.currentOrganization = result;
        organization = result;
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


      vm.saveOrganization(vm.currentOrganization).then(function () {

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
        vm.currentOrganization.categoryIds = categoryIds;

      });
    }

    vm.addShare = function (type) {

      var share = new shareModel(null)
      share.type = type;
      vm.currentOrganization.shares.unshift(share);
    }
    vm.saveShare = function (share) {

      if (share.objId > 0) {

        return dataservice.shareService.addOrUpdate(share).then(function(result){

          share = result;

        });

      } else {

        return dataservice.shareService.addOrUpdate(share).then(function (result) {
          share = result;
          return dataservice.organizationService.attachShare(vm.currentOrganization.objId, share.objId).then(function (res) {
            vm.currentOrganization = res;
            return share;
          });

        })
      }
    }
    vm.makeImageMain = function(image){

      var oldMainImage = vm.currentOrganization.images.filter(function(image){
        return image.prefix == 'Main'
      });
      if(oldMainImage.length > 0){
         oldMainImage[0].prefix = '';
         dataservice.imageService.addOrUpdate(oldMainImage[0]);
       }
      
        image.prefix = 'Main';
       dataservice.imageService.addOrUpdate(image);
       
    }
    vm.getImageUrlFromImage= function(image){

      if(image){

          return vm.appConfig.IMAGE_URL + image.name;
      }
      return '#'

    }
    vm.getImageUrl = function(item){

      if(item.images.length > 0){

          return vm.appConfig.IMAGE_URL + item.images[0].name;
      }
      return '#'
    }
     vm.getImageUrlByPrefix = function(item, prefix){

     var images = item.images.filter(function(image){

       return image.prefix == prefix;
     });

      if(images.length > 0){

          return vm.appConfig.IMAGE_URL + images[0].name;
      }
      return '#'
    } 
     vm.attachImageToDcard = function (files, share, prefix) {
       if (share.objId == 0) {

         vm.saveShare(share).then(function (newShare) {
           share = newShare
           vm.addImage(files[0], prefix).then(function (newImage) {
              share.images.push(newImage)
              dataservice.shareService.setImage(newShare.objId, newImage.objId).then(function (res) {
              vm.currentOrganization = vm.currentOrganization;
             });
           })
         })
       } else if (share.images.filter(function (image) { return image.prefix == prefix; }).length > 0) {

         var images = share.images.filter(function (image) {
           return image.prefix == prefix;
         });

         vm.getImageContent(files[0]).then(function (content) {
           var image = images[0];
           image.content = content;
           var share1 = share;
           dataservice.imageService.addOrUpdate(image).then(function (res) {

             var index = share1.images.indexOf(image);
             share1.images[index] = res;
           })
         })
       }
       else {
         vm.addImage(files[0], prefix).then(function (newImage) {

           dataservice.shareService.setImage(share.objId, newImage.objId).then(function (res) {
             share.images.push(newImage)
           })
         })
       }
     }

    vm.attachImageToCoupon = function (files, share) {
      if (share.objId == 0) {

        vm.saveShare(share).then(function (newShare) {

          vm.addImage(files[0]).then(function (newImage) {

            dataservice.shareService.setImage(newShare.objId, newImage.objId).then(function(res){
              share = res;
            })
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
      if(share.objId == 0){return;}
      dataservice.organizationService.deattachShare(vm.currentOrganization.objId,share.objId);

    }

    vm.addImage = function(flowFile, prefix) {

      var deferred = $q.defer();
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        var image = new imageModel(null);
        if(prefix){
          image.prefix = prefix;
        }
        image.content = event.target.result.substr(event.target.result.indexOf('base64') + 7);
        dataservice.imageService.addOrUpdate(image).then(function(res){
           deferred.resolve(res)
        });
      };
      fileReader.readAsDataURL(flowFile.file);
      return deferred.promise;
    };
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
    };

    vm.deleteOrganization = function () {
      
      if(vm.currentOrganization.objId == 0){return;}
      var index = vm.organizations.indexOf(vm.currentOrganization);
      vm.organizations.splice(index, 1); 
      dataservice.organizationService.remove(vm.currentOrganization.objId).then(function () {
      });
    };
    
    vm.confirmDelete = function(org){
      vm.currentOrganization = org;
      vm.showConfirmModal = true;
    };
    



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
      if(shop.objId == 0){return;}
      dataservice.organizationService.deattachShop(vm.currentOrganization.objId, shop.objId)
    }


    vm.saveIBeacon = function (iBeacon) {
      iBeacon.organizationId = vm.currentOrganization.objId;
      iBeacon.type = iBeacon.type.text;
      if (iBeacon.objId > 0) {

        dataservice.iBeaconService.addOrUpdate(iBeacon);

      }
      else {

        dataservice.iBeaconService.addOrUpdate(iBeacon).then(function (result) {
          dataservice.organizationService.attachIBeacon(vm.currentOrganization.objId, result.objId).then(function (res) {
            iBeacon = result;
          });

        })
      }
    }
    vm.ibeaconTypes = [ 
      {value: 1, text: "ibeacon"},
      {value: 2, text: "eddysonx"}
    ] 
    vm.showIbeaconTypes = function(ibeacon){
     var selected = vm.ibeaconTypes.filter(function(type){return ibeacon.type == type.text});
     return (ibeacon && selected.length) ? selected[0].text : 'Not set';
   }
    vm.addIBeacon = function () {

      vm.currentOrganization.iBeacons.unshift(new iBeaconModel(null));
    }

    vm.deleteBeacon = function (iBeacon) {

      
      var index = vm.currentOrganization.iBeacons.indexOf(iBeacon);
      vm.currentOrganization.iBeacons.splice(index, 1); 
      if(iBeacon.objId == 0){return;}
      dataservice.iBeaconService.remove(iBeacon.objId)

    }




    vm.deattachImage = function (image) {


      var index = vm.currentOrganization.images.indexOf(image);
      vm.currentOrganization.images.splice(index, 1); 
      if(image.objId == 0){return;}
      dataservice.organizationService.deattachImage(vm.currentOrganization.objId, image.objId)
    }

  }
})();
