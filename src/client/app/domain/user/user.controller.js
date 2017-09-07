(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('userController', userController);

  userController.$inject = ['$scope', '$q', 'logger', 'dataservice', 'appConfig', 'ModalService', 'userModel', 'shopModel', 'imageModel', 'shareModel'];
  /* @ngInject */
  function userController($scope, $q, logger, dataservice, appConfig, ModalService, userModel, shopModel, imageModel, shareModel) {
    var vm = this;
    //Organization
    vm.users = [];
    vm.editOrganization = editUser;
    vm.currentUser = null;
    vm.appConfig = appConfig;
    vm.statuses = [{ value: true, text: 'Активный' }, { value: false, text: 'Не активный' }];
    vm.getShares = function () {
      return (vm.currentUser && vm.currentUser.shares) ? vm.currentUser.shares : [];
    };
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
      logger.info('Activated User View');
      var promises = [getUsers(), getCategories()];
      return $q.all(promises).then(function () {
      });
    }

    vm.editUser = function (user) {
      vm.currentUser = user;

      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: "app/domain/user/user.edit.html",
        controller:
        function (close) {
          this.males = [
            { value: true, text: 'М' },
            { value: false, text: 'Ж' },
          ];
          this.showMale = function () {
            var selected = this.males.filter(function (res) { return res.value === vm.currentUser.male });
            return (vm.currentUser.male && selected.length) ? selected[0].text : 'Не задан';
          };
          this.currentUser = vm.currentUser;
          this.close = result => close(result, 500);
          this.categories = vm.categories;
          this.showCategories = vm.showCategories;
          this.attachCategory = vm.attachCategory;
          this.saveUser = vm.saveUser;
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

    vm.showStatuses = function (item) {
      var selected = vm.statuses.filter(function (status) { return item.isActive == status.value });
      return (item.isActive != null && selected.length) ? selected[0].text : 'Not set';
    };


    vm.saveUser = function (user) {

      return dataservice.userService.addOrUpdate(user).then(function (result) {

        vm.currentUser = result;
        return result;
      });

    };
    vm.addUser = function () {

      vm.users.unshift(new userModel(null));
    };

    //user
    function getUsers() {

      dataservice.userService.getAll().then(function (data) {

        vm.users = data;

      });
    }
    function getCategories() {

      dataservice.categoryService.getAll().then(function (data) {

        vm.categories = data;

      });
    }


    vm.addShare = function (type) {

      var share = new shareModel(null);
      share.type = type;
      vm.currentUser.shares.unshift(share);
    };

    vm.saveShare = function (share) {

      if (share.objId > 0) {

        return dataservice.shareService.addOrUpdate(share).then(function (result) {

          share = result;

        });

      } else {

        return dataservice.shareService.addOrUpdate(share).then(function (result) {
          return dataservice.userService.attachShare(vm.currentUser.objId, result.objId).then(function (res) {
            vm.currentUser = res;
            return result;
          });

        });
      };
    };

    vm.getImageUrlFromImage = function (image) {

      if (image) {

        return vm.appConfig.IMAGE_URL + image.name;
      }
      return '#';

    };
    vm.getImageUrl = function (item) {

      if (item.images.length > 0) {

        return vm.appConfig.IMAGE_URL + item.images[0].name;
      }
      return '#';
    };
    vm.getImageUrlByPrefix = function (item, prefix) {

      var images = item.images.filter(function (image) {

        return image.prefix == prefix;
      });

      if (images.length > 0) {

        return vm.appConfig.IMAGE_URL + images[0].name;
      }
      return '#';
    };
    vm.attachImageToDcard = function (files, share, prefix) {
      if (share.objId == 0) {

        vm.saveShare(share).then(function (newShare) {

          vm.addImage(files[0], prefix).then(function (newImage) {

            dataservice.shareService.setImage(newShare.objId, newImage.objId)
          });
        });
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
          });
        });
      }
      else {
        vm.addImage(files[0], prefix).then(function (newImage) {

          dataservice.shareService.setImage(share.objId, newImage.objId).then(function (res) {
            share.images.push(newImage);
          });
        });
      }
    };

    vm.attachImageToCoupon = function (files, share) {
      if (share.objId == 0) {

        vm.saveShare(share).then(function (newShare) {

          vm.addImage(files[0]).then(function (newImage) {

            dataservice.shareService.setImage(newShare.objId, newImage.objId)
          });
        });
      } else if (share.images.length > 0) {

        vm.getImageContent(files[0]).then(function (content) {
          var image = share.images[0];
          image.content = content;
          var share1 = share;
          dataservice.imageService.addOrUpdate(image).then(function (res) {
            share1.images[0] = res;
          });
        });
      }
      else {
        vm.addImage(files[0]).then(function (newImage) {

          dataservice.shareService.setImage(share.objId, newImage.objId).then(function (res) {
            share.images.push(newImage);
          });
        });
      }
    };

    vm.deattachShare = function (share) {

      var index = vm.currentOrganization.shares.indexOf(share);
      vm.currentOrganization.shares.splice(index, 1);
      dataservice.organizationService.deattachShare(vm.currentOrganization.objId, share.objId);

    };

    vm.addImage = function (flowFile, prefix) {

      var deferred = $q.defer();
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        var image = new imageModel(null);
        if (prefix) {
          image.prefix = prefix;
        }
        image.content = event.target.result.substr(event.target.result.indexOf('base64') + 7);
        dataservice.imageService.addOrUpdate(image).then(function (res) {
          deferred.resolve(res)
        });
      };
      fileReader.readAsDataURL(flowFile.file);
      return deferred.promise;
    }
    vm.getImageContent = function (flowFile) {

      var deferred = $q.defer();
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        var image = new imageModel(null);
        image.content = event.target.result.substr(event.target.result.indexOf('base64') + 7);

        deferred.resolve(image.content);

      };
      fileReader.readAsDataURL(flowFile.file);
      return deferred.promise;
    };

    vm.deleteUser = function (user) {

      var index = vm.users.indexOf(user);
      vm.users.splice(index, 1);
      dataservice.userService.remove(user.objId).then(function () {
      });

    };



    //ToDo: redevelope
    function toggleTab(tab) {

      $('.nav-tabs a[name="' + tab + '"]').tab('show');
      $('.tab-content div').removeClass("in active");

      $('.tab-content div[id="' + tab + '"]').addClass('in active');
    }
    function editUser(org) {
      vm.currentUser = org;
    }

    function showOrgDiteils(org, tab) {
      vm.currentUser = org;
      if (tab) {
        toggleTab(tab);
      }
    }
  }
})();
