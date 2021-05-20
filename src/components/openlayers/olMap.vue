<template>
  <div id="map" class="map"></div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";

export default {
  name: "olMap",
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: "map",
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
      console.log("init finished");
    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 900px;
}
</style>
