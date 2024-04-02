mapboxgl.accessToken =  maptoken; 
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12', // You can use any Mapbox style here
    center:  [30, 15],
    zoom: 9 // Zoom level
});



// map.addControl(new MapboxStreetview({
//     position: 'top-right' // Adjust the position of the street view control
// }));
