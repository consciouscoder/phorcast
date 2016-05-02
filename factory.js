(function() {
  angular.module('apiFactory', [])  
    .factory('ipAPIFactory', ipAPIFactory) //['$scope', function($scope){}]
    
    //pokeCtrl.$inject = ['$scope'] // for $scope injection on John Papa style Angular
    ipAPIFactory.$inject = ['$http']  // ['$scope,'$http']
    
    function ipAPIFactory ($http) { //($scope, $http)
        var ipAPI = {}
        ipAPI.getLatLong = function() {

            return $http.get('http://ip-api.com/json')

        }

        return ipAPI

    }
    
}());

