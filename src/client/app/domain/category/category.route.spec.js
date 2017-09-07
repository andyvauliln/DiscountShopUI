/* jshint -W117, -W030 */
describe('categorys routes', function() {
  describe('state', function() {
    var view = 'app/domain/category/category.html';

    beforeEach(function() {
      module('app.category', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state category to url / ', function() {
      expect($state.href('vs', {})).to.equal('/');
    });

    it('should map /categorys route to categorys View template', function() {
      expect($state.get('categorys').templateUrl).to.equal(view);
    });

    it('of categorys should work with $state.go', function() {
      $state.go('categorys');
      $rootScope.$apply();
      expect($state.is('categorys'));
    });
  });
});
