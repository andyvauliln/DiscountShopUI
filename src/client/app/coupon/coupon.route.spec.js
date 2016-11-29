/* jshint -W117, -W030 */
describe('organizations routes', function() {
  describe('state', function() {
    var view = 'app/organizations/organizations.html';

    beforeEach(function() {
      module('app.organizations', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state organizations to url / ', function() {
      expect($state.href('organizations', {})).to.equal('/');
    });

    it('should map /organizations route to organizations View template', function() {
      expect($state.get('organizations').templateUrl).to.equal(view);
    });

    it('of organizations should work with $state.go', function() {
      $state.go('organizations');
      $rootScope.$apply();
      expect($state.is('organizations'));
    });
  });
});
