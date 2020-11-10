import { SolidPolygonLayer, GeoJsonLayer } from '@deck.gl/layers';

export const theme = {
   globeLandColor: [233, 233, 233],
   globeLineColor: [202, 202, 202],
   globeWaterColor: [196, 196, 196],
   globeContainerBackground: '#D6D6D6',
};
const globe = ({ world }) => {
   return [
      new SolidPolygonLayer({
         id: 'background',
         data: [
            [
               [-180, 90],
               [0, 90],
               [180, 90],
               [180, -90],
               [0, -90],
               [-180, -90],
            ],
         ],
         getPolygon: (d) => d,
         stroked: false,
         filled: true,
         getFillColor: theme.globeWaterColor,
      }),
      new GeoJsonLayer({
         id: 'geojson-layer',
         data: world,
         pickable: false,
         stroked: true,
         filled: true,
         lineWidthMinPixels: 1,
         getFillColor: theme.globeLandColor,
         getLineColor: theme.globeLineColor,
         getLineWidth: 1,
      }),
   ];
};

export default globe;
