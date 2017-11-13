(function() {
  'use strict';

  /**
   * Directive for downloading a document with authorization
   */
  function htDownloadDocument($http, FileSaver, config) {

    function link(scope, elem) {
      elem.on('click', function(e) {

        e.preventDefault();
        var url = elem.attr('href');
        var params = {};
        if (scope.htDownloadParams != undefined)
          params = scope.htDownloadParams;

        $http({
          url: url,
          method: 'GET',
          responseType: "arraybuffer",
          params : params
        }).then(function(response) {

          var contentDispositionHeader = response.headers('Content-Disposition');
          //var filename = contentDispositionHeader.split(';')[1].trim().split('=')[1];
          var filename = 'organization_export.csv';
          var blob = new Blob([response.data], { type: "application/octet-binary" });
          FileSaver.saveAs(blob, filename);
        });
      });
    }

    return {
      link: link,
      restrict: 'A',
      scope: {
        cfDownloadParams: '='
      }
    };
  }

  angular
    .module('app.widgets')
    .directive('htDownloadDocument', htDownloadDocument);

  htDownloadDocument.$inject = ['$http', 'FileSaver', 'config'];

})();
