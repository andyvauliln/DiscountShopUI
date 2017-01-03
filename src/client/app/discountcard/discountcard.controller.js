(function () {
  'use strict';

  angular
    .module('app.discountcard')
    .controller('discountcardController', discountcardController);

  discountcardController.$inject = ['$q', 'uiGridConstants', 'dataservice', 'logger', '$scope'];
  /* @ngInject */
  function discountcardController($q, uiGridConstants, dataservice, logger, $scope) {
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
    vm.mockUser = mockUser
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
    vm.editEmailTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveUser(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.Email">{{ row.entity.Email || "empty" }} \
                        </a>' ;
    vm.editFirstNameTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveUser(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.FirstName">{{ row.entity.FirstName || "empty" }} \
                        </a>' ;
    vm.editLastNameTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveUser(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.LastName">{{ row.entity.LastName || "empty" }} \
                        </a>' ;
    vm.editDiscCountTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveUser(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.DiscountCardsMaxCount">{{ row.entity.DiscountCardsMaxCount || "empty" }} \
                        </a>' ;
    vm.editCouponCountTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveUser(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.CouponsMaxCount">{{ row.entity.CouponsMaxCount || "empty" }} \
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
        { Name: 'Email', field: 'Email', cellTemplate: vm.editEmailTemplate, width: "*" },
        { name: 'FirstName', field: 'FirstName', width: "*", cellTemplate: vm.editFirstNameTemplate },
        { name: 'LastName', field: 'LastName', width: "*", cellTemplate: vm.editLastNameTemplate },
        { name: 'DiscountCardsMaxCount', displayName: 'Dis Max Count', field: 'DiscountCardsMaxCount', width: 150, cellTemplate: vm.editDiscCountTemplate },
        { name: 'CouponsMaxCount', displayName: 'Coupon Max Count', field: 'CouponsMaxCount', width: 150, cellTemplate: vm.editCouponCountTemplate },
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
vm.couponId = 1;
    vm.flowConfig = {
      target: 'http://disshopapp.azurewebsites.net/api/discountcard/'+ 1 +'/upload-backimage',
      testChunks: false,
      singleFile: true,
      chunkSize: 9007199254740992,
      // headers: {
      //   Authorization: 'Bearer ' + currentUser.accessToken
      // }
    };
    vm.flowConfig1 = {
      target:'http://disshopapp.azurewebsites.net/api/discountcard/'+ 1 +'/image',
      testChunks: false,
      singleFile: true,
      chunkSize: 9007199254740992,
      // headers: {
      //   Authorization: 'Bearer ' + currentUser.accessToken
      // }
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
       return  vm.userGridOptions.data = data;
      });
    }

    function saveUser(entity) {
      console.log(entity);
      $q.when(dataservice.updateUsers([entity])).then(function () {
        getUsers();
      });
    }
    function removeUsers() {
     var idsToDelete = this.gridApi.selection.getSelectedRows().map(function(item){ return item.Id});
      $q.when(dataservice.removeUsers(idsToDelete)).then(function () {
        getUsers();
      });
    }
    function mockUser() {
      vm.userGridOptions.data.unshift({Id:0})
    }
    function attachDiscountCard(entity) {
      console.log(entity);
      $q.when(dataservice.attachDiscountCardsToUser(vm.currentUser.Id, [entity])).then(function () {
        getUsers();
      });
    }
    function attachCoupon(entity) {
      console.log(entity);
      $q.when(dataservice.attachCouponsToUser(vm.currentUser.Id, [entity])).then(function () {
        getUsers();
      });
    }
  
    function deattachDiscountCard(entity) {
      console.log(entity);
      $q.when(dataservice.deattachDiscountCardsToUser(vm.currentUser.Id, [entity])).then(function () {
        getUsers();
      });
    }
    function deattachCoupon(entity) {
      console.log(entity);
      $q.when(dataservice.deattachCouponsToUser(vm.currentUser.Id,[entity])).then(function () {
        getUsers();
      });
    }

    //DiscountCards
    function showDiscountCards(entity) {

      vm.IsShowDiscountCardContainer = true;
      vm.IsShowCouponContainer = false;
      vm.currentDiscountCardArr = [];
      vm.currentUser = entity;
      vm.currentDiscountCardArr = entity.DiscountCards.filter(function(item){ return item.Id > 0});;
      vm.mockDiscountCard();
      console.log(entity.DiscountCards);

    }
    function saveDiscountCard(entity) {

       $q.when(dataservice.updateDiscountCards([entity])).then(function (data) {
          $q.when(dataservice.getUserById(vm.currentUser.Id)).then(function (data) {
            vm.showDiscountCards(data);
        });
      });
    }
     
    function attachDiscountFrontImage(file, discountCard) {
     // vm.couponId = discountCard.Id ;
     //vm.flowConfig.target = 'http://disshopapp.azurewebsites.net/api/discountcard/' + discountCard.Id + '/upload-frontimage',
     vm.flowConfig.target = 
      console.log(file);

    }

    function attachDiscountBackImage(file, coupon) {
      vm.flowConfig.target = 'http://disshopapp.azurewebsites.net/api/discountcard/' + discountCard.Id + '/upload-backimage',
     
      console.log(file);

    }
    function mockDiscountCard() {
      vm.currentDiscountCardArr.unshift({"Id":0, "BackSideImg": {"Id": 0, "Name": "","Content": ""}, "FrontSideImg": {"Id": 0, "Name": "","Content": ""}})
    }
    //Coupons
    function showCoupons(entity) {

      vm.IsShowDiscountCardContainer = false;
      vm.IsShowCouponContainer = true;
      vm.currentCouponArr = [];
      vm.currentUser = entity;
      vm.currentCouponArr = entity.Coupons.filter(function(item){ return item.Id > 0});
      vm.mockCoupon();
      console.log(entity);

    }
    function saveCoupon(coupon) {
       $q.when(dataservice.updateCoupons([coupon])).then(function (data) {
         $q.when(dataservice.getUserById(vm.currentUser.Id)).then(function (data) {
            vm.showCoupons(data);
        });

      });
    }
    function attachCouponImage(file, coupon) {
      //vm.flowConfig.target = 'http://disshopapp.azurewebsites.net/api/coupon/'+ coupon.Id +'/image',
     

        console.log(file);
      

    }

     function deactivateCouponCodes(code) {
       $q.when(dataservice.deactivateCouponCodes([code.Id])).then(function (data) {
       vm.currentUser = dataservice.getUserById(vm.currentUser.Id);
       vm.showCoupons(vm.currentUser)

      });
    }
     function activateCouponCodes(code) {
       $q.when(dataservice.activateCouponCodes([code.Id])).then(function (data) {
         vm.currentUser = dataservice.getUserById(vm.currentUser.Id)
        vm.showCoupons(vm.currentUser)

      });
    }
    function mockCoupon() {
      vm.currentCouponArr.unshift({"Id":0, "Image": {"Id": 0, "Name": "","Content": ""}})
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

  
  
  }
})();
