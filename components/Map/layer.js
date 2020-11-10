import { GeoJsonLayer } from '@deck.gl/layers';

const layer = ({ data, size }) => {
   return new GeoJsonLayer({
      id: 'geojson-layer',
      data,
      pickable: true,
      stroked: true,
      filled: true,
      extruded: false,
      lineWidthScale: 1,
      lineWidthMinPixels: 1,
      lineWidthMaxPixels: 2,
      getFillColor: [0, 0, 0],
      getLineColor: (d) => [255, 255, 255],
      getRadius: (size / 2) * 1000,
      pointRadiusUnits: 'meters',
      getLineWidth: 1,
      pointRadiusMinPixels: 1,
   });
};

export default layer;
