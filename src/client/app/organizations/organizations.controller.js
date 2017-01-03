(function () {
  'use strict';

  angular
    .module('app.organizations')
    .controller('organizationsController', organizationsController);

  organizationsController.$inject = ['$q', 'uiGridConstants', 'dataservice', 'logger', '$scope'];
  /* @ngInject */
  function organizationsController($q, uiGridConstants, dataservice, logger, $scope) {
    var vm = this;
    vm.IsShowDiscountCardContainer = false;
    vm.IsShowCouponContainer = false;
    vm.IsShowShopContainer = false;
    vm.IsShowImageContainer = false;
    vm.title = 'Organization';
    vm.currentGridCellWidth = '';
    vm.categories = [];
    vm.currentDiscountCardArr = [];
    vm.currentCouponArr = [];
    vm.currentShopArr = [];
    vm.currentImageArr = [];
    vm.currentOrganization = {};
    //Organization
    vm.getOrganizations = getOrganizations;
    vm.saveOrganization = saveOrganization;
    vm.removeOrganizations = removeOrganizations;
    vm.attachDiscountCard = attachDiscountCard;
    vm.attachCoupon = attachCoupon;
    vm.attachOrganizationImage = attachOrganizationImage;
    vm.attachShop = attachShop;
    vm.deattachDiscountCard = deattachDiscountCard;
    vm.deattachShop = deattachShop;
    vm.deattachCoupon = deattachCoupon;
    vm.deattachImage = deattachImage;
    vm.mockOrganization = mockOrganization
    //Shop
    vm.showShops = showShops;
    vm.saveShop = saveShop;
    vm.mockShop = mockShop;
    //Image
    vm.showImages = showImages;
    vm.mockImage = mockImage;
    //Categories 
    vm.getCategories = getCategories;
    vm.showCategories = showCategories;
    //Discount Cards
    vm.showDiscountCards = showDiscountCards;
    vm.saveDiscountCard = saveDiscountCard;
    vm.attachDiscountFrontImage = attachDiscountFrontImage;
    vm.attachDiscountBackImage = attachDiscountBackImage;
    vm.mockDiscountCard = mockDiscountCard;
    //Coupons
    vm.showCoupons = showCoupons;
    vm.attachCouponImage = attachCouponImage;
    vm.saveCoupon = saveCoupon;
    vm.deactivateCouponCodes = deactivateCouponCodes;
    vm.activateCouponCodes = activateCouponCodes;
    vm.mockCoupon = mockCoupon;
    vm.generateCouponCode = generateCouponCode;
    //Utils
    vm.changeCellSize = changeCellSize;
    vm.defaultCellSize = defaultCellSize;
    vm.toggleFiltering = toggleFiltering;
    vm.openedDateTime = {};
    vm.clearAllRows = clearAllRows
    vm.openDateTime = openDateTime;
    vm.editNameTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.name">{{ row.entity.name || "empty" }} \
                        </a>' ;
    vm.editDescriptionTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.objDescription">{{ row.entity.objDescription || "empty" }} \
                        </a>' ;
    vm.editCategoriesTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           e-ng-options="category.objId as category.name for category in grid.appScope.vm.categories"\
                           editable-checklist="row.entity.categories">{{  grid.appScope.vm.showCategories(row.entity) }} \
                        </a>' ;
    vm.editKeyWordsTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.keyWords">{{ row.entity.keyWords || "empty" }} \
                        </a>' ;
    vm.editNewDateTemplate = '<a href="#" class="custom-cell-align" \
                          editable-bsdate="row.entity.newDate" \
                          ng-click="grid.appScope.vm.openDateTime($event, \'$data\', this.row,  this.col, COL_FIELD)" \
                           e-is-open="grid.appScope.vm.openedDateTime.$data"  \
                            e-datepicker-popup="dd-MMMM-yyyy"\
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity); grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD);" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" > \
                            {{ (row.entity.newDate | date:"dd/MM/yyyy") || "empty" }} \
                        </a>' ;
    vm.editTopDateTemplate = '<a href="#" class="custom-cell-align" \
                          editable-bsdate="row.entity.topDate" \
                          ng-click="grid.appScope.vm.openDateTime($event, \'$data\', this.row,  this.col, COL_FIELD)" \
                           e-is-open="grid.appScope.vm.openedDateTime.$data"  \
                            e-datepicker-popup="dd-MMMM-yyyy"\
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity); grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD);" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" > \
                            {{ (row.entity.topDate | date:"dd/MM/yyyy") || "empty" }} \
                        </a>' ;
    vm.editSaleDateTemplate = '<a href="#" class="custom-cell-align" \
                          editable-bsdate="row.entity.saleDate" \
                          ng-click="grid.appScope.vm.openDateTime($event, \'$data\', this.row,  this.col, COL_FIELD)" \
                           e-is-open="grid.appScope.vm.openedDateTime.$data"  \
                            e-datepicker-popup="dd-MMMM-yyyy"\
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity); grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD);" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" > \
                            {{ (row.entity.saleDate | date:"dd/MM/yyyy") || "empty" }} \
                        </a>' ;

    vm.organizationGridOptions = {
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
        { Name: 'Name', field: 'name', cellTemplate: vm.editNameTemplate, width: "*" },
        { name: 'Description', field: 'objDescription', width: "*", cellTemplate: vm.editDescriptionTemplate },
        { name: 'Categories', field: 'categories', width: "*", cellTemplate: vm.editCategoriesTemplate },
        { name: 'KeyWords', field: 'keyWords', width: "*", cellTemplate: vm.editKeyWordsTemplate },
        { name: 'NewDate', field: 'newDate', width: "*", cellTemplate: vm.editNewDateTemplate },
        { name: 'TopDate', field: 'topDate', width: "*", cellTemplate: vm.editTopDateTemplate },
        { name: 'SaleDate', field: 'saleDate', width: "*", cellTemplate: vm.editSaleDateTemplate },
        {
          name: 'Actions',
          cellTemplate: '<button class="btn btn-primary btn-vert-align" ng-click="grid.appScope.vm.showShops(this.row.entity)">Shops ({{this.row.entity.shops.length}})</button>\
                        <button class="btn btn-primary btn-vert-align" ng-click="grid.appScope.vm.showDiscountCards(this.row.entity)">Cards ({{this.row.entity.discountCards.length}})</button> \
                        <button class="btn btn-primary btn-vert-align" ng-click="grid.appScope.vm.showCoupons(this.row.entity)">Coupons ({{this.row.entity.coupons.length}})</button> \
                        <button class="btn btn-primary btn-vert-align" ng-click="grid.appScope.vm.showImages(this.row.entity)">Images ({{this.row.entity.images.length}})</button>',
          enableFiltering: false,
          enableSorting: false,
          width: "400",
          cellEditableCondition: false
        }
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
      var promises = [getOrganizations(), getCategories()];
      return $q.all(promises).then(function () {
        logger.info('Activated Organization View');
      });
    }
    //Categories
    function getCategories() {
      return dataservice.getCategories().then(function (data) {
        return vm.categories = data.categories;
      });
    }
    function showCategories(entity) {

      var selected = entity.categories.map(function (item) { return item.name })
      return selected.length ? selected.join(', ') : 'Not set';
    }
    //Organization
    function getOrganizations() {

      return dataservice.getOrganizations().then(function (data) {
        vm.organizationGridOptions.data = data.organizations;
        refreshCurrentContainer(data.organizations);
      });
    }

    function saveOrganization(entity) {
      console.log(entity);
      $q.when(dataservice.updateOrganizations([entity])).then(function () {
        getOrganizations();
      });
    }
    function removeOrganizations() {
      var idsToDelete = this.gridApi.selection.getSelectedRows().map(function (item) { return item.objId });
      $q.when(dataservice.removeOrganizations(idsToDelete)).then(function () {
        getOrganizations();
      });
    }
    function mockOrganization() {
      vm.organizationGridOptions.data.unshift({ 'objId': -1, "categories": [], "shops": [], 'discountCards': [], "coupons": [], "name": "OOO Моя Беларусь", "objDescription": "Хорошая Копания", "keyWords": "один, два", "newDate": Date.now(), "topDate": Date.now(), "saleDate": Date.now() })
    }

    function attachDiscountCard(entity) {
      console.log(entity);
      $q.when(dataservice.attachDiscountCardsToOrganization(vm.currentOrganization.objId, [entity.objId])).then(function () {
        getOrganizations();
      });
    }
    
    function attachOrganizationImage(files, image) {
      angular.forEach(files, function (flowFile, i) {
          var fileReader = new FileReader();
          fileReader.onload = function (event) {
          var content = event.target.result.substr(event.target.result.indexOf('base64') + 7);
          image.content = content
          $q.when(dataservice.updateImages([image])).then(function (data) {
            if(image.objId < 1) {
              $q.when(dataservice.setImagesToOrganization(vm.currentOrganization.objId, [data[0].objId])).then(function (data) {
                getOrganizations();

              });
            } else {
              getOrganizations();  
            }
          });
        };
        fileReader.readAsDataURL(flowFile.file);

      });
    }
    function attachCoupon(entity) {
      console.log(entity);
      $q.when(dataservice.attachCouponsToOrganization(vm.currentOrganization.objId, [entity.objId])).then(function () {
        getOrganizations();
      });
    }
    function attachShop(entity) {
      console.log(entity);
      $q.when(dataservice.attachShopsToOrganization(vm.currentOrganization.objId, [entity.objId])).then(function () {
        getOrganizations();
      });
    }

    function deattachDiscountCard(entity) {
      console.log(entity);
      $q.when(dataservice.deattachDiscountCardsFromOrganization(vm.currentOrganization.objId, [entity.objId])).then(function () {
        getOrganizations();
      });
    }
    function deattachCoupon(entity) {
      console.log(entity);
      $q.when(dataservice.deattachCouponsFromOrganization(vm.currentOrganization.objId, [entity.objId])).then(function () {
        getOrganizations();
      });
    }
    function deattachShop(entity) {
      console.log(entity);
      $q.when(dataservice.deattachShopsFromOrganization(vm.currentOrganization.objId, [entity.objId])).then(function () {
        getOrganizations();
      });
    }
    function deattachImage(entity) {
      console.log(entity);
      $q.when(dataservice.removeImagesFromOrganization(vm.currentOrganization.objId, [entity.objId])).then(function () {
        getOrganizations();
      });
    }
    //Shops
    function showShops(entity) {

      clearAllRows();
      vm.gridApi.selection.selectRow(entity);
      vm.IsShowDiscountCardContainer = false;
      vm.IsShowCouponContainer = false;
      vm.IsShowImageContainer = false;
      vm.IsShowShopContainer = true;
      vm.currentShopArr = [];
      vm.currentOrganization = entity;
      vm.currentShopArr = entity.shops.filter(function (item) { return item.objId > 0 });
      vm.mockShop();
      console.log(entity);

    }
    function saveShop(shop) {
      console.log(shop)
      $q.when(dataservice.updateShops([shop])).then(function (data) {

        //replace it to another place
      if(shop.objId < 1){
        attachShop(data[0]);
      }

      });
    }

    function mockShop() {
      vm.currentShopArr.unshift({ "objId": -1, "address": "Никрасова 45, 7", "name": "ООО Сова", "city": "Минск", "phone": "+375290000000", "shedule": "с 8 до 5", "latitude": "54,123123132", "longitude": "23,2342342342" })
    }
    //Images

    function showImages(entity) {

      clearAllRows();
      vm.gridApi.selection.selectRow(entity);
      vm.IsShowDiscountCardContainer = false;
      vm.IsShowCouponContainer = false;
      vm.IsShowImageContainer = true;
      vm.IsShowShopContainer = false;
      vm.currentImageArr = [];
      vm.currentOrganization = entity;
      vm.currentImageArr = entity.images.filter(function (item) { return item.objId > 0 });
      vm.mockImage();
    }

    function mockImage() {
      vm.currentImageArr.unshift({ "objId": -1, "content": '', 'contentType': 'jpeg', 'name': 'img.jpg' })
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
      vm.currentOrganization = entity;
      vm.currentDiscountCardArr = entity.discountCards.filter(function (item) { return item.objId > 0 });;
      vm.mockDiscountCard();


    }

    function saveDiscountCard(discountCard) {

      $q.when(dataservice.updateDiscountCards([discountCard])).then(function (data) {
        if(discountCard.objId < 1){
          attachDiscountCard(data[0]);
         
        } else {
           getOrganizations();
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
              vm.getOrganizations()

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
              vm.getOrganizations()

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
      vm.currentOrganization = entity;
      vm.currentCouponArr = entity.coupons.filter(function (item) { return item.objId > 0 });
      vm.mockCoupon();
      console.log(entity);

    }
    function saveCoupon(coupon) {
      $q.when(dataservice.updateCoupons([coupon])).then(function (data) {
        if(coupon.objId < 1){

           attachCoupon(data[0]); 
        } else {
          getOrganizations();
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
              vm.getOrganizations()

            });
          });
          coupon.image = uri;
        };
        fileReader.readAsDataURL(flowFile.file);
      });
    }

    function deactivateCouponCodes(code) {
      $q.when(dataservice.deactivateCouponCodes([code.objId])).then(function (data) {
        vm.getOrganizations()

      });
    }
    function generateCouponCode(coupon) {
      if (coupon.objId <= 0) {
        $q.when(dataservice.updateCoupons([coupon])).then(function (data) {
          coupon = data[0];
          $q.when(dataservice.attachCouponsToOrganization(vm.currentOrganization.odjId, [data[0].objId])).then(function (data) {
            $q.when(dataservice.generateCouponCodes(1)).then(function (data) {
              $q.when(dataservice.attachCouponCodes(coupon.objId, data)).then(function (data) {
                vm.getOrganizations()

              });
            });
          });
        });
      } else {
        $q.when(dataservice.generateCouponCodes(1)).then(function (data) {
          $q.when(dataservice.attachCouponCodes(coupon.objId, data)).then(function (data) {
            vm.getOrganizations()

          });
        });
      }
    }
    function activateCouponCodes(code) {
      $q.when(dataservice.activateCouponCodes([code.objId])).then(function (data) {
        vm.getOrganizations()

      });
    }
    function mockCoupon() {
      vm.currentCouponArr.unshift({ "objId": -1, "objDescription": "Хороший Купон", "image": { "id": 0, "name": "", "content": "" } })
    }
    //Utils

    function toggleFiltering() {
      this.organizationGridOptions.enableFiltering = !this.organizationGridOptions.enableFiltering;
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

      if (vm.currentOrganization && vm.currentOrganization.objId) {
        var currOrg = data.filter(function (item) { return item.objId == vm.currentOrganization.objId })[0];

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
