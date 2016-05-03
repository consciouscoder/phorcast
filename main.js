(function() {
  angular.module('phoreCastApp', ['apiFactory'])  
    .controller('phoreController', phoreCtrl) //['$scope', function($scope){}]
    
    //pokeCtrl.$inject = ['$scope'] // for $scope injection on John Papa style Angular
    phoreCtrl.$inject = ['$scope','$http','ipAPIFactory','forecastAPIFactory']  // ['$scope,'$http']
    
    function phoreCtrl ($scope, $http, ipAPIFactory, forecastAPIFactory) { //($scope, $http)
        var pCtrl = this

        pCtrl.name = "Test"
        

       ipAPIFactory.returnWeather(forecastAPIFactory.getForecast).then(function(response){
            pCtrl.currentWeather = response

            pCtrl.day0Temp = Math.round(response.currently.temperature)

            pCtrl.day0summary = response.daily.data[0].summary
            pCtrl.day0tempMax = Math.round(response.daily.data[0].temperatureMax)
            pCtrl.day0tempMin = Math.round(response.daily.data[0].temperatureMin)

            var skycons = new Skycons({"color": "pink"})
            skycons.add("icon0", response.daily.data[0].icon)
            skycons.add("icon1", response.daily.data[1].icon)
            skycons.add("icon2", response.daily.data[2].icon)
            skycons.add("icon3", response.daily.data[3].icon)
            skycons.add("icon4", response.daily.data[4].icon)
            skycons.add("icon5", response.daily.data[5].icon)
            skycons.add("icon6", response.daily.data[6].icon)
            skycons.play()

            var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

            var d0 = new Date(response.daily.data[0].time * 1000)
            var d1 = new Date(response.daily.data[1].time * 1000)
            var d2 = new Date(response.daily.data[2].time * 1000)
            var d3 = new Date(response.daily.data[3].time * 1000)
            var d4 = new Date(response.daily.data[4].time * 1000)
            var d5 = new Date(response.daily.data[5].time * 1000)
            var d6 = new Date(response.daily.data[6].time * 1000)


            pCtrl.day0day = days[d0.getDay()] 
            pCtrl.day0date = d0.getMonth()+1 + '/' + d0.getDate() 

            pCtrl.day1day = days[d1.getDay()] 
            pCtrl.day1date = d1.getMonth()+1 + '/' + d1.getDate()

            pCtrl.day2day = days[d2.getDay()] 
            pCtrl.day2date = d2.getMonth()+1 + '/' + d2.getDate() 

            pCtrl.day3day = days[d3.getDay()] 
            pCtrl.day3date = d3.getMonth()+1 + '/' + d3.getDate() 

            pCtrl.day4day = days[d4.getDay()] 
            pCtrl.day4date = d4.getMonth()+1 + '/' + d4.getDate() 

            pCtrl.day5day = days[d5.getDay()] 
            pCtrl.day5date = d5.getMonth()+1 + '/' + d5.getDate() 

            pCtrl.day6day = days[d6.getDay()] 
            pCtrl.day6date = d6.getMonth()+1 + '/' + d6.getDate() 
            


            // console.log('d0: ', days[d0.getDay()] + ', ' + d0.getMonth()+1 + '/' + d0.getDate())
            // console.log('d1: ', d1.getMonth()+1 + '/' + d1.getDate())
            // console.log('d2: ', d2.getMonth()+1 + '/' + d2.getDate())
            // console.log('d3: ', d3.getMonth()+1 + '/' + d3.getDate())
            // console.log('d4: ', d4.getMonth()+1 + '/' + d4.getDate())
            // console.log('d5: ', d5.getMonth()+1 + '/' + d5.getDate())
            // console.log('d6: ', d6.getMonth()+1 + '/' + d6.getDate())

            pCtrl.day1summary = response.daily.data[1].summary
            pCtrl.day1tempMax = Math.round(response.daily.data[1].temperatureMax)
            pCtrl.day1tempMin = Math.round(response.daily.data[1].temperatureMin)

            pCtrl.day2summary = response.daily.data[2].summary
            pCtrl.day2tempMax = Math.round(response.daily.data[2].temperatureMax)
            pCtrl.day2tempMin = Math.round(response.daily.data[2].temperatureMin)

            pCtrl.day3summary = response.daily.data[3].summary          
            pCtrl.day3tempMax = Math.round(response.daily.data[3].temperatureMax)
            pCtrl.day3tempMin = Math.round(response.daily.data[3].temperatureMin)

            pCtrl.day4summary = response.daily.data[4].summary     
            pCtrl.day4tempMax = Math.round(response.daily.data[4].temperatureMax)
            pCtrl.day4tempMin = Math.round(response.daily.data[4].temperatureMin)

            pCtrl.day5summary = response.daily.data[5].summary             
            pCtrl.day5tempMax = Math.round(response.daily.data[5].temperatureMax)
            pCtrl.day5tempMin = Math.round(response.daily.data[5].temperatureMin)

            pCtrl.day6summary = response.daily.data[6].summary                 
            pCtrl.day6tempMax = Math.round(response.daily.data[6].temperatureMax)
            pCtrl.day6tempMin = Math.round(response.daily.data[6].temperatureMin)

            console.log("from factory",response)
       })

            // var p = new Promise(function(resolve, reject) {  
            //    if (/* condition */) {
            //       resolve(/* value */);  // fulfilled successfully
            //    }
            //    else {
            //       reject(/* reason */);  // error, rejected
            //    }
            // });


            // console.log(forecastAPIFactory)
            
   
            // ipAPIFactory.getLatLong()
            //     .then(function(response) {

            //         // return response
                    
                    // pCtrl.data = response
                    // pCtrl.lat = response.data.lat
                    // pCtrl.lon = response.data.lon
                    
                    // // lat = response.data.lat
                    // // lon = response.data.lon
                    // console.log('IP API: ', response)    

                    // forecastAPIFactory.getForecastData(response.lat, response.lon)
                    //     .then(function(res) {

                    //         console.log('forecast with LatLong ', res)
                    //         pCtrl.currentWeather = res.currently
                    //         console.log('pCtrl currentWeather: ', pCtrl.currentWeather)
                    //         // pCtrl.weekly = res.data.daily.data
                    //     })
                    
                    // console.log(pCtrl.lat, pCtrl.lon)

                // }, function(error){
                //     console.log('IP API error', error)
                // })

                // .then(function(response)) {

                // }



                
            
            // var url = "https://api.forecast.io/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/40.0481,-105.3842?callback=JSON_CALLBACK"
            // //var url = "https://api.forecast.io/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/" + pCtrl.lat + "," + pCtrl.lon + "?callback=JSON_CALLBACK"

            // console.log(url)
            
            // $http.jsonp(url)
            //     .success(function(data) {
            //         console.log('current day data: ', data.currently)
            //         console.log('Today: ' + data.daily.data[0].summary)
            //         console.log('Today current temp: ' + data.currently.temperature)
            //         console.log('Today temp high: ' + data.daily.data[0].temperatureMax) 
            //         console.log('Today temp low: ' + data.daily.data[0].temperatureMin)                                                    
            //         console.log('Tomorrow: ' + data.daily.data[1].summary)       
            //         console.log('All data: ', data.currently)             
            //     })         
                
      
        
        // LOOK INTO PROMISES -- USEFUL

    }
    
}());

