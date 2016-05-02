(function() {
  angular.module('phoreCastApp', ['apiFactory'])  
    .controller('phoreController', phoreCtrl) //['$scope', function($scope){}]
    
    //pokeCtrl.$inject = ['$scope'] // for $scope injection on John Papa style Angular
    phoreCtrl.$inject = ['$scope','$http','ipAPIFactory']  // ['$scope,'$http']
    
    function phoreCtrl ($scope, $http, ipAPIFactory) { //($scope, $http)
        var pCtrl = this
        
   
            ipAPIFactory.getLatLong()
                .then(function(response) {
                    
                    pCtrl.data = response
                    pCtrl.lat = response.data.lat
                    pCtrl.lon = response.data.lon
                    
                    // lat = response.data.lat
                    // lon = response.data.lon
                    console.log('IP API: ', response)    
                    
                    console.log(pCtrl.lat, pCtrl.lon)

                })
                
            
            var url = "https://api.forecast.io/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/40.0481,-105.3842?callback=JSON_CALLBACK"
            //var url = "https://api.forecast.io/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/" + pCtrl.lat + "," + pCtrl.lon + "?callback=JSON_CALLBACK"

            console.log(url)
            
            $http.jsonp(url)
                .success(function(data) {
                    console.log('data: ', data)
                    console.log('Today: ' + data.daily.data[0].summary)
                    console.log('Today current temp: ' + data.currently.temperature)
                    console.log('Today temp high: ' + data.daily.data[0].temperatureMax) 
                    console.log('Today temp low: ' + data.daily.data[0].temperatureMin)                                                    
                    console.log('Tomorrow: ' + data.daily.data[1].summary)                    
                })         
                

            // $http.get('https://api.forecast.io/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/40.0481,-105.3842')
            // //$http.get('https://pokeapi.co/api/v2/pokemon/1')            
            //     .then(function(response){
                    
            //         console.log('Forecast.io: ', response)
  
            //     })            
        
        // LOOK INTO PROMISES -- USEFUL

    }
    
}());

