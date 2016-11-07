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
      attachCouponsToOrganization: attachCouponsToOrganization,
      attachDiscountCardsToOrganization : attachDiscountCardsToOrganization,
      attachShopsToOrganization : attachShopsToOrganization,
      attachCategoriesToOrganization : attachCategoriesToOrganization,
      
      removeImagesToOrganization : removeImagesToOrganization,
      deattachCouponsToOrganization: deattachCouponsToOrganization,
      deattachDiscountCardsToOrganization : deattachDiscountCardsToOrganization,
      deattachShopsToOrganization : deattachShopsToOrganization,
      deattachCategoriesToOrganization : deattachCategoriesToOrganization,
       
      //Users Api
      getUsers : getUsers,
      getUserById : getUserById,
      updateUsers : updateUsers,
      deleteUsers : deleteUsers,
      
      attachCouponsToUser: attachCouponsToUser,
      attachDiscountsCardToUser : attachDiscountsCardToUser,
      deattachCouponsToUser: deattachCouponsToUser,
      deattachDiscountsCardToUser : deattachDiscountsCardToUser,

      //Coupon Api
      getCoupons: getCoupons,
      getCouponById : getCouponById,
      updateCoupons : updateCoupons,
      removeCoupons : removeCoupons,
      uploadImageForCoupon : uploadImageForCoupon,

      //CouponCodes Api
      getCouponCodes: getCouponCodes,
      getCouponCodeById : getCouponCodeById,
      removeCouponCodes : removeCouponCodes,
      generateCouponCodes : generateCouponCodes,
      deactivateCouponCodes : deactivateCouponCodes,
      attachCouponCode : attachCouponCode,
      deattachCouponCode: deattachCouponCode,

      //DiscountCard Api
      getDiscountCards: getDiscountCards,
      getDiscountCardById : getDiscountCardById,
      updateDiscountCards : updateDiscountCards,
      removeDiscountCards : removeDiscountCards,
      uploadBackImageForDiscountCard : uploadBackImageForDiscountCard,
      uploadFrontImageForDiscountCard : uploadFrontImageForDiscountCard,

      //Shop Api
      getShops: getShops,
      getShopById : getShopById,
      updateShops : updateShops,
      removeShops : removeShops,

      //Category Api
      getCategories: getCategories,
      getCategoryById : getCategoryById,
      updateCategories : updateCategores,
      removeCategories : removeCategories,
     
      //Image Api
      getImages: getImages,
      getImageById : getImageById,
      uploadImages : uploadImages,
      removeImages : removeImages,
    };
 
    return service;
    
    //Organization Api
    function getOrganizations() {
      return $http.get('https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organizations')
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organization/' + id;
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
    function updateOrganizations(id, data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organizations/' + id;
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateOrganization')(e);
      }
    }
    function removeOrganizations(data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/remove-organizatios';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organization/' + id + '/attach-coupons';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organization/' + id + '/attach-discountcards';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organization/' + id + '/attach-shops';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organization/' + id + '/attach-categories';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organization/' + id + '/upload-images';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organization/' + id + '/deattach-coupons';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organization/' + id + '/deattach-discountcards';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organization/' + id + '/deattach-shops';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organization/' + id + '/deattach-categores';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organization/' + id + '/remove-images';
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
    
    
    
    //Category Api
    function getCategories() {
      return $http.get('https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/category')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getCategories')(e);
      }
    }
    function deleteCategory(id) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/category/' + id;
      return $http.delete(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deleteCategory')(e);
      }
    }
    function updateCategory(id, data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/category/' + id;
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
    function getCategoryById(id) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/category/' + id;
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
    //Shop Api
    function getShops() {
      return $http.get('https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/shop')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getShops')(e);
      }
    }
    function deleteShop(id) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/shop/' + id;
      return $http.delete(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deleteShop')(e);
      }
    }
    function updateShop(id, data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/shop/' + id;
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateShop')(e);
      }
    }
    function getShopById(id) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/shop/' + id;
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
    //Image Api
    function getImages() {
      return $http.get('https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/images')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getImages')(e);
      }
    }
    function deleteImage(id) {
      var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/image/' + id;
      return $http.delete(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deleteImage')(e);
      }
    }
    function uploadImages(data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/images';
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
    function getImageById(id) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/image/' + id;
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
    //Coupon Api
    function getCoupons() {
      return $http.get('https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/coupon')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getCoupons')(e);
      }
    }
    function deleteCoupon(id) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/coupon/' + id;
      return $http.delete(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deleteCoupon')(e);
      }
    }
    function updateCoupon(id, data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/coupon/' + id;
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateCoupon')(e);
      }
    }
    function getCouponById(id) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/coupon/' + id;
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
    function uploadImageForCoupon(id, data) {
         var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/coupon/' + id + '/image';
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

    //Discount Card Api
    function getDiscountCards() {
      return $http.get('https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/discountCards')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getDiscountCards')(e);
      }
    }
    function deleteDiscountCard(id) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/discountCard/' + id;
      return $http.delete(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deleteDiscountCard')(e);
      }
    }
    function updateDiscountCard(id, data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/discountCard/' + id;
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateDiscountCard')(e);
      }
    }
    function getDiscountCardById(id) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/discountCard/' + id;
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
    function uploadFrontImageForDiscountCard(id, data) {
         var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/discountCard/' + id + '/frontimage';
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
    function uploadBackImageForDiscountCard(id, data) {
         var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/discountCard/' + id + '/backimage';
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

    //User Api
    function getUsers() {
      return $http.get('https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/users')
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id;
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
    function updateUser(id, data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id;
      return $http.put(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateUser')(e);
      }
    }
    function deleteUser(id) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id;
      return $http.delete(url)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deleteUser')(e);
      }
    } 
    function attachCouponsToUser(id, data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id + '/attachCoupons';
      return $http.put(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for attachCouponToUser')(e);
      }
    }
    function attachDiscountsCardToUser(id, data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id + '/attachDiscountCards';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for attachDiscountCardToUser')(e);
      }
    }
    function deattachCouponsToUser(id, data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id + '/deattachCoupons';
      return $http.put(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deattachCouponsToUser')(e);
      }
    }
    function deattachDiscountsCardToUser(id, data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id + '/deattachDiscountCards';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for deattachDiscountsCardsToUser')(e);
      }
    }
    
  }
})();
