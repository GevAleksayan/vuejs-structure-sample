<template>
    <base-layout :footer="false" main-class="pt-0 px-0">
        <template v-slot:header>
            <span>SafePass</span>
        </template>
        <div id="map" class="map h-100"></div>
    </base-layout>
</template>

<script>
    import BaseLayout from '../../layout/BaseLayout';

    export default {
        name: "Map",
        components: {BaseLayout},
        mounted() {
            const initialPosition = { lat: 59.325, lng: 18.069 };
            const map = this.createMap(initialPosition);
            const marker = this.createMarker(map, initialPosition);

            this.trackLocation(({ coords: { latitude: lat, longitude: lng } }) => {
                    marker.setPosition({ lat, lng });
                    map.panTo({ lat, lng });
                },
                err => alert(`Error: ${this.getPositionErrorMessage(err.code) || err.message}`));
        },
        methods: {
            createMap ({ lat, lng }) {
                return new google.maps.Map(document.getElementById('map'), {
                    center: { lat, lng },
                    zoom: 15,
                    disableDefaultUI: true,
                });
            },
            createMarker (map, position) {
                let square = {
                    path: 'M0,0 18,0 18,18 0,18',
                    strokeColor: '#ff0000',
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    fillColor: '#ff0000',
                    fillOpacity: 0.9,
                    offset: '20%',
                    scale: 1,
                    labelOrigin: new google.maps.Point(9, 9)
                };
                return new google.maps.Marker({
                    map,
                    position,
                    icon: square,
                    label: {
                        color: '#fff',
                        text: '1',
                    },
                });
            },
            trackLocation(onSuccess, onError) {
                if ('geolocation' in navigator === false) {
                    return onError(new Error('Geolocation is not supported by your browser.'));
                }
                return navigator.geolocation.watchPosition(onSuccess, onError, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                });
            },
            getPositionErrorMessage(code) {
                switch (code) {
                    case 1:
                        return 'Permission denied.';
                    case 2:
                        return 'Position unavailable.';
                    case 3:
                        return 'Timeout reached.';
                }
            },
        }
    }
</script>

<style scoped>

</style>