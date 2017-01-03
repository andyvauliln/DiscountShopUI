(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('userController', userController);

  userController.$inject = ['$q', 'uiGridConstants', 'dataservice', 'logger', '$scope'];
  /* @ngInject */
  function userController($q, uiGridConstants, dataservice, logger, $scope) {
    var vm = this;
    vm.IsShowDiscountCardContainer = false;
    vm.IsShowCouponContainer = false;
    vm.title = 'user';
    vm.currentGridCellWidth = '';

    vm.currentDiscountCardArr = [];
    vm.currentCouponArr = [];
    vm.currentUser = {};
    //User
    vm.getUsers = getUsers;
    vm.saveUser = saveUser;
    vm.removeUsers = removeUsers;
    vm.attachDiscountCard = attachDiscountCard;
    vm.attachCoupon = attachCoupon;
    vm.deattachDiscountCard = deattachDiscountCard;
    vm.deattachCoupon = deattachCoupon;
    vm.mockUser = mockUser;
    //Discount Cards
    vm.showDiscountCards = showDiscountCards;
    vm.saveDiscountCard = saveDiscountCard;
    vm.attachDiscountFrontImage = attachDiscountFrontImage;
    vm.attachDiscountBackImage = attachDiscountBackImage;
    vm.mockDiscountCard = mockDiscountCard;
    //Coupons
    vm.showCoupons = showCoupons;
    vm.attachCouponImage = attachCouponImage;
    vm.saveCoupon = vm.saveCoupon;
    vm.deactivateCouponCodes = deactivateCouponCodes;
    vm.activateCouponCodes = activateCouponCodes;
    vm.mockCoupon = mockCoupon;
    //Utils
    vm.changeCellSize = changeCellSize;
    vm.defaultCellSize = defaultCellSize;
    vm.toggleFiltering = toggleFiltering;
    vm.clearAllRows = clearAllRows;



    vm.editEmailTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveUser(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           e-is-open="grid.appScope.vm.openedDateTime.$data"  \
                           editable-text="row.entity.email">{{ row.entity.email || "empty" }} \
                        </a>' ;
    vm.editFirstNameTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveUser(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.firstName">{{ row.entity.firstName || "empty" }} \
                        </a>' ;
    vm.editLastNameTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveUser(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.lastName">{{ row.entity.lastName || "empty" }} \
                        </a>' ;
    vm.editDiscCountTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveUser(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.discountCardsMaxCount">{{ row.entity.discountCardsMaxCount || "empty" }} \
                        </a>' ;
    vm.editCouponCountTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveUser(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.couponsMaxCount">{{ row.entity.couponsMaxCount || "empty" }} \
                        </a>' ;

    vm.userGridOptions = {
      enableSorting: true,
      enableFiltering: false,
      autoResize: true,
      // enableRowSelection: true,
      // multiSelect = true,
      rowHeight: 40,
      onRegisterApi: function (gridApi) {
        vm.gridApi = gridApi;
      },
      columnDefs: [
        { Name: 'Email', field: 'email', cellTemplate: vm.editEmailTemplate, width: "*" },
        { name: 'FirstName', field: 'firstName', width: "*", cellTemplate: vm.editFirstNameTemplate },
        { name: 'LastName', field: 'lastName', width: "*", cellTemplate: vm.editLastNameTemplate },
        { name: 'DiscountCardsMaxCount', displayName: 'Dis Max Count', field: 'discountCardsMaxCount', width: 150, cellTemplate: vm.editDiscCountTemplate },
        { name: 'CouponsMaxCount', displayName: 'Coupon Max Count', field: 'couponsMaxCount', width: 150, cellTemplate: vm.editCouponCountTemplate },
        {
          name: 'DiscountCards',
          cellTemplate: '<button class="btn btn-primary btn-vert-align" ng-click="grid.appScope.vm.showDiscountCards(this.row.entity)"> Disc Cards</button>',
          enableFiltering: false,
          enableSorting: false,
          width: 150,
          cellEditableCondition: false
        },

        {
          name: 'Coupons',
          cellTemplate: '<button class="btn btn-primary btn-vert-align" ng-click="grid.appScope.vm.showCoupons(this.row.entity)">Coupons</button>',
          enableFiltering: false,
          enableSorting: false,
          width: 150,
          cellEditableCondition: false
        },
        // { name: 'Save',
        //      cellTemplate:'<button class="btn btn-danger btn-vert-align" ng-click="grid.appScope.vm.updateEntity(this.row.entity)">Save User</button>',
        //      enableFiltering: false,
        //      width:150,
        //     cellEditableCondition:false }

      ],
      data: []
    };

    vm.flowConfig = {
      target: '',
      testChunks: false,
      singleFile: true,
      chunkSize: 9007199254740992,
    };
    vm.flowConfig1 = {
      target: '',
      testChunks: false,
      singleFile: true,
      chunkSize: 9007199254740992,
    };

    activate();
    function activate() {
      var promises = [getUsers()];
      return $q.all(promises).then(function () {
        logger.info('Activated User View');
      });
    }
    //Users
    function getUsers() {

      return dataservice.getUsers().then(function (data) {
        return vm.userGridOptions.data = data.users;
      });
    }

    function saveUser(entity) {
      console.log(entity);
      $q.when(dataservice.updateUsers([entity])).then(function () {
        getUsers();
      });
    }
    function removeUsers() {
      var idsToDelete = this.gridApi.selection.getSelectedRows().map(function (item) { return item.objId });
      $q.when(dataservice.removeUsers(idsToDelete)).then(function () {
        getUsers();
      });
    }
    function mockUser() {
      vm.userGridOptions.data.unshift({ 'objId': -1, 'email': 'test@gmail.com', 'lastName': 'Petrov', 'firstName': 'Petr', 'discountCardsMaxCount': 300, 'couponsMaxCount': 300, 'coupons': [], 'discountCards': [] });
    }
    function attachDiscountCard(entity) {
      console.log(entity);
      $q.when(dataservice.attachDiscountCardsToUser(vm.currentUser.objId, [entity])).then(function () {
        getUsers();
      });
    }
    function attachCoupon(entity) {
      console.log(entity);
      $q.when(dataservice.attachCouponsToUser(vm.currentUser.objId, [entity])).then(function () {
        getUsers();
      });
    }

    function deattachDiscountCard(entity) {
      console.log(entity);
      $q.when(dataservice.deattachDiscountCardsFromUser(vm.currentUser.objId, [entity])).then(function () {
        getUsers();
      });
    }
    function deattachCoupon(entity) {
      console.log(entity);
      $q.when(dataservice.deattachCouponsFromUser(vm.currentUser.objId, [entity])).then(function () {
        getUsers();
      });
    }
   //DiscountCards
    function showDiscountCards(entity) {

      clearAllRows();
      vm.gridApi.selection.selectRow(entity);
      vm.IsShowDiscountCardContainer = true;
      vm.IsShowCouponContainer = false;
      vm.IsShowImageContainer = false;
      vm.IsShowShopContainer = false;
      vm.currentDiscountCardArr = [];
      vm.currentUser = entity;
      vm.currentDiscountCardArr = entity.discountCards.filter(function (item) { return item.objId > 0 });;
      vm.mockDiscountCard();


    }

    function saveDiscountCard(discountCard) {

      $q.when(dataservice.updateDiscountCards([discountCard])).then(function (data) {
        if(discountCard.objId < 1){
          attachDiscountCard(data[0]);
         
        } else {
           getUsers();
        }
      });
    }

    function attachDiscountFrontImage(files, discountCard) {
      angular.forEach(files, function (flowFile, i) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
          var uri = event.target.result.substr(event.target.result.indexOf('base64') + 7);
          var image = { "objId": 0, "content": uri, 'contentType': 'jpeg', 'name': 'img.jpg' }
          $q.when(dataservice.updateImages([image])).then(function (data) {
            $q.when(dataservice.setFrontImageForDiscountCard(discountCard.objId, data[0])).then(function (data) {
              vm.getUsers()

            });
          });
        };
        fileReader.readAsDataURL(flowFile.file);

      });
    }

    function attachDiscountBackImage(files, discountCard) {
      angular.forEach(files, function (flowFile, i) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
          var uri = event.target.result.substr(event.target.result.indexOf('base64') + 7);
          var image = { "objId": 0, "content": uri, 'contentType': 'jpeg', 'name': 'img.jpg' }
          $q.when(dataservice.updateImages([image])).then(function (data) {
            $q.when(dataservice.setBackImageForDiscountCard(discountCard.objId, data[0])).then(function (data) {
              vm.getUsers()

            });
          });
        };
        fileReader.readAsDataURL(flowFile.file);

      });
    }
    function mockDiscountCard() {
      vm.currentDiscountCardArr.unshift({ "objId": -1, "barCode": "12351235132", "backSideImg": { "objId": 0, "name": "", "content": "" }, "frontSideImg": { "objId": 0, "name": "", "content": "" } })
    }
    //Coupons
    function showCoupons(entity) {

      clearAllRows();
      vm.gridApi.selection.selectRow(entity);
      vm.IsShowDiscountCardContainer = false;
      vm.IsShowCouponContainer = true;
      vm.IsShowImageContainer = false;
      vm.IsShowShopContainer = false;
      vm.currentCouponArr = [];
      vm.currentUser = entity;
      vm.currentCouponArr = entity.coupons.filter(function (item) { return item.objId > 0 });
      vm.mockCoupon();
      console.log(entity);

    }
    function saveCoupon(coupon) {
      $q.when(dataservice.updateCoupons([coupon])).then(function (data) {
        if(coupon.objId < 1){

           attachCoupon(data[0]); 
        } else {
          getUsers();
        }
        
      });
    }
    function attachCouponImage(files, coupon) {
      angular.forEach(files, function (flowFile, i) {
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
          var uri = event.target.result.substr(event.target.result.indexOf('base64') + 7);
          var image = { "objId": 0, "content": uri, 'contentType': 'jpeg', 'name': 'img.jpg' }
          $q.when(dataservice.updateImages([image])).then(function (data) {
            $q.when(dataservice.setImageForCoupon(coupon.objId, data[0])).then(function (data) {
              vm.getUsers();

            });
          });
          coupon.image = uri;
        };
        fileReader.readAsDataURL(flowFile.file);
      });
    }

    function deactivateCouponCodes(code) {
      $q.when(dataservice.deactivateCouponCodes([code.objId])).then(function (data) {
        vm.getUsers()

      });
    }
    function generateCouponCode(coupon) {
      if (coupon.objId <= 0) {
        $q.when(dataservice.updateCoupons([coupon])).then(function (data) {
          coupon = data[0];
          $q.when(dataservice.attachCouponsToUser(vm.currentUser.odjId, [data[0].objId])).then(function (data) {
            $q.when(dataservice.generateCouponCodes(1)).then(function (data) {
              $q.when(dataservice.attachCouponCodes(coupon.objId, data)).then(function (data) {
                vm.getUsers()

              });
            });
          });
        });
      } else {
        $q.when(dataservice.generateCouponCodes(1)).then(function (data) {
          $q.when(dataservice.attachCouponCodes(coupon.objId, data)).then(function (data) {
            vm.getUsers()

          });
        });
      }
    }
    function activateCouponCodes(code) {
      $q.when(dataservice.activateCouponCodes([code.objId])).then(function (data) {
        vm.getUsers()

      });
    }
    function mockCoupon() {
      vm.currentCouponArr.unshift({ "objId": -1, "objDescription": "Хороший Купон", "image": { "id": 0, "name": "", "content": "" } })
    }
    //Utils

    function toggleFiltering() {
      this.userGridOptions.enableFiltering = !this.userGridOptions.enableFiltering;
      this.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
    };
    function changeCellSize(row, obj, col) {

      var col = obj.grid.columns.filter(function (item) { return item.colDef.field == obj.colDef.field })[0];
      if (col.width < 350 || col.drawnWidth < 350) {
        vm.currentGridCellWidth = col.width;
        col.width = 350;
      }

      row.height = row.height + 30;
      row.grid.refresh();

    }
    function defaultCellSize(row, obj, col) {
      var col = obj.grid.columns.filter(function (item) { return item.colDef.field == obj.colDef.field })[0];
      col.width = vm.currentGridCellWidth;
      row.grid.refresh();
    }
    function openDateTime($event, elementOpened, row, obj, col) {
      changeCellSize(row, obj, col);
      $event.preventDefault();
      $event.stopPropagation();

      vm.openedDateTime[elementOpened] = !vm.openedDateTime[elementOpened];
    }
    function clearAllRows() {
      vm.gridApi.selection.clearSelectedRows();
    };
    function refreshCurrentContainer(data) {

      if (vm.currentUser && vm.currentUser.objId) {
        var currOrg = data.filter(function (item) { return item.objId == vm.currentUser.objId })[0];

        if (vm.IsShowDiscountCardContainer) {

          showDiscountCards(currOrg);

        } else if (vm.IsShowCouponContainer) {

          showCoupons(currOrg);

        } else if (vm.IsShowImageContainer) {

          showImages(currOrg);

        } else if (vm.IsShowShopContainer) {

          showShops(currOrg);
        }
      }
    }
  }

})();

