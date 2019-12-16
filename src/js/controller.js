var map;
let listaMarcadores = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 10.396108, lng: -75.493935},
        zoom: 15,
        disableDefaultUI: true 
    });
}

var app = new Vue({
    el: '#app',
    data: {
      estaciones: ''
    },
    created: function(){
        fetch('http://192.168.0.37:3000/station')
        .then(res => res.json())
        .then(listaEstaciones => {
            this.estaciones = listaEstaciones;
            listaEstaciones.forEach(estacion => {
                var marker = new google.maps.Marker({
                    position: {lat: estacion.lat, lng: estacion.lng},
                    animation: google.maps.Animation.DROP,
                    title: estacion.nombre
                });
                listaMarcadores.push(marker)
            });

            listaMarcadores.forEach(marcador => {
                marcador.setMap(map);
            })
        })
    }
})