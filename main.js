(function() {
  angular.module('phoreCastApp', ['apiFactory'])  
    .controller('phoreController', phoreCtrl) //['$scope', function($scope){}]
    
    //pokeCtrl.$inject = ['$scope'] // for $scope injection on John Papa style Angular
    phoreCtrl.$inject = ['$scope','$http','ipAPIFactory','forecastAPIFactory','flickrAPIFactory','giphyAPIFactory']  // ['$scope,'$http']
    
    function phoreCtrl ($scope, $http, ipAPIFactory, forecastAPIFactory, flickrAPIFactory, giphyAPIFactory) { //($scope, $http)
        var pCtrl = this

            pCtrl.ioResponse = {}
            pCtrl.firstRun = true

            // Pairing Forecast.io icon values with giphy search strings.
                var searchTerms = {
                    "clear-day": "sun",
                    "clear-night": "stars",
                    "rain": "rain",
                    "snow": "snow",
                    "sleet": "sleet",
                    "wind": "tornado",
                    "fog": "foggy",
                    "cloudy": "clouds",
                    "partly-cloudy-day": "cloudy+sun",
                    "partly-cloudy-night": "clouds+night"
                }

            // Short daily description of the weather
                var dailyDesc = {
                    "clear-day": "Clear & Sunny",
                    "clear-night": "Clear & Starry",
                    "rain": "Rainy",
                    "snow": "Snowy",
                    "sleet": "Sleety",
                    "wind": "Windy",
                    "fog": "Foggy",
                    "cloudy": "Cloudy",
                    "partly-cloudy-day": "Party Cloudy",
                    "partly-cloudy-night": "Cloudy Night"
                }
        

       ipAPIFactory.returnWeather(forecastAPIFactory.getForecast).then(setAPIForcast)

       pCtrl.getCityForecast = function(sCity) {

            var geocoder =  new google.maps.Geocoder()

            // Google Maps Key: AIzaSyB2GJm8JWyDKBwdcdq_xRN-B1Q3KUGTPiQ
            // console.log ('search city: ', sCity)

            sCity = "\'" + sCity + "\'"

            cityObj = {}

            cityObj = { 'address': sCity }

              // geocoder.geocode( { 'address': 'houston' }, function(results, status) {

            geocoder.geocode( cityObj, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                // console.log("Google Maps location : " + results[0].geometry.location.lat() + " " + results[0].geometry.location.lng())
                // console.log("Google Maps formatted_address : " + results[0].formatted_address)  
                pCtrl.cityName = results[0].formatted_address

                    var mapOptions = {
                       zoom: 8,
                       center: results[0].geometry.location,
                       // HYBRID, SATELLITE, ROADMAP, or TERRAIN:
                       mapTypeId: google.maps.MapTypeId.HYBRID
                    }
                    
                    map = new google.maps.Map(document.getElementById("map"), mapOptions)
                    //pCtrl.map = new google.maps.Map(element[0], mapOptions)                    

                    // comment marker for now
                    var marker = new google.maps.Marker({
                       map: map,
                       position: results[0].geometry.location
                    })

              } else {
                console.log("Google MAPS: Something went wrong. " + status)
              }
              // Get Forcast and populate everything =====
              // =========== COMMENTED OUT -- added below
              // if (!pCtrl.cityName) {
                // FIX BACKGROUND BUG
                if (!pCtrl.firstRun) {
                  forecastAPIFactory.getForecast(results[0].geometry.location.lat(), results[0].geometry.location.lng()).then(setAPIForcast)
                } else {
                  pCtrl.firstRun = false
                }
              // }
              // =========================================
            })

       }

            // flickrAPIFactory.getImages('rain').then(function(flickrResponse) {
            //     console.log(flickrResponse)
            // })

            // console.log('Flickr ctrl call: ', flickrAPIFactory.getImages('rain'))

            // console.log('Giphy ctrl call: ', giphyAPIFactory.getGIFs('sunny'))

            // flickrResponse = {}
            // setInterval(function getFlickr() {
            //     flickrResponse = flickrAPIFactory.getImages('rain')
            //     console.log('image ID: ', flickrAPIFactory.getImages('rain'.data.images.image[2].id)
            // }(), 3000)

            // .then(function(response) {
            //     console.log ('Ctrl Flickr: ',response)
            // }}

        // flickrAPIFactory.returnFlickr(flickrAPIFactory.getImages).then(function(response) {
        //     console.log ('Ctrl Flickr: ',response)

        // })

        function getRandomGiphy(myArray) {
            return randomValue = myArray[Math.floor(Math.random() * myArray.length)]
        }

        function getRandomFlickr(myFlickrArray) {
            return randomFlickrValue = myFlickrArray[Math.floor(Math.random() * myFlickrArray.length)]
        }        

        pCtrl.getNewGiphy0 = function(response) {

            response = pCtrl.ioResponse

            console.log('getNewGiphy0: ', response)

            giphyAPIFactory.getGIFs(searchTerms[response.daily.data[0].icon]).then(function(giphyResponse) {
                console.log('getRandomGiphy: ', getRandomGiphy(giphyResponse.data))
                console.log('giphy ctrl: ', giphyResponse)
                pCtrl.day0giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url             
            })
        }

        pCtrl.getNewGiphy1 = function(response) {

            response = pCtrl.ioResponse

            giphyAPIFactory.getGIFs(searchTerms[response.daily.data[1].icon]).then(function(giphyResponse) {
                pCtrl.day1giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            })
        }

        pCtrl.getNewGiphy2 = function(response) {

            response = pCtrl.ioResponse

            giphyAPIFactory.getGIFs(searchTerms[response.daily.data[2].icon]).then(function(giphyResponse) {
                pCtrl.day2giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            })
        }

        pCtrl.getNewGiphy3 = function(response) {

            response = pCtrl.ioResponse

            giphyAPIFactory.getGIFs(searchTerms[response.daily.data[3].icon]).then(function(giphyResponse) {
                pCtrl.day3giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            })
        }

        pCtrl.getNewGiphy4 = function(response) {

            response = pCtrl.ioResponse

            giphyAPIFactory.getGIFs(searchTerms[response.daily.data[4].icon]).then(function(giphyResponse) {
                pCtrl.day4giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            })
        }

        pCtrl.getNewGiphy5 = function(response) {

            response = pCtrl.ioResponse

            giphyAPIFactory.getGIFs(searchTerms[response.daily.data[5].icon]).then(function(giphyResponse) {
                pCtrl.day5giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            })
        }

        pCtrl.getNewGiphy6 = function(response) {

            response = pCtrl.ioResponse

            giphyAPIFactory.getGIFs(searchTerms[response.daily.data[6].icon]).then(function(giphyResponse) {
                pCtrl.day6giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            })
        }



        function setAPIForcast(response) {

            // Only update cityName for first city receive by IP, subsequent updates done in Google MAPS API call
            if (!pCtrl.cityName) {
                //pCtrl.cityName = response.city + ', ' + response.region
                pCtrl.getCityForecast(response.city)
            }

            pCtrl.ioResponse = response

            pCtrl.day0Temp = Math.round(response.currently.temperature)

            //searchTerms[response.daily.data[0].icon]
            //flickrAPIFactory.getImages('rain').then(function(flickrResponse) {
            flickrAPIFactory.getImages(searchTerms[response.daily.data[0].icon]).then(function(flickrResponse) {

                // Flickr image URL building syntax: https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

                pCtrl.flickrBackground = getRandomFlickr(flickrResponse.photos.photo).url_l

                if(!pCtrl.flickrBackground) {
                    pCtrl.flickrBackground = getRandomFlickr(flickrResponse.photos.photo).url_l
                }

                console.log('getRandomFlickr: ' ,getRandomFlickr(flickrResponse.photos.photo))


                // Manually build Flickr image URL =============
                //pCtrl.flickrBackground = 'https://farm' + flickrResponse.photos.photo[0].farm + '.staticflickr.com/' + flickrResponse.photos.photo[0].server +'/' + flickrResponse.photos.photo[0].id + '_' + flickrResponse.photos.photo[0].secret +'.jpg'
                // =============================================

                console.log('flickr background: ', pCtrl.flickrBackground)

                console.log(flickrResponse)
            })

            pCtrl.day0summary = response.daily.data[0].summary
            pCtrl.day0tempMax = Math.round(response.daily.data[0].temperatureMax)
            pCtrl.day0tempMin = Math.round(response.daily.data[0].temperatureMin)

            var skycons = new Skycons({"color": "LightBlue"}) // {"color": "pink"}
            skycons.add("icon0", response.daily.data[0].icon)
            skycons.add("icon1", response.daily.data[1].icon)
            skycons.add("icon2", response.daily.data[2].icon)
            skycons.add("icon3", response.daily.data[3].icon)
            skycons.add("icon4", response.daily.data[4].icon)
            skycons.add("icon5", response.daily.data[5].icon)
            skycons.add("icon6", response.daily.data[6].icon)
            skycons.play()

            var days = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']

            var d0 = new Date(response.daily.data[0].time * 1000)
            var d1 = new Date(response.daily.data[1].time * 1000)
            var d2 = new Date(response.daily.data[2].time * 1000)
            var d3 = new Date(response.daily.data[3].time * 1000)
            var d4 = new Date(response.daily.data[4].time * 1000)
            var d5 = new Date(response.daily.data[5].time * 1000)
            var d6 = new Date(response.daily.data[6].time * 1000)

            // pCtrl.day0month = d0.toLocaleString("en-us", { month: "short" })

            // console.log ('day 0 month short name: ', pCtrl.day0month)

            pCtrl.day0day = days[d0.getDay()] 
            pCtrl.day0date = d0.toLocaleString("en-us", { month: "short" }) + ' ' + d0.getDate() 

            pCtrl.day1day = days[d1.getDay()] 
            pCtrl.day1date = d1.toLocaleString("en-us", { month: "short" }) + ' '  + d1.getDate()

            pCtrl.day2day = days[d2.getDay()] 
            pCtrl.day2date = d2.toLocaleString("en-us", { month: "short" }) + ' '  + d2.getDate() 

            pCtrl.day3day = days[d3.getDay()] 
            pCtrl.day3date = d3.toLocaleString("en-us", { month: "short" }) + ' '  + d3.getDate() 

            pCtrl.day4day = days[d4.getDay()] 
            pCtrl.day4date = d4.toLocaleString("en-us", { month: "short" }) + ' '  + d4.getDate() 

            pCtrl.day5day = days[d5.getDay()] 
            pCtrl.day5date = d5.toLocaleString("en-us", { month: "short" }) + ' '  + d5.getDate() 

            pCtrl.day6day = days[d6.getDay()] 
            pCtrl.day6date = d6.toLocaleString("en-us", { month: "short" }) + ' '  + d6.getDate() 

            pCtrl.day0shortDesc = dailyDesc[response.daily.data[0].icon]
            pCtrl.day1shortDesc = dailyDesc[response.daily.data[1].icon]
            pCtrl.day2shortDesc = dailyDesc[response.daily.data[2].icon]
            pCtrl.day3shortDesc = dailyDesc[response.daily.data[3].icon]
            pCtrl.day4shortDesc = dailyDesc[response.daily.data[4].icon]
            pCtrl.day5shortDesc = dailyDesc[response.daily.data[5].icon]
            pCtrl.day6shortDesc = dailyDesc[response.daily.data[6].icon]

            pCtrl.day1summary = response.daily.data[1].summary
            pCtrl.day1tempMax = Math.round(response.daily.data[1].temperatureMax)
            pCtrl.day1tempMin = Math.round(response.daily.data[1].temperatureMin)

            //console.log(searchTerms[response.daily.data[0].icon])
            // function getRandomGiphy(myArray) {
            //     return randomValue = myArray[Math.floor(Math.random() * myArray.length)]
            // }

            pCtrl.getNewGiphy0(response)
            pCtrl.getNewGiphy1(response)
            pCtrl.getNewGiphy2(response)
            pCtrl.getNewGiphy3(response)
            pCtrl.getNewGiphy4(response)
            pCtrl.getNewGiphy5(response)
            pCtrl.getNewGiphy6(response)

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

       }

    }
    
}());

            // giphyAPIFactory.getGIFs(searchTerms[response.daily.data[0].icon]).then(function(giphyResponse) {
            //     console.log('getRandomGiphy: ', getRandomGiphy(giphyResponse.data))
            //     console.log('giphy ctrl: ', giphyResponse)
            //     pCtrl.day0giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            //     //pCtrl.day0giphy = giphyResponse.data[0].images.fixed_width.url                
            // })

            // giphyAPIFactory.getGIFs(searchTerms[response.daily.data[1].icon]).then(function(giphyResponse) {
            //     //console.log('giphy ctrl: ', giphyResponse)
            //     pCtrl.day1giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            // })

            // giphyAPIFactory.getGIFs(searchTerms[response.daily.data[2].icon]).then(function(giphyResponse) {
            //     //console.log('giphy ctrl: ', giphyResponse)
            //     pCtrl.day2giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            // })

            // giphyAPIFactory.getGIFs(searchTerms[response.daily.data[3].icon]).then(function(giphyResponse) {
            //     //console.log('giphy ctrl: ', giphyResponse)
            //     pCtrl.day3giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            // })

            // giphyAPIFactory.getGIFs(searchTerms[response.daily.data[4].icon]).then(function(giphyResponse) {
            //     //console.log('giphy ctrl: ', giphyResponse)
            //     pCtrl.day4giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            // })

            // giphyAPIFactory.getGIFs(searchTerms[response.daily.data[5].icon]).then(function(giphyResponse) {
            //     //console.log('giphy ctrl: ', giphyResponse)
            //     pCtrl.day5giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            // })

            // giphyAPIFactory.getGIFs(searchTerms[response.daily.data[6].icon]).then(function(giphyResponse) {
            //     //console.log('giphy ctrl: ', giphyResponse)
            //     pCtrl.day6giphy = getRandomGiphy(giphyResponse.data).images.fixed_width.url
            // })


            // giphyAPIFactory.getGIFs('sunny').then(function(giphyResponse) {
            //     console.log('giphy ctrl: ', giphyResponse)
            // })




