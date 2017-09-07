(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('cfConfirmModal', cfConfirmModal)
        .controller('ConfirmModalController', ConfirmModalController);

    cfConfirmModal.$inject = ['$uibModal'];

    function cfConfirmModal($uibModal) {

        var directive = {
            link: link,
            restrict: 'EA',
            template: '',
            scope: {
                confirmAction: '&',
                cancelAction: '&',
                timeToLive: '=',
                showModal: '=',
                modalTitle: '=',
                modalMessage: '=',
                confirmButtonLabel: '=',
                cancelButtonLabel: '=',
                modalSize: '='
            }
        };

        return directive;

        function link(scope, element, attrs) {

            setModalOptions(scope);

            scope.$watch('showModal', function(newVal, oldVal) {

                if (scope.showModal) {

                    scope.showModal = false;

                    open(scope);
                }

            }, true);

            function open(scope) {

                $uibModal.open({
                    templateUrl: 'app/widgets/directives/confirm-modal/confirm-modal.html',
                    size: scope.modalSize,
                    controller: 'ConfirmModalController as vm',
                    resolve: {
                        action: function() {

                            return scope.confirmAction;
                        },

                        cancelAction: function() {

                            return scope.cancelAction;
                        },

                        timeToLive: function() {

                            return scope.timeToLive;
                        },

                        options: function() {

                            return {
                                modalTitle: scope.modalTitle,
                                modalMessage: scope.modalMessage,
                                confirmButtonLabel: scope.confirmButtonLabel,
                                cancelButtonLabel: scope.cancelButtonLabel
                            };
                        }
                    }
                });
            }

            function setModalOptions(scope) {

                if (!scope.modalSize) {

                    scope.modalSize = 'sm';
                }

                if (!scope.confirmButtonLabel) {

                    scope.confirmButtonLabel = 'Confirm';
                }

                if (!scope.cancelButtonLabel) {

                    scope.cancelButtonLabel = 'Cancel';
                }
            }
        }
    }

    ConfirmModalController.$inject = ['$scope', '$interval', '$uibModalInstance', 'action', 'cancelAction', 'timeToLive', 'options'];

    function ConfirmModalController($scope, $interval, $uibModalInstance, action, cancelAction, timeToLive, options) {

        var vm = this;

        // public methods
        vm.doAction = doAction;
        vm.cancel = cancel;

        // variables and properties
        var progressInterval;
        vm.progress = 1;
        vm.timeToLive = timeToLive;
        vm.modalTitle = options.modalTitle;
        vm.modalMessage = options.modalMessage;
        vm.confirmButtonLabel = options.confirmButtonLabel;
        vm.cancelButtonLabel = options.cancelButtonLabel;

        activate();

        //////////////////////////////

        function activate() {

            if (vm.timeToLive) {

                progressInterval = $interval(function() {

                    updateProgress(250);

                    if (vm.progress > 120) {

                        cancel();
                    }
                }, 250);
            }

            $scope.$on('$destroy', onModalDestroy);
        }

        //////////////////////////////

        function doAction() {

            action();

            $uibModalInstance.dismiss();
        }

        function cancel() {

            if (cancelAction) {

                cancelAction();

                cancelAction = null;
            }

            onModalDestroy();
        }

        //////////////////////////////

        /**
        *   Private method
        */
        function updateProgress(interval) {

            vm.progress += (interval * 100) / vm.timeToLive;
        }

        /**
        *   Private method
        */
        function onModalDestroy() {

            if (progressInterval) {

                $interval.cancel(progressInterval);
            }

            $uibModalInstance.dismiss();
        }
    }

})();
