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
        <div class="col-md-8">
          <GmapMap
            v-if="curLocation"
            :center="curLocation"
            :zoom="17"
            :options="{
              styles: mapStyles
            }"
            map-type-id="roadmap"
            style="width: 100%; height: 600px"
          >
            <GmapMarker
              :position="curLocation"
              :draggable="true"
              :icon="{url: '/img/cur-marker.png'}"
              @dragend="updateMarker"
            />
          </GmapMap>
        </div>
        <div class="col-md-4">
          <!-- Set location input -->
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-map-marker-alt"></i>
              </span>
            </div>
            <GmapAutocomplete
              class="form-control"
              ref="autocomplete"
              :position.sync="curLocation"
              @keyup.enter="usePlace"
              @place_changed="setPlace"
            ></GmapAutocomplete>
            <!-- <input type="text" class="form-control" placeholder="Current Location"> -->
          </div>
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-flag"></i>
              </span>
            </div>
            <input type="text" class="form-control" placeholder="Destination Location">
          </div>
          <!-- End of set location input -->
          <!-- Price -->
          <div class="row border m-0 price-tag">
            <div class="col">
              <div class="text-center price-counter">15.50 $</div>
              <div class="text-center mb-2 font-weight-bold">CASH</div>
            </div>
          </div>
          <!-- End of price -->
          <button class="btn btn-lg btn-primary-custom btn-block mt-4">Confirm Pickup</button>
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
      curLocation: null,
      curMarker: { position: this.curLocation },
      place: null,
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
          elementType: "geometry",
          stylers: [
            {
              visibility: "off"
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
          stylers: [
            {
              visibility: "off"
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
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#93817c"
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
  computed: {
    google: gmapApi
  },
  methods: {
    getCurLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.curLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
          },
          err => {
            alert(`Error - Code: ${err.code}, Message: ${err.message}`);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    },
    setPlace(event) {
      console.log("setPlace");
      this.place = event;
    },
    usePlace() {
      if (this.place) {
        console.log(this.place);
        let newPosition = {
          lat: this.place.geometry.location.lat(),
          lng: this.place.geometry.location.lng()
        };
        this.curLocation = newPosition;
      }
    },
    updateMarker(event) {
      let geocoder = new this.google.maps.Geocoder();
      geocoder.geocode({ latLng: event.latLng }, (result, status) => {
        if (status === this.google.maps.GeocoderStatus.OK) {
          this.$refs.autocomplete.$refs.input.value =
            result[0].formatted_address;
        }
      });
      this.curLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
    },
    initAutoComplete() {
      console.log(this.google);
      let geocoder = new this.google.maps.Geocoder();
      geocoder.geocode({ latLng: this.curLocation }, (result, status) => {
        if (status === this.google.maps.GeocoderStatus.OK) {
          this.$refs.autocomplete.$refs.input.value =
            result[0].formatted_address;
        }
      });
    }
  },
  created() {
    this.getCurLocation();
    // setTimeout(this.initAutoComplete(), 2000);
  }
};
</script>