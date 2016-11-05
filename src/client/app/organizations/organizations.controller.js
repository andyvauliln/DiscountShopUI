(function () {
  'use strict';

  angular
    .module('app.organizations')
    .controller('organizationsController', organizationsController);

  organizationsController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function organizationsController($q, dataservice, logger) {
    var vm = this;
    vm.categories = [];
    vm.title = 'organizations';
    vm.gridOptions = {
      enableSorting: true,
      enableFiltering: true,
      columnDefs: [
        { Name: 'Name', field: 'Name' },
        { name: 'Description', field: 'Description' },
        { name: 'KeyWords', field: 'KeyWords' },
        { name: 'TopDate', field: 'TopDate' },
        { name: 'SaleDate', field: 'SaleDate' },
        { name: 'Shops',
             cellTemplate:'<button class="btn primary" ng-click="vm.ShowShops()">Show Shops</button>' },
        { name: 'DiscountCards',
             cellTemplate:'<button class="btn primary" ng-click="grid.ShowDiscountCards()">Show Discount Cards</button>' }
      
      ],
      data: []
    };





    activate();

    function activate() {
    
    function getCategories(){
      
      vm.categories = null;

    }


      var promises = [getOrganizations()];
      return $q.all(promises).then(function () {
        logger.info('Activated organizations View');
      });
    }
    function getOrganizations() {
      vm.gridOptions.data = [
        {
          "Id": 1,
          "Categories": [
            {
              "Id": 1,
              "Name": "Category 1",
              "Description": "Test Category Discription 1"
            },
            {
              "Id": 4,
              "Name": "Category 4",
              "Description": "Test Category Discription 4"
            }
          ],
          "Shops": [],
          "Images": [],
          "DiscountCards": [
            {
              "Id": 5,
              "FrontSideImg": {
                "Id": 6,
                "Name": "Image 6"
              },
              "BackSideImg": {
                "Id": 5,
                "Name": "Image 1"
              },
              "Barcode": "Test Barcode"
            }
          ],
          "Coupons": [],
          "Name": "Organization 1",
          "Description": "Test Description",
          "KeyWords": "Test Key word",
          "NewDate": "2016-10-24T00:21:18.083",
          "TopDate": "2016-10-23T00:21:18.083",
          "SaleDate": "2016-10-24T00:21:18.083",
          "DiscountCardCount": 1
        },
        {
          "Id": 2,
          "Categories": [
            {
              "Id": 2,
              "Name": "Category 2",
              "Description": "Test Category Discription 2"
            },
            {
              "Id": 3,
              "Name": "Category 3",
              "Description": "Test Category Discription 3"
            }
          ],
          "Shops": [],
          "Images": [],
          "DiscountCards": [
            {
              "Id": 3,
              "FrontSideImg": {
                "Id": 4,
                "Name": "Image 5"
              },
              "BackSideImg": {
                "Id": 3,
                "Name": "Image 2"
              },
              "Barcode": "Test Barcode"
            }
          ],
          "Coupons": [],
          "Name": "Organization 2",
          "Description": "Test Description",
          "KeyWords": "Test Key word",
          "NewDate": "2016-10-23T00:21:18.083",
          "TopDate": "2016-10-22T00:21:18.083",
          "SaleDate": "2016-10-23T00:21:18.083",
          "DiscountCardCount": 1
        },
        {
          "Id": 3,
          "Categories": [
            {
              "Id": 1,
              "Name": "Category 1",
              "Description": "Test Category Discription 1"
            },
            {
              "Id": 3,
              "Name": "Category 3",
              "Description": "Test Category Discription 3"
            }
          ],
          "Shops": [],
          "Images": [],
          "DiscountCards": [
            {
              "Id": 1,
              "FrontSideImg": {
                "Id": 2,
                "Name": "Image 4"
              },
              "BackSideImg": {
                "Id": 1,
                "Name": "Image 3"
              },
              "Barcode": "Test Barcode"
            }
          ],
          "Coupons": [],
          "Name": "Organization 3",
          "Description": "Test Description",
          "KeyWords": "Test Key word",
          "NewDate": "2016-10-23T00:21:18.083",
          "TopDate": "2016-10-24T00:21:18.083",
          "SaleDate": "2016-10-22T00:21:18.083",
          "DiscountCardCount": 1
        },
        {
          "Id": 4,
          "Categories": [
            {
              "Id": 4,
              "Name": "Category 4",
              "Description": "Test Category Discription 4"
            },
            {
              "Id": 6,
              "Name": "Category 6",
              "Description": "Test Category Discription 6"
            }
          ],
          "Shops": [
            {
              "Id": 3,
              "Address": "Test Adress 1",
              "Name": "Shop 3",
              "City": "City 1",
              "Phone": "+375294566542",
              "Shedule": "From 2 to 1",
              "Latitude": "36,343224245",
              "Longitude": "67,34342432234"
            },
            {
              "Id": 4,
              "Address": "Test Adress 1",
              "Name": "Shop 4",
              "City": "City 1",
              "Phone": "+375294566542",
              "Shedule": "From 2 to 1",
              "Latitude": "37,343224245",
              "Longitude": "68,34342432234"
            }
          ],
          "Images": [
            {
              "Id": 1,
              "Name": "Image 3"
            },
            {
              "Id": 2,
              "Name": "Image 4"
            }
          ],
          "DiscountCards": [
            {
              "Id": 2,
              "FrontSideImg": {
                "Id": 1,
                "Name": "Image 3"
              },
              "BackSideImg": {
                "Id": 2,
                "Name": "Image 4"
              },
              "Barcode": "Test Barcode"
            }
          ],
          "Coupons": [
            {
              "Id": 1,
              "Image": {
                "Id": 1,
                "Name": "Image 3"
              },
              "Description": "Coupon Description 1",
              "CouponCodes": [
                {
                  "Id": "aeff07c9-d463-432e-9e5f-4e754dc84f3d",
                  "IsActive": true
                },
                {
                  "Id": "8b10649f-ce4f-4ed3-91a5-b6fd0cbd30d6",
                  "IsActive": true
                }
              ]
            },
            {
              "Id": 2,
              "Image": {
                "Id": 2,
                "Name": "Image 4"
              },
              "Description": "Coupon Description 1",
              "CouponCodes": [
                {
                  "Id": "0268b0e1-a3c6-4b5a-93ef-b925beaa342b"
                },
                {
                  "Id": "d4623fc1-a94e-4560-b750-ec245f4b05d7"
                }
              ]
            }
          ],
          "Name": "Organization 4",
          "Description": "Test Description",
          "KeyWords": "Test Key word",
          "NewDate": "2016-10-24T00:21:18.083",
          "TopDate": "2016-10-23T00:21:18.083",
          "SaleDate": "2016-10-24T00:21:18.083",
          "CouponCount": 2,
          "DiscountCardCount": 1
        },
        {
          "Id": 5,
          "Categories": [
            {
              "Id": 1,
              "Name": "Category 1",
              "Description": "Test Category Discription 1"
            },
            {
              "Id": 5,
              "Name": "Category 5",
              "Description": "Test Category Discription 5"
            }
          ],
          "Shops": [
            {
              "Id": 5,
              "Address": "Test Adress 1",
              "Name": "Shop 5",
              "City": "City 1",
              "Phone": "+375294566542",
              "Shedule": "From 2 to 1",
              "Latitude": "38,343224245",
              "Longitude": "69,34342432234"
            },
            {
              "Id": 2,
              "Address": "Test Adress 1",
              "Name": "Shop 2",
              "City": "City 1",
              "Phone": "+375294566542",
              "Shedule": "From 2 to 1",
              "Latitude": "35,343224245",
              "Longitude": "66,34342432234"
            }
          ],
          "Images": [
            {
              "Id": 3,
              "Name": "Image 2"
            },
            {
              "Id": 4,
              "Name": "Image 5"
            }
          ],
          "DiscountCards": [
            {
              "Id": 4,
              "FrontSideImg": {
                "Id": 3,
                "Name": "Image 2"
              },
              "BackSideImg": {
                "Id": 4,
                "Name": "Image 5"
              },
              "Barcode": "Test Barcode"
            }
          ],
          "Coupons": [
            {
              "Id": 3,
              "Image": {
                "Id": 3,
                "Name": "Image 2"
              },
              "Description": "Coupon Description 1",
              "CouponCodes": [
                {
                  "Id": "3e36c1a4-5e84-4b35-9356-38b40acb0b7d",
                  "IsActive": true
                },
                {
                  "Id": "06561e5c-b083-451a-bf56-c3c86f542095",
                  "IsActive": true
                }
              ]
            },
            {
              "Id": 4,
              "Image": {
                "Id": 4,
                "Name": "Image 5"
              },
              "Description": "Coupon Description 1",
              "CouponCodes": [
                {
                  "Id": "77d28ed6-915c-4f20-bd1b-8507cc5b8e94",
                  "IsActive": true
                },
                {
                  "Id": "c08b9b9d-9387-4287-b0a3-ef98b9829827",
                  "IsActive": true
                }
              ]
            }
          ],
          "Name": "Organization 5",
          "Description": "Test Description",
          "KeyWords": "Test Key word",
          "NewDate": "2016-10-19T00:21:18.083",
          "TopDate": "2016-10-23T00:21:18.083",
          "SaleDate": "2016-10-21T00:21:18.083",
          "CouponCount": 2,
          "DiscountCardCount": 1
        },
        {
          "Id": 6,
          "Categories": [
            {
              "Id": 2,
              "Name": "Category 2",
              "Description": "Test Category Discription 2"
            },
            {
              "Id": 3,
              "Name": "Category 3",
              "Description": "Test Category Discription 3"
            }
          ],
          "Shops": [
            {
              "Id": 1,
              "Address": "Test Adress 1",
              "Name": "Shop 1",
              "City": "City 1",
              "Phone": "+375294566542",
              "Shedule": "From 2 to 1",
              "Latitude": "34,343224245",
              "Longitude": "65,34342432234"
            },
            {
              "Id": 6,
              "Address": "Test Adress 1",
              "Name": "Shop 6",
              "City": "City 1",
              "Phone": "+375294566542",
              "Shedule": "From 2 to 1",
              "Latitude": "39,343224245",
              "Longitude": "70,34342432234"
            }
          ],
          "Images": [
            {
              "Id": 5,
              "Name": "Image 1"
            },
            {
              "Id": 6,
              "Name": "Image 6"
            }
          ],
          "DiscountCards": [
            {
              "Id": 6,
              "FrontSideImg": {
                "Id": 5,
                "Name": "Image 1"
              },
              "BackSideImg": {
                "Id": 6,
                "Name": "Image 6"
              },
              "Barcode": "Test Barcode"
            }
          ],
          "Coupons": [
            {
              "Id": 5,
              "Image": {
                "Id": 5,
                "Name": "Image 1"
              },
              "Description": "Coupon Description 1",
              "CouponCodes": [
                {
                  "Id": "9bdf4323-4846-4ade-b838-6f995c51cb9e",
                  "IsActive": true
                },
                {
                  "Id": "b3b5d3f8-2059-4c5e-b0d9-f8d00dc8d4a2",
                  "IsActive": true
                }
              ]
            },
            {
              "Id": 6,
              "Image": {
                "Id": 6,
                "Name": "Image 6"
              },
              "Description": "Coupon Description 1",
              "CouponCodes": [
                {
                  "Id": "64ac75d1-2fe1-4e2f-92ad-0d63bf22d4f1",
                  "IsActive": true
                },
                {
                  "Id": "7f4c516b-f816-400c-9691-f5d91a1af06c",
                  "IsActive": true
                }
              ]
            }
          ],
          "Name": "Organization 6",
          "Description": "Test Description",
          "KeyWords": "Test Key word",
          "NewDate": "2016-10-22T00:21:18.083",
          "TopDate": "2016-10-21T00:21:18.083",
          "SaleDate": "2016-10-23T00:21:18.083",
          "CouponCount": 2,
          "DiscountCardCount": 1
        }
      ];
    }
  }
})();

