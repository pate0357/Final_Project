/**
 * Created by Harsh on 2015-12-13.
 */
angular.module('starter.Searchservice', [])

  .factory('Fetch_product', function($http,$log) {
    return{

      fetch:function(search)
      {

        //console.log(search);
        var getdata =  $http.get("http://api.bestbuy.com/v1/products(search=" +
            search + ")?show=name,sku,salePrice,image&format=json&apiKey=u84vva39twc8daxujwdac4wa")
          .success(function(data)
          {
            console.log(data);
            return data;

          });

        return getdata;

      }
    }
  });

