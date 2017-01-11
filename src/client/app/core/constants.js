/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('appConfig', {
      API_HOST: 'http://disshopapp.azurewebsites.net/api/',
      API_GET_ORGANIZATION_ROUTE: '/organizations/',
       methods: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
      }
    });
})();
