<template>
  <!-- BOOK CAR SECTION -->
  <section id="book-car">
    <!-- Title -->
    <div class="container my-5">
      <div class="row">
        <div class="col">
          <div class="page-sub-title text-center">
            <h2 class>Book A Car</h2>
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
            <GmapMarker
              v-if="desPosition"
              :position="desPosition"
              :draggable="true"
              :icon="{url: '/img/des-marker.png'}"
              @dragend="setDesAutocomplete"
            />
          </GmapMap>
        </div>
        <div class="col-md-5">
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
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-flag"></i>
              </span>
            </div>
            <GmapAutocomplete
              class="form-control"
              ref="desAutocomplete"
              :bounds="google && new google.maps.LatLngBounds(
                          new google.maps.LatLng(curPosition.lat, curPosition.lng))"
              @place_changed="setDesMarker"
            ></GmapAutocomplete>
          </div>
          <!-- End of set location input -->
          <!-- Price -->
          <div class="row border m-0 price-tag">
            <transition
              enter-active-class="animated fadeIn faster"
              leave-active-class="animated fadeOut faster"
              mode="out-in"
            >
              <div class="col-md-12" v-if="priceStatus === 'calculated' " key="calculated">
                <div class="text-center price-counter">{{price}} $</div>
                <div class="text-center mb-2 font-weight-bold">
                  <span class="mr-3">
                    <i class="fas fa-route mr-1"></i>
                    {{distance}}
                  </span>
                  <span>
                    <i class="far fa-clock"></i>
                    {{duration}}
                  </span>
                </div>
              </div>
              <div class="col-md-12" v-if="priceStatus === 'calculating'" key="calculating">
                <div class="text-center price-counter">&nbsp;</div>
                <div class="text-center mb-2 font-weight-bold">&nbsp;</div>
                <div class="loader-wrapper">
                  <div class="loader"></div>
                </div>
              </div>
            </transition>
          </div>

          <!-- End of price -->
          <button class="btn btn-lg btn-primary-custom btn-block mt-4">Confirm Pickup</button>
        </div>
      </div>
      <!-- End of content -->
      <button class="btn btn-primary-custom" @click="priceStatus = 'calculated' "></button>
      <button class="btn btn-primary-custom" @click="priceStatus = 'calculating' "></button>
    </div>
  </section>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import axios from "axios";
export default {
  data() {
    return {
      initPosition: { lat: 10, lng: 10 },
      curPosition: null,
      desPosition: null,
      curMarker: { position: this.curPosition },
      desMarker: { position: this.desPosition },
      priceStatus: "init",
      price: 0,
      distance: 0,
      duration: 0,
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
              color: "#dfd2ae"
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
              visibility: "off"
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
    curPosition(value) {
      this.curPosition = value;

      if (this.desPosition) {
        this.setBounds();
        this.fetchDistance();
      }
    },
    desPosition(value) {
      this.desPosition = value;

      this.setBounds();
      this.fetchDistance();
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
    setDesMarker(event) {
      if (event.geometry) {
        this.desPosition = {
          lat: event.geometry.location.lat(),
          lng: event.geometry.location.lng()
        };
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
    setDesAutocomplete(event) {
      let geocoder = new this.google.maps.Geocoder();
      geocoder.geocode({ latLng: event.latLng }, (result, status) => {
        if (status === this.google.maps.GeocoderStatus.OK) {
          this.$refs.desAutocomplete.$refs.input.value =
            result[0].formatted_address;
        }
      });
      this.desPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    },

    setBounds() {
      let bounds = new this.google.maps.LatLngBounds();
      let loc;
      loc = new this.google.maps.LatLng(
        this.curPosition.lat,
        this.curPosition.lng
      );
      bounds.extend(loc);
      loc = new this.google.maps.LatLng(
        this.desPosition.lat,
        this.desPosition.lng
      );
      bounds.extend(loc);

      // Auto zoom & center
      this.$refs.map.fitBounds(bounds);
      this.$refs.map.panToBounds(bounds);
    },

    fetchDistance() {
      this.priceStatus = "calculating";
      axios
        .post("/rider/distance", {
          curPosition: this.curPosition,
          desPosition: this.desPosition
        })
        .then(res => {
          this.price =
            (
              Math.round(
                (res.data.distance.value / 1000) * 2 * Math.pow(10, 2)
              ) / Math.pow(10, 2)
            ).toFixed(1) + "0";
          this.distance = res.data.distance.text;
          this.duration = res.data.duration.text;
          this.priceStatus = "calculated";
        })
        .catch(err => {
          console.log(err.response.data);
        });
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
  }
};
</script>

<style>
.loader-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.loader {
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 100px;
  height: 100px;
  margin: -50px 0 0 -50px;
  border-radius: 50% !important;
  border: 3px solid transparent;
  border-top-color: #63a599;
  -webkit-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
  animation: spin 2s linear infinite;
}

.loader:before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #63a599;
  -webkit-animation: spin 3s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
  animation: spin 3s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}

.loader:after {
  content: "";
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #63a599;
  -webkit-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
  animation: spin 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg); /* IE 9 */
    transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
  }
  100% {
    -webkit-transform: rotate(360deg); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(360deg); /* IE 9 */
    transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(0deg); /* IE 9 */
    transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
  }
  100% {
    -webkit-transform: rotate(360deg); /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: rotate(360deg); /* IE 9 */
    transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>