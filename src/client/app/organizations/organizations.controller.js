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
    vm.saveCoupon = vm.saveCoupon;
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
                           editable-text="row.entity.Name">{{ row.entity.Name || "empty" }} \
                        </a>' ;
    vm.editDescriptionTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.Description">{{ row.entity.Description || "empty" }} \
                        </a>' ;
    vm.editCategoriesTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           e-ng-options="category.Id as category.Name for category in grid.appScope.vm.categories"\
                           editable-checklist="row.entity.Categories">{{  grid.appScope.vm.showCategories(row.entity) }} \
                        </a>' ;
    vm.editKeyWordsTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.KeyWords">{{ row.entity.KeyWords || "empty" }} \
                        </a>' ;
    vm.editNewDateTemplate = '<a href="#" class="custom-cell-align" \
                          editable-bsdate="row.entity.NewDate" \
                          ng-click="grid.appScope.vm.openDateTime($event, \'$data\', this.row,  this.col, COL_FIELD)" \
                           e-is-open="grid.appScope.vm.openedDateTime.$data"  \
                            e-datepicker-popup="dd-MMMM-yyyy"\
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity); grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD);" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" > \
                            {{ (row.entity.NewDate | date:"dd/MM/yyyy") || "empty" }} \
                        </a>' ;
    vm.editTopDateTemplate = '<a href="#" class="custom-cell-align" \
                          editable-bsdate="row.entity.TopDate" \
                          ng-click="grid.appScope.vm.openDateTime($event, \'$data\', this.row,  this.col, COL_FIELD)" \
                           e-is-open="grid.appScope.vm.openedDateTime.$data"  \
                            e-datepicker-popup="dd-MMMM-yyyy"\
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity); grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD);" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" > \
                            {{ (row.entity.TopDate | date:"dd/MM/yyyy") || "empty" }} \
                        </a>' ;
    vm.editSaleDateTemplate = '<a href="#" class="custom-cell-align" \
                          editable-bsdate="row.entity.SaleDate" \
                          ng-click="grid.appScope.vm.openDateTime($event, \'$data\', this.row,  this.col, COL_FIELD)" \
                           e-is-open="grid.appScope.vm.openedDateTime.$data"  \
                            e-datepicker-popup="dd-MMMM-yyyy"\
                           onbeforesave="grid.appScope.vm.saveOrganization(this.row.entity); grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD);" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" > \
                            {{ (row.entity.SaleDate | date:"dd/MM/yyyy") || "empty" }} \
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
        { Name: 'Name', field: 'Name', cellTemplate: vm.editNameTemplate, width: "*" },
        { name: 'Description', field: 'Description', width: "*", cellTemplate: vm.editDescriptionTemplate },
        { name: 'Categories', field: 'Categories', width: "*", cellTemplate: vm.editCategoriesTemplate },
        { name: 'KeyWords',  field: 'KeyWords', width: "*", cellTemplate: vm.editKeyWordsTemplate },
        { name: 'NewDate', field: 'NewDate', width: "*", cellTemplate: vm.editNewDateTemplate },
        { name: 'TopDate', field: 'TopDate', width: "*", cellTemplate: vm.editTopDateTemplate },
        { name: 'SaleDate', field: 'SaleDate', width: "*", cellTemplate: vm.editSaleDateTemplate },
        {
          name: 'Actions',
          cellTemplate: '<button class="btn btn-primary btn-vert-align" ng-click="grid.appScope.vm.showShops(this.row.entity)">Shops ({{this.row.entity.Shops.length}})</button>\
                        <button class="btn btn-primary btn-vert-align" ng-click="grid.appScope.vm.showDiscountCards(this.row.entity)">Cards ({{this.row.entity.DiscountCards.length}})</button> \
                        <button class="btn btn-primary btn-vert-align" ng-click="grid.appScope.vm.showCoupons(this.row.entity)">Coupons ({{this.row.entity.Coupons.length}})</button> \
                        <button class="btn btn-primary btn-vert-align" ng-click="grid.appScope.vm.showImages(this.row.entity)">Images ({{this.row.entity.Images.length}})</button>',
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
    function getCategories(){
      return dataservice.getCategories().then(function (data) {
        return vm.categories = data;
      });
    }
    function showCategories(entity) {

      var selected = entity.Categories.map(function(item){return item.Name})
      return selected.length ? selected.join(', ') : 'Not set';
    }
    //Organization
    function getOrganizations() {

      return dataservice.getOrganizations().then(function (data) {
         vm.organizationGridOptions.data = data;
         refreshCurrentContainer(data);
      });
    }

    function saveOrganization(entity) {
      console.log(entity);
      $q.when(dataservice.updateOrganizations([entity])).then(function () {
        getOrganizations();
      });
    }
    function removeOrganizations() {
      var idsToDelete = this.gridApi.selection.getSelectedRows().map(function (item) { return item.Id });
      $q.when(dataservice.removeOrganizations(idsToDelete)).then(function () {
        getOrganizations();
      });
    }
    function mockOrganization() {
      vm.organizationGridOptions.data.unshift({ 'Id': -1, "Categories":[], "Shops":[], 'DiscountCards':[], "Coupons":[], "Name": "OOO Моя Беларусь", "Description" : "Хорошая Копания", "KeyWords" : "один, два", "NewDate" :  Date.now(), "TopDate" :  Date.now(), "SaleDate" :  Date.now()  })
    }

     function attachDiscountCard(entity) {
      console.log(entity);
      $q.when(dataservice.attachDiscountCardsToOrganization(vm.currentOrganization.Id, [entity.Id])).then(function () {
        getOrganizations();
      });
    }
    function attachOrganizationImage(files, organization) {
       angular.forEach(files, function(flowFile, i){
         var fileReader = new FileReader();
          fileReader.onload = function (event) {
            var uri = event.target.result.substr(event.target.result.indexOf('base64')+7);
            var image  = { "Id": 0, "Content" : uri, 'ContentType':'jpeg', 'Name': 'img.jpg' }
             $q.when(dataservice.updateImages([image])).then(function (data) {
                    $q.when(dataservice.setImagesToOrganization(organization.Id, [data[0].Id])).then(function (data) {
                        vm.getOrganizations()

                    });
             });
              coupon.Image = uri;     
          };
          fileReader.readAsDataURL(flowFile.file);

      });
    }
    function attachCoupon(entity) {
      console.log(entity);
      $q.when(dataservice.attachCouponsToOrganization(vm.currentOrganization.Id, [entity.Id])).then(function () {
        getOrganizations();
      });
    }
    function attachShop(entity) {
      console.log(entity);
      $q.when(dataservice.attachShopsToOrganization(vm.currentOrganization.Id, [entity.Id])).then(function () {
        getOrganizations();
      });
    }

    function deattachDiscountCard(entity) {
      console.log(entity);
      $q.when(dataservice.deattachDiscountCardsFromOrganization(vm.currentOrganization.Id, [entity.Id])).then(function () {
        getOrganizations();
      });
    }
    function deattachCoupon(entity) {
      console.log(entity);
      $q.when(dataservice.deattachCouponsFromOrganization(vm.currentOrganization.Id, [entity.Id])).then(function () {
        getOrganizations();
      });
    }
      function deattachShop(entity) {
        console.log(entity);
        $q.when(dataservice.deattachShopsFromOrganization(vm.currentOrganization.Id, [entity.Id])).then(function () {
          getOrganizations();
        });
      } 
      function deattachImage(entity) {
        console.log(entity);
        $q.when(dataservice.removeImagesFromOrganization(vm.currentOrganization.Id, [entity.Id])).then(function () {
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
        vm.currentShopArr = entity.Shops.filter(function (item) { return item.Id > 0 });
        vm.mockShop();
        console.log(entity);

      }
      function saveShop(shop) {
        console.log(shop)
        $q.when(dataservice.updateShops([shop])).then(function (data) {

          //replace it to another place
          attachShop(data[0]);


        });
      }

      function mockShop() {
        vm.currentShopArr.unshift({ "Id": -1, "Address" : "Никрасова 45, 7", "Name":"ООО Сова", "City": "Минск", "Phone":"+375290000000", "Shedule": "с 8 до 5", "Latitude": "54,123123132", "Longitude":"23,2342342342" })
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
        vm.currentImageArr = entity.Images.filter(function (item) { return item.Id > 0 });
        vm.mockImage();
      }

       function mockImage() {
        vm.currentImageArr.unshift({ "Id": 0, "Content" : '' })
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
        vm.currentDiscountCardArr = entity.DiscountCards.filter(function (item) { return item.Id > 0 });;
        vm.mockDiscountCard();


      }
      function saveDiscountCard(entity) {

        $q.when(dataservice.updateDiscountCards([entity])).then(function (data) {
            attachDiscountCard(data[0]);
        });
      }

      function attachDiscountFrontImage(file, discountCard) {
         angular.forEach(files, function(flowFile, i){
         var fileReader = new FileReader();
          fileReader.onload = function (event) {
            var uri = event.target.result.substr(event.target.result.indexOf('base64')+7);
            var image  = { "Id": 0, "Content" : uri, 'ContentType':'jpeg', 'Name': 'img.jpg' }
             $q.when(dataservice.updateImages([image])).then(function (data) {
                    $q.when(dataservice.setFrontImageForDiscountCard(discountCard.Id, data[0])).then(function (data) {
                        vm.getOrganizations()

                    });
             });
              coupon.Image = uri;     
          };
          fileReader.readAsDataURL(flowFile.file);

      });
    }

      function attachDiscountBackImage(file, coupon) {
         angular.forEach(files, function(flowFile, i){
         var fileReader = new FileReader();
          fileReader.onload = function (event) {
            var uri = event.target.result.substr(event.target.result.indexOf('base64')+7);
            var image  = { "Id": 0, "Content" : uri, 'ContentType':'jpeg', 'Name': 'img.jpg' }
             $q.when(dataservice.updateImages([image])).then(function (data) {
                    $q.when(dataservice.setBackImageForDiscountCard(discountCard.Id, data[0])).then(function (data) {
                        vm.getOrganizations()

                    });
             });
              coupon.Image = uri;     
          };
          fileReader.readAsDataURL(flowFile.file);

      });

      }
      function mockDiscountCard() {
        vm.currentDiscountCardArr.unshift({ "Id": -1, "BarCode":"12351235132", "BackSideImg": { "Id": 0, "Name": "", "Content": "" }, "FrontSideImg": { "Id": 0, "Name": "", "Content": "" } })
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
        vm.currentCouponArr = entity.Coupons.filter(function (item) { return item.Id > 0 });
        vm.mockCoupon();
        console.log(entity);

      }
      function saveCoupon(coupon) {
        $q.when(dataservice.updateCoupons([coupon])).then(function (data) {
            attachCoupon(data[0]);
        });
      }
      function attachCouponImage(files, coupon) {
        angular.forEach(files, function(flowFile, i){
         var fileReader = new FileReader();
          fileReader.onload = function (event) {
            var uri = event.target.result.substr(event.target.result.indexOf('base64')+7);
            var image  = { "Id": 0, "Content" : uri, 'ContentType':'jpeg', 'Name': 'img.jpg' }
             $q.when(dataservice.updateImages([image])).then(function (data) {
                $q.when(dataservice.setImageForCoupon(coupon.Id, data[0])).then(function (data) {
              vm.getOrganizations()

             });
             });
              coupon.Image = uri;     
          };
          fileReader.readAsDataURL(flowFile.file);
    });


      }

      function deactivateCouponCodes(code) {
        $q.when(dataservice.deactivateCouponCodes([code.Id])).then(function (data) {
           vm.getOrganizations()

        });
      }
      function generateCouponCode(coupon) {
        if (coupon.Id <= 0) {
          $q.when(dataservice.updateCoupons([coupon])).then(function (data) {
            coupon = data[0];
             $q.when(dataservice.attachCouponsToOrganization(vm.currentOrganization.Id, [data[0].Id])).then(function (data) {
                $q.when(dataservice.generateCouponCodes(1)).then(function (data) {
                  $q.when(dataservice.attachCouponCodes(coupon.Id, data)).then(function (data) {
                    vm.getOrganizations()

              });
            });
            });
          });
        } else {
          $q.when(dataservice.generateCouponCodes(1)).then(function (data) {
            $q.when(dataservice.attachCouponCodes(coupon.Id, data)).then(function (data) {
              vm.getOrganizations()

            });
          });
        }
      }
      function activateCouponCodes(code) {
        $q.when(dataservice.activateCouponCodes([code.Id])).then(function (data) {
           vm.getOrganizations()

        });
      }
      function mockCoupon() {
        vm.currentCouponArr.unshift({ "Id": -1, "Description":"Хороший Купон", "Image": { "Id": 0, "Name": "", "Content": "" } })
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
        changeCellSize( row, obj, col);
        $event.preventDefault();
        $event.stopPropagation();

        vm.openedDateTime[elementOpened] = !vm.openedDateTime[elementOpened];
      }
      function clearAllRows() {
        vm.gridApi.selection.clearSelectedRows();
      };

      function refreshCurrentContainer(data) {

        if (vm.currentOrganization && vm.currentOrganization.Id) {
          var currOrg = data.filter(function (item) { return item.Id == vm.currentOrganization.Id })[0];

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
