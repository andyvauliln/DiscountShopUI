(function() {
  'use strict';

  angular
    .module('app.shop')
    .controller('shopController', shopController);

  shopController.$inject = ['$q', 'uiGridConstants', 'dataservice', 'logger', '$scope'];
  /* @ngInject */
  function shopController($q, uiGridConstants, dataservice, logger, $scope) {
    var vm = this;
    vm.title = 'Shops';
    vm.currentGridCellWidth = '';
    vm.currentShop = {};
    //Shop
    vm.getShops = getShops;
    vm.saveShop = saveShop;
    vm.removeShops = removeShops;
    vm.mockShop = mockShop;
    //Utils
    vm.changeCellSize = changeCellSize;
    vm.defaultCellSize = defaultCellSize;
    vm.toggleFiltering = toggleFiltering;
    vm.openedDateTime = {};
    vm.clearAllRows = clearAllRows;
    vm.openDateTime = openDateTime;
    vm.editNameTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveShop(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.Name">{{ row.entity.Name || "empty" }} \
                        </a>' ;
    vm.editAddressTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveShop(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.Address">{{ row.entity.Address || "empty" }} \
                        </a>' ;
    vm.editPhoneTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveShop(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.Address">{{ row.entity.Address || "empty" }} \
                        </a>' ;

    vm.editSheduleTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveShop(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.Shedule">{{ row.entity.Shedule || "empty" }} \
                        </a>' ;
     vm.editLatitudeTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveShop(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.Latitude">{{ row.entity.Latitude || "empty" }} \
                        </a>' ;
      vm.editLongitudeTemplate = '<a href="#" class="custom-cell-align" \
                           ng-click="grid.appScope.vm.changeCellSize(this.row,  this.col, COL_FIELD)" \
                           onbeforesave="grid.appScope.vm.saveShop(this.row.entity)" \
                           oncancel="grid.appScope.vm.defaultCellSize(this.row,  this.col, COL_FIELD)" \
                           editable-text="row.entity.Longitude">{{ row.entity.Longitude || "empty" }} \
                        </a>' ;                                       
    vm.shopGridOptions = {
      enableSorting: true,
      enableFiltering: false,
      autoResize: true,
      rowHeight: 40,
      onRegisterApi: function (gridApi) {
        vm.gridApi = gridApi;
      },
      columnDefs: [
        { Name: 'Name', field: 'Name', cellTemplate: vm.editNameTemplate, width: "*" },
        { name: 'Address', field: 'Address', width: "*", cellTemplate: vm.editAddressTemplate },
        { name: 'Phone', field: 'Phone', width: "*", cellTemplate: vm.editPhoneTemplate },
        { name: 'Shedule',  field: 'Shedule', width: "*", cellTemplate: vm.editSheduleTemplate },
        { name: 'Latitude', field: 'Latitude', width: "*", cellTemplate: vm.editLatitudeTemplate },
        { name: 'Longitude', field: 'Longitude', width: "*", cellTemplate: vm.editLongitudeTemplate },
      ],
      data: []
    };


    activate();
    function activate() {
      var promises = [getShops()];
      return $q.all(promises).then(function () {
        logger.info('Activated Shop View');
      });
    }

    //Shop
    function getShops() {

      return dataservice.getShops().then(function (data) {
         vm.shopGridOptions.data = data;
      });
    }

    function saveShop(entity) {
      $q.when(dataservice.updateShops([entity])).then(function () {
        getShops();
      });
    }
    function removeShops() {
      var idsToDelete = this.gridApi.selection.getSelectedRows().map(function (item) { return item.Id });
      $q.when(dataservice.removeShops(idsToDelete)).then(function () {
        getShops();
      });
    }

      function mockShop() {
        vm.currentShopArr.unshift({ "Id": -1, "Address" : "Никрасова 45, 7", "Name":"ООО Сова", "City": "Минск", "Phone":"+375290000000", "Shedule": "с 8 до 5", "Latitude": "54,123123132", "Longitude":"23,2342342342" })
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
  }

})();
