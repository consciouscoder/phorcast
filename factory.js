(function() {
  angular.module('apiFactory', [])  
    .factory('ipAPIFactory', ipAPIFactory) //['$scope', function($scope){}]
    .factory('forecastAPIFactory', forecastAPIFactory) //['$scope', function($scope){}]
    .factory('flickrAPIFactory', flickrAPIFactory)
    .factory('giphyAPIFactory', giphyAPIFactory)

    
    //pokeCtrl.$inject = ['$scope'] // for $scope injection on John Papa style Angular
    ipAPIFactory.$inject = ['$http']  // ['$scope,'$http']
    
    function ipAPIFactory ($http) { //($scope, $http)

        var ipAPI = {}
        var latitude = 0
        var longitude = 0

        ipAPI.returnWeather = function(callback){
            console.log("calling return weather",callback)
            return $http.get('http://ip-api.com/json').then(function(response) {
                latitude = response.data.lat
                longitude = response.data.lon
                return callback(response.data.lat,response.data.lon)
            })
        }

        ipAPI.returnFlickr = function(callback){
            console.log("calling return Flickr: ",callback)
            return $http.get('http://ip-api.com/json').then(function(response) {
                return callback(response.data.lat,response.data.lon)
            })
        }

        ipAPI.getLatLong = function() {
            // return $http.get('http://ip-api.com/json')
            return new Promise(function(fulfill, reject){
                $http.get('http://ip-api.com/json').then(function(response) {

                    console.log('response: ',response)
       
                    fulfill(response.data)

                }, function(error){

                    console.log('error', error)
                    reject(error)

                })
            })
        }

        return ipAPI

    }


    function forecastAPIFactory ($http) {

        var forecastAPI = {}
   

        forecastAPI.getForecast = function(lat, lon) {

                // console.log("calling get forecast", lat, lon)
                var url = "https://api.forecast.io/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/" + lat + "," + lon + "?callback=JSON_CALLBACK"

               return $http.jsonp(url).then(function(response) {

                    // console.log('Forcast response: ',response)
                    return response.data
                })

             
        }

        return forecastAPI
    }   


    //flickr API call
    //URL: https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=532bbe82ed3f5860b6b2c4dc0c939631&tags=rain&lat=40.0481&lon=-105.3842&format=json&nojsoncallback=1&auth_token=72157667719085231-2ecf7abdf9bd5fe7&api_sig=762f19a603688cc767ea4810d32d554c 

    function flickrAPIFactory ($http) {

        var flickrAPI = {}    

        flickrAPI.getImages = function(tag) {

                console.log("calling flickr: ", tag)

                var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=532bbe82ed3f5860b6b2c4dc0c939631&format=json&nojsoncallback=1&tags=" + tag

               return $http.get(url).then(function(response) {

                    console.log('flickr factory response: ',response)
                    return response.data
                })

             
        }

        return flickrAPI
    }  


    function giphyAPIFactory ($http) {

        var giphyAPI = {}    

        giphyAPI.getGIFs = function(term) {

                console.log("calling giphy: ", term)

                var url = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + term

               return $http.get(url).then(function(response) {

                    console.log('giphy factory response: ',response)
                    return response.data
                })

             
        }

        return giphyAPI
    }  


}());




        // forecastAPI.getForecastData = function(lat, lon) {
        //     // var url = "https://api.forecast.io/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/40.0481,-105.3842?callback=JSON_CALLBACK"
        //     //var url = "https://api.forecast.io/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/" + pCtrl.lat + "," + pCtrl.lon + "?callback=JSON_CALLBACK"
        //     // console.log(url)
        //     // var url = "https://api.forecast.io/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/" + lat + "," + lon + "?callback=JSON_CALLBACK"
        //     //  return $http.jsonp(url)


        //     return new Promise(function(fulfill, reject){

        //         var url = "https://api.forecast.io/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/" + lat + "," + lon + "?callback=JSON_CALLBACK"

        //         $http.jsonp(url).then(function(response) {

        //             console.log('Forcast response: ',response)
        //             // console.log(error, response)
        //             // if (!error) {
        //             //     console.log('fulfill')
        //                 fulfill(response.data)
        //             // } else {
        //             //     console.log('reject')
        //             //     reject(error)
        //             // }
        //         }, function(error){
        //             console.log('Forcast error', error)
        //             reject(error)
        //         })
        //     })
             
        // }     


// (function() {
//   angular.module('apiFactory', [])  
//     .factory('forecastAPIFactory', forecastAPIFactory) //['$scope', function($scope){}]
    
//     //pokeCtrl.$inject = ['$scope'] // for $scope injection on John Papa style Angular
//     forecastAPIFactory.$inject = ['$http']  // ['$scope,'$http']


//     function forecastAPIFactory ($http) {

//         var forecastAPI = {}

//         forecastAPI.getDay1 = function() {
//             var url = "https://api.forecast.io/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/40.0481,-105.3842?callback=JSON_CALLBACK"
//             //var url = "https://api.forecast.io/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/" + pCtrl.lat + "," + pCtrl.lon + "?callback=JSON_CALLBACK"
//             // console.log(url)
            
//             http.jsonp(url)
//                         .success(function(data) {

//                 day1 = data.currently

//             }

//             return day1
//         }

//         return forecastAPI
//     }


// }());




    