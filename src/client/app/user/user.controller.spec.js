/* jshint -W117, -W030 */
describe('userController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.user');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('userController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('user controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of user', function() {
        expect(controller.title).to.equal('user');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
