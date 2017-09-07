(function () {
  'use strict';

  angular
    .module('app.category')
    .controller('categoryController', categoryController);

  categoryController.$inject = ['$scope', '$q', 'logger', 'dataservice', 'appConfig', 'categoryModel'];
  /* @ngInject */
  function categoryController($scope, $q, logger, dataservice, appConfig, categoryModel) {
    var vm = this;

    vm.categories = [];
  
    activate();
    function activate() {
      logger.info('Activated Category View');
      var promises = [getCategories()];
      return $q.all(promises).then(function () {
      });
    }
    function getCategories() {

      dataservice.categoryService.getAll().then(function (data) {

        vm.categories = data;

      });
    };
    
    vm.addCategory = function(){
      
      vm.categories.unshift(new categoryModel(null));
      
    };
    
    vm.removeCategory = function(category) {
      
      var index = vm.categories.indexOf(category);
      vm.categories.splice(index, 1); 
       if(category.objId == 0){ return; }
      dataservice.categoryService.remove(category.objId).then(function(res) {
          category = res;
        });;
      
    };
    
    vm.saveCategory = function(category) {
      
        dataservice.categoryService.addOrUpdate(category).then(function(res) {
          category = res;
        });

    };
      
  
  
  
  }
})();
