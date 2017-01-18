(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('userController', userController);

  userController.$inject = ['$q', 'uiGridConstants', 'dataservice', 'logger', '$scope'];
  /* @ngInject */
  function userController($q, uiGridConstants, dataservice, logger, $scope) {
    var vm = this;

  }

})();

