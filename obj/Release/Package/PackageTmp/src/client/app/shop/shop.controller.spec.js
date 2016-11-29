/* jshint -W117, -W030 */
describe('shopController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.shop');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('shopController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('shop controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of shop', function() {
        expect(controller.title).to.equal('shop');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
