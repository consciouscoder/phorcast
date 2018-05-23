Phorcast

# phorcast - http://phorcast.dan.earth
AngularJS Weather API mash-up of Forecast.io, Flickr, IP API, Google API, and a GIPHY that relates to the weather

Phorcast is a 7-day weather forecast with a bit GIPHY humor for each day. 

Phorcast pulls in data from 5 different APIs and displays it synergistically. 

1) Phorcast pulls in the IP address of the visitors and defaults to the city location for the IP address
2) Phorcast sets the Google Maps to the longitude and latitude of the IP address
3) Phorcast pulls the current weather data and forecasted data for the longitude and latitude from Forecast.io
4) Phorcast displays the weather forecast for the 7 days with a corresponding GIPHY for each day based on it’s weather
5) Phorcast pulls in a new background image from Flickr API based on the current weather for the current day 
