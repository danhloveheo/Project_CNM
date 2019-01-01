<template>
  <section id="driver-init">
    <!-- Title -->
    <div class="container my-5">
      <div class="row">
        <div class="col">
          <div class="page-sub-title text-center">
            <h2 class>Driver</h2>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <!-- End of Title -->
      <!-- Content -->
      <div class="row mt-5">
        <div class="col-md-7">
          <GmapMap
            ref="map"
            v-if="curPosition"
            :center="initPosition"
            :zoom="17"
            :options="{
              disableDefaultUI: true,
              styles: mapStyles
            }"
            map-type-id="roadmap"
            style="width: 100%; height: 500px"
          >
            <GmapMarker
              :position="curPosition"
              :draggable="true"
              :icon="{url: '/img/cur-marker.png'}"
              @dragend="setCurAutocomplete"
            />
          </GmapMap>
        </div>
        <div class="col-md-5">
          <!-- Status switch -->
          <div class="row mr-0">
            <!-- prettier-ignore-attribute -->
            <toggle-button
              :color="{
            checked: '#63a599',
            unchecked: '#db5959'
            }"
              :labels="{
            checked: 'Available',
            unchecked: 'Busy'
            }"
              :width="130"
              :height="40"
              class="mb-4 ml-auto"
              :fontSize="15"
              v-model="driverStatus"
            />
          </div>
          <!-- End of status switch -->
          <!-- Set location input -->
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-map-marker-alt"></i>
              </span>
            </div>
            <GmapAutocomplete
              class="form-control"
              ref="curAutocomplete"
              :bounds="google && new google.maps.LatLngBounds(
                          new google.maps.LatLng(curPosition.lat, curPosition.lng))"
              @place_changed="setCurMarker"
            ></GmapAutocomplete>
          </div>
          <!-- End of set location input -->
        </div>
      </div>
      <!-- End of content -->
    </div>
  </section>
</template>

<script>
import { gmapApi } from "vue2-google-maps";

export default {
  data() {
    return {
      initPosition: { lat: 10, lng: 10 },
      curPosition: null,
      curMarker: { position: this.curPosition },
      driverStatus: true,
      mapStyles: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#ebe3cd"
            }
          ]
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#523735"
            }
          ]
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#f5f1e6"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#c9b2a6"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#dcd2be"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#ae9e90"
            }
          ]
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.text",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#93817c"
            }
          ]
        },
        {
          featureType: "poi.business",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#a5b076"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#447530"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f1e6"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            {
              color: "#fdfcf8"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#f8c967"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#e9bc62"
            }
          ]
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry",
          stylers: [
            {
              color: "#e98d58"
            }
          ]
        },
        {
          featureType: "road.highway.controlled_access",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#db8555"
            }
          ]
        },
        {
          featureType: "road.local",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#806b63"
            }
          ]
        },
        {
          featureType: "transit",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "transit.line",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae"
            }
          ]
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#8f7d77"
            }
          ]
        },
        {
          featureType: "transit.line",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#ebe3cd"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              color: "#dfd2ae"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#b9d3c2"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#92998d"
            }
          ]
        }
      ]
    };
  },
  watch: {
    driverStatus(value) {
      this.driverStatus = value;
      if (value) {
        this.$socket.emit("driverAvailable");
      } else {
        this.$socket.emit("driverBusy");
      }
    }
  },
  computed: {
    google: gmapApi
  },
  methods: {
    setCurMarker(event) {
      if (event.geometry) {
        this.curPosition = {
          lat: event.geometry.location.lat(),
          lng: event.geometry.location.lng()
        };

        if (!this.desPosition) {
          this.initPosition = this.curPosition;
        }
      }
    },
    setCurAutocomplete(event) {
      let geocoder = new this.google.maps.Geocoder();
      geocoder.geocode({ latLng: event.latLng }, (result, status) => {
        if (status === this.google.maps.GeocoderStatus.OK) {
          this.$refs.curAutocomplete.$refs.input.value =
            result[0].formatted_address;
        }
      });
      this.curPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    },
    initAutocomplete() {
      if (navigator.geolocation) {
        // Lấy vị trí hiện tại
        navigator.geolocation.getCurrentPosition(
          position => {
            this.curPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.initPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            // Thực hiện sau khi đã load xong Google API
            this.$gmapApiPromiseLazy().then(() => {
              let latLng = new this.google.maps.LatLng(
                this.curPosition.lat,
                this.curPosition.lng
              );

              // Lấy địa chỉ tại curPosition
              let geocoder = new this.google.maps.Geocoder();
              geocoder.geocode({ latLng }, (result, status) => {
                if (status === this.google.maps.GeocoderStatus.OK) {
                  this.$refs.curAutocomplete.$refs.input.value =
                    result[0].formatted_address;
                }
              });
            });
          },
          err => {
            alert(`Error - Code: ${err.code}, Message: ${err.message}`);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  },
  created() {
    this.initAutocomplete();

    this.$socket.emit("driverInit", {
      curPosition: this.curPosition
    });
  }
};
</script>

<style>
.v-switch-core {
  border-radius: 20px !important;
}

.v-switch-button {
  border-radius: 100% !important;
}
</style>
