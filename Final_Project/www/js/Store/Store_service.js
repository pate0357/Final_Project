/**
 * Created by Harsh on 2015-12-13.
 */

angular.module('starter.Storeservice', [])

  .factory('Fetch_Locatation', function($cordovaGeolocation,$http) {
    return{

      //find the store by default location.
      fetchdefault_location:function(lat,long)
      {
        var get_defaultlocation=$http.get("http://api.bestbuy.com/v1/stores(area(" +
            lat + ","+long+",100))?format=json&apiKey=u84vva39twc8daxujwdac4wa")
          .success(function(data)
          {
           return data;
          });
        return  get_defaultlocation;
      },

      //find the store by city name.
      fetchcity:function(city)
      {
        var get_city=$http.get("https://api.bestbuy.com/v1/stores(city=" +city+")?format=json&apiKey=u84vva39twc8daxujwdac4wa")
          .success(function(data)
          {
            return data;
          });

          return get_city;

      }
    }
  });
