/**
 * Created by Harsh on 2015-12-13.
 */
angular.module('starter.Logservice', [])

  .factory('Fetch_Error', function() {
    return{

      fetch_Error:function(search)
      {

        console.log(search);
        return true;

      }
    }
  });
