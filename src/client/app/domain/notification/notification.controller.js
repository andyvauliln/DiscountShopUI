(function () {
  'use strict';

  angular
    .module('app.notification')
    .controller('notificationController', notificationController);

  notificationController.$inject = ['$scope', '$q', 'logger', 'dataservice', 'appConfig', 'ModalService', 'organizationModel', 'notificationModel', 'NgMap'];
  /* @ngInject */
  function notificationController($scope, $q, logger, dataservice, appConfig, ModalService, organizationModel, notificationModel, NgMap) {
    var vm = this;
    vm.organizations = [];
    vm.notificationTemplates = [];
    vm.currentTemplate = null
    vm.isShowActive = false;
    

    vm.filterByActive = function (item) {
      if (vm.isShowActive) {
        return item.isActive;
      } else 
      {
        return item;
      }
    };

    activate();
    function activate() {
      var promises = [getOrganizations(), getNotifications()];
      return $q.all(promises).then(function () {
        logger.info('Activated Notification View');
      });
    }


    function getOrganizations() {

      dataservice.organizationService.getAll().then(function (data) {

        vm.organizations = data;

      })
    }
    function getNotifications() {

      dataservice.notificationService.getAll().then(function (data) {

        vm.notificationTemplates = data;

      })
    }

     vm.showMessageWindow = function () {

      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: "app/layout/notification.template.html",
        controller:
        function (close) {
          this.message = "";
          this.close = result => close(result, 500);
          this.sendPushNotification = dataservice.notificationService.sendPushNotification;
          this.opened = {};
          this.tags = [];
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

    vm.editTemplate = function (template) {

      vm.currentTemplate = template;
      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: "app/domain/notification/notification.edit.html",
        controller:
        function (close) {
          this.currentTemplate = vm.currentTemplate;
          this.currentTemplate.radius = parseFloat(this.currentTemplate.radius)
          this.close = result => close(result, 500);
          this.saveTemplate = vm.saveTemplate;
          this.opened = {};
          this.opened2 = {};
          this.rectShapeResized = function () {
            if (this.map && Math.round(this.map.shapes.circle.getRadius())) {
              template.latitude = this.map.shapes.circle.getCenter().lat();
              template.longitude = this.map.shapes.circle.getCenter().lng();
              template.radius = Math.round(this.map.shapes.circle.getRadius());
            }
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
           this.open2 = function ($event, elementOpened) {
            $event.preventDefault();
            $event.stopPropagation();
            this.opened2[elementOpened] = !this.opened2[elementOpened];
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


    vm.saveTemplate = function (notification) {
      notification.type = 0;
      return dataservice.notificationService.addOrUpdate(notification).then(function (result) {

        vm.currentTemplate = result;
        return result;
      });

    }
    vm.addTemplate = function () {

      vm.notificationTemplates.unshift(new notificationModel(null));
    }

    vm.deleteTemplate = function () {

      if (vm.currentTemplate.objId == 0) { return; }
      var index = vm.notificationTemplates.indexOf(vm.currentTemplate);
      vm.notificationTemplates.splice(index, 1);
      dataservice.notificationService.remove(vm.currentTemplate.objId).then(function () {
      });
    };

    vm.confirmDelete = function (template) {
      vm.currentTemplate = template;
      vm.showConfirmModal = true;
    };

    $scope.opened = {};
    $scope.open = function ($event, elementOpened) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened[elementOpened] = !$scope.opened[elementOpened];
    };


  }
})();
