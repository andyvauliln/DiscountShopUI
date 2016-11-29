/* jshint -W117, -W030 */
describe('shop routes', function() {
  describe('state', function() {
    var view = 'app/shop/shop.html';

    beforeEach(function() {
      module('app.shop', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state shop to url /shop ', function() {
      expect($state.href('shop', {})).to.equal('/shop');
    });

    it('should map /shop route to shop View template', function() {
      expect($state.get('shop').templateUrl).to.equal(view);
    });

    it('of shop should work with $state.go', function() {
      $state.go('shop');
      $rootScope.$apply();
      expect($state.is('shop'));
    });
  });
});
