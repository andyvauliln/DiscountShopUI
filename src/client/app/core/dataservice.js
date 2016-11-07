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
      deattachDiscountCardsToUser : deattachDiscountsCardsToUser,

      //Coupon Api
      getCoupons: getCoupons,
      getCouponById : getCouponById,
      updateCoupons : updateCoupons,
      removeCoupons : removeCoupons,
      uploadImageForCoupon : uploadImageForCoupon,
      attachCouponCodes : attachCouponCodes,
      deattachCouponCodes : deattachCouponCodes,

      //CouponCodes Api
      getCouponCodes: getCouponCodes,
      getCouponCodeById : getCouponCodeById,
      removeCouponCodes : removeCouponCodes,
      generateCouponCodes : generateCouponCodes,
      deactivateCouponCodes : deactivateCouponCodes,
     

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
    function updateOrganizations(data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/organizations/';
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
    function updateUsers(data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/users';
      return $http.post(url, data)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for updateUsers')(e);
      }
    }
    function removeUsers(data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/remove-users';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id + '/attach-coupons';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id + '/attach-discountcards';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id + '/deattach-coupons';
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
    function deattachDiscountCardsToUser(id, data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id + '/deattach-discountcards';
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
      return $http.get('https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/coupons')
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
    function updateCoupons(data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/coupons';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/remove-coupons';
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
    function attachCouponCodes(id, data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id + '/attach-couponcodes';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/user/' + id + '/deattach-couponcodes';
      return $http.put(url, data)
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
      return $http.get('https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/couponcodes')
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/couponcode/' + id;
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/remove-couponcodes';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/generate-couponcodes/' + count;
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/generate-couponcodes/' + count;
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
      return $http.get('https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/discountcards')
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/discountcard/' + id;
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/discountcards';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/remove-discountcards';
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
         var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/discountcard/' + id + '/upload-frontimage';
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
         var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/discountcard/' + id + '/upload-backimage';
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

     //Shop Api
    function getShops() {
      return $http.get('https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/shops')
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
    function updateShops(data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/shops';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/remove-shops';
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
      return $http.get('https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/categories')
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
    function updateCategories(data) {
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/categories';
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
       var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/remove-categories';
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
    function removeImages(id) {
      var url = 'https://microsoft-apiapp1388a9dfa4b24c2aa3e986923ccc5d56.azurewebsites.net/api/remove-images';
      return $http.post(url)
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
