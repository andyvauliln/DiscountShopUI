(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger) {
    var service = {
      //Organization Api
      getOrganizations: getOrganizations,
      getOrganizationById : getOrganizationById,
      updateOrganizations : updateOrganizations,
      removeOrganizations : removeOrganizations,
      
      uploadImagesToOrganization : uploadImagesToOrganization,
      setImagesToOrganization : setImagesToOrganization,
      attachCouponsToOrganization: attachCouponsToOrganization,
      attachDiscountCardsToOrganization : attachDiscountCardsToOrganization,
      attachShopsToOrganization : attachShopsToOrganization,
      attachCategoriesToOrganization : attachCategoriesToOrganization,
      
      removeImagesFromOrganization : removeImagesFromOrganization,
      deattachCouponsFromOrganization: deattachCouponsFromOrganization,
      deattachDiscountCardsFromOrganization : deattachDiscountCardsFromOrganization,
      deattachShopsFromOrganization : deattachShopsFromOrganization,
      deattachCategoriesFromOrganization : deattachCategoriesFromOrganization,
       
      //Users Api
      getUsers : getUsers,
      getUserById : getUserById,
      updateUsers : updateUsers,
      removeUsers : removeUsers,
      
      attachCouponsToUser: attachCouponsToUser,
      attachDiscountCardsToUser : attachDiscountCardsToUser,
      deattachCouponsToUser: deattachCouponsToUser,
      deattachDiscountCardsToUser : deattachDiscountCardsToUser,

      //Coupon Api
      getCoupons: getCoupons,
      getCouponById : getCouponById,
      updateCoupons : updateCoupons,
      removeCoupons : removeCoupons,
      uploadImageForCoupon : uploadImageForCoupon,
      setImageForCoupon : setImageForCoupon,
      attachCouponCodes : attachCouponCodes,
      deattachCouponCodes : deattachCouponCodes,

      //CouponCodes Api
      getCouponCodes: getCouponCodes,
      getCouponCodeById : getCouponCodeById,
      removeCouponCodes : removeCouponCodes,
      generateCouponCodes : generateCouponCodes,
      deactivateCouponCodes : deactivateCouponCodes,
      activateCouponCodes : activateCouponCodes,

      //DiscountCard Api
      getDiscountCards: getDiscountCards,
      getDiscountCardById : getDiscountCardById,
      updateDiscountCards : updateDiscountCards,
      removeDiscountCards : removeDiscountCards,
      uploadBackImageForDiscountCard : uploadBackImageForDiscountCard,
      setBackImageForDiscountCard : setBackImageForDiscountCard,
      uploadFrontImageForDiscountCard : uploadFrontImageForDiscountCard,
      setFrontImageForDiscountCard : setFrontImageForDiscountCard,

      //Shop Api
      getShops: getShops,
      getShopById : getShopById,
      updateShops : updateShops,
      removeShops : removeShops,

      //Category Api
      getCategories: getCategories,
      getCategoryById : getCategoryById,
      updateCategories : updateCategories,
      removeCategories : removeCategories,
     
      //Image Api
      getImages: getImages,
      getImageById : getImageById,
      uploadImages : uploadImages,
      updateImages : updateImages,
      removeImages : removeImages,
    };
 
    return service;
    
    //Organization Api
    function getOrganizations() {
      return $http.get('http://disshopapp.azurewebsites.net/api/organizations')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getOrganizations')(e);
      }
    }
    function getOrganizationById(id) {
       var url = 'http://disshopapp.azurewebsites.net/api/organization/' + id;
      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateOrganization')(e);
      }
    }
    function updateOrganizations(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/organizations/';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateOrganizations')(e);
      }
    }
    function removeOrganizations(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/remove-organizatios';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for removeOrganizations')(e);
      }
    }
    function attachCouponsToOrganization(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/organization/' + id + '/attach-coupons';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for attachCouponsToOrganization')(e);
      }
    }
    function attachDiscountCardsToOrganization(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/organization/' + id + '/attach-discountcards';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for attachDiscountCardsToOrganization')(e);
      }
    }
    function attachShopsToOrganization(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/organization/' + id + '/attach-shops';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for attachShopsToOrganization')(e);
      }
    }
    function attachCategoriesToOrganization(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/organization/' + id + '/attach-categories';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for attachCategoriesToOrganization')(e);
      }
    }
    function uploadImagesToOrganization(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/organization/' + id + '/upload-images';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for uploadImagesToOrganization')(e);
      }
    }
    function setImagesToOrganization(id, data) {  
       var url = 'http://disshopapp.azurewebsites.net/api/organization/' + id + '/set-images';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for uploadImagesToOrganization')(e);
      }
    }
    function deattachCouponsFromOrganization(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/organization/' + id + '/deattach-coupons';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deattachCouponsFromOrganization')(e);
      }
    }
    function deattachDiscountCardsFromOrganization(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/organization/' + id + '/deattach-discountcards';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deattachDiscountCardsFromOrganization')(e);
      }
    }
    function deattachShopsFromOrganization(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/organization/' + id + '/deattach-shops';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deattachShopsFromOrganization')(e);
      }
    }
    function deattachCategoriesFromOrganization(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/organization/' + id + '/deattach-categores';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deattachCategoriesFromOrganization')(e);
      }
    }
    function removeImagesFromOrganization(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/organization/' + id + '/remove-images';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for removeImagesFromOrganization')(e);
      }
    }

    //User Api
    function getUsers() {
      return $http.get('http://disshopapp.azurewebsites.net/api/users')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getUsers')(e);
      }
    }
    function getUserById(id) {
       var url = 'http://disshopapp.azurewebsites.net/api/user/' + id;
      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getUserById')(e);
      }
    }
    function updateUsers(data) {
      var url = 'http://disshopapp.azurewebsites.net/api/users';
      return $http.post(url, data) 
        .then(success)
        .catch(fail);

      function success(response) {
        logger.info('success update');
        return response.data;
       
      }

      function fail(e) {
        logger.error('error update');
        return exception.catcher('XHR Failed for updateUsers')(e);
      }
    }
    function removeUsers(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/remove-users';
      return $http.post(url,data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for removeUsers')(e);
      }
    } 
    function attachCouponsToUser(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/user/' + id + '/attach-coupons';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for attachCouponsToUser')(e);
      }
    }
    function attachDiscountCardsToUser(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/user/' + id + '/attach-discountcards';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for attachDiscountCardsToUser')(e);
      }
    }
    function deattachCouponsToUser(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/user/' + id + '/deattach-coupons';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deattachCouponsToUser')(e);
      }
    }
    function deattachDiscountCardsToUser(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/user/' + id + '/deattach-discountcards';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deattachDiscountCardsToUser')(e);
      }
    }

    //Coupon Api
    function getCoupons() {
      return $http.get('http://disshopapp.azurewebsites.net/api/coupons')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getCoupons')(e);
      }
    }
    function getCouponById(id) {
       var url = 'http://disshopapp.azurewebsites.net/api/coupon/' + id;
      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getCouponById')(e);
      }
    }
    function updateCoupons(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/coupons';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateCoupons')(e);
      }
    }
    function removeCoupons(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/remove-coupons';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for removeCoupons')(e);
      }
    }
    function uploadImageForCoupon(id, data) {
         var url = 'http://disshopapp.azurewebsites.net/api/coupon/' + id + '/image';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for uploadImageForCoupon')(e);
      }
    }
    function setImageForCoupon(id, data) {
         var url = 'http://disshopapp.azurewebsites.net/api/coupon/' + id + '/set-image/' + data.objId;
      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for uploadImageForCoupon')(e);
      }
    }
    function attachCouponCodes(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/coupon/' + id + '/attach-couponcodes';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for attachCouponCodes')(e);
      }
    }
    function deattachCouponCodes(id, data) {
       var url = 'http://disshopapp.azurewebsites.net/api/user/' + id + '/deattach-couponcodes';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deattachCouponCodes')(e);
      }
    }

    //CouponCodes Api
    function getCouponCodes() {
      return $http.get('http://disshopapp.azurewebsites.net/api/couponcodes')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getCouponCodes')(e);
      }
    }
    function getCouponCodeById(id) {
       var url = 'http://disshopapp.azurewebsites.net/api/couponcode/' + id;
      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getCouponCodeById')(e);
      }
    }
    function removeCouponCodes(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/remove-couponcodes';
      return $http.post(url,data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for removeCouponCodes')(e);
      }
    }
    function generateCouponCodes(count) {
       var url = 'http://disshopapp.azurewebsites.net/api/generate-couponcodes/' + count;
      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for generateCouponCodes')(e);
      }
    }
    function deactivateCouponCodes(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/deactivate-couponcodes';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deactivateCouponCodes')(e);
      }
    }
   function activateCouponCodes(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/activate-couponcodes';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deactivateCouponCodes')(e);
      }
    }
   //Discount Card Api
    function getDiscountCards() {
      return $http.get('http://disshopapp.azurewebsites.net/api/discountcards')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getDiscountCards')(e);
      }
    }
    function getDiscountCardById(id) {
       var url = 'http://disshopapp.azurewebsites.net/api/discountcard/' + id;
      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getCouponById')(e);
      }
    }
    function updateDiscountCards(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/discountcards';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateDiscountCards')(e);
      }
    }
    function removeDiscountCards(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/remove-discountcards';
      return $http.post(url,data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for removeDiscountCards')(e);
      }
    }
    function uploadFrontImageForDiscountCard(id, data) {
         var url = 'http://disshopapp.azurewebsites.net/api/discountcard/' + id + '/upload-frontimage';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for uploadFrontImageForDiscountCard')(e);
      }
    }
    function setFrontImageForDiscountCard(id, data) {
         var url = 'http://disshopapp.azurewebsites.net/api/discountcard/' + id + '/set-frontimage/' + data.objId;
      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for uploadFrontImageForDiscountCard')(e);
      }
    }
    function uploadBackImageForDiscountCard(id, data) {
         var url = 'http://disshopapp.azurewebsites.net/api/discountcard/' + id + '/upload-backimage';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for uploadBackImageForDiscountCard')(e);
      }
    }

    function setBackImageForDiscountCard(id, data) {
         var url = 'http://disshopapp.azurewebsites.net/api/discountcard/' + id + '/set-backimage/' + data.objId;
      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for setBackImageForDiscountCard')(e);
      }
    }

     //Shop Api
    function getShops() {
      return $http.get('http://disshopapp.azurewebsites.net/api/shops')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getShops')(e);
      }
    }
    function getShopById(id) {
       var url = 'http://disshopapp.azurewebsites.net/api/shop/' + id;
      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getShopById')(e);
      }
    }
    function updateShops(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/shops';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateShops')(e);
      }
    }
    function removeShops(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/remove-shops';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for removeShops')(e);
      }
    }
       
    //Category Api
    function getCategories() {
      return $http.get('http://disshopapp.azurewebsites.net/api/categories')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getCategories')(e);
      }
    }
    function getCategoryById(id) {
       var url = 'http://disshopapp.azurewebsites.net/api/category/' + id;
      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getCategoryById')(e);
      }
    }
    function updateCategories(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/categories';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateCategory')(e);
      }
    }
    function removeCategories(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/remove-categories';
      return $http.post(url,data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for removeCategories')(e);
      }
    }
    
   
    //Image Api
    function getImages() {
      return $http.get('http://disshopapp.azurewebsites.net/api/images')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getImages')(e);
      }
    }
     function getImageById(id) {
       var url = 'http://disshopapp.azurewebsites.net/api/image/' + id;
      return $http.get(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getImageById')(e);
      }
    }
    function uploadImages(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/upload-images';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for uploadImages')(e);
      }
    }
    function updateImages(data) {
       var url = 'http://disshopapp.azurewebsites.net/api/images';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for uploadImages')(e);
      }
    }
    function removeImages(data) {
      var url = 'http://disshopapp.azurewebsites.net/api/remove-images';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for removeImages')(e);
      }
    }
  }
})();
