(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('iBeaconModel', iBeaconModelFactory);

    iBeaconModelFactory.$inject = ['appConfig'];

    function iBeaconModelFactory(appConfig) {

        /**
        *   Domain model of an iBbeacon used for Creating new iBbeacons
        *   @param {object} iBeaconModel - object for construction of new iBbeaconModel object
        */
        function iBeaconModel(iBbeacon) {
            
            this.objId = (iBbeacon && iBbeacon.objId) ? iBbeacon.objId : 0;
            this.uniqueId = (iBbeacon && iBbeacon.uniqueId) ? iBbeacon.uniqueId : '';
            this.major = (iBbeacon && iBbeacon.major) ? iBbeacon.major : '';
            this.organizationId = (iBbeacon && iBbeacon.organizationId) ? iBbeacon.organizationId : 0;
            this.minor = (iBbeacon && iBbeacon.minor) ? iBbeacon.minor : '';
            this.title = (iBbeacon && iBbeacon.title) ? iBbeacon.title : '';
            this.text = (iBbeacon && iBbeacon.text) ? iBbeacon.text : '';
            this.url = (iBbeacon && iBbeacon.url) ? iBbeacon.url : '';
            this.type = (iBbeacon && iBbeacon.type) ? iBbeacon.type : 'ibeacon';
            this.instanceId = (iBbeacon && iBbeacon.instanceId) ? iBbeacon.instanceId : '';
        }

        return iBeaconModel;
    }

})();
