import centroid from '@turf/centroid';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import squareGrid from '@turf/square-grid';
import hexGrid from '@turf/hex-grid';
import bbox from '@turf/bbox';
import triangleGrid from '@turf/triangle-grid';
import pointGrid from '@turf/point-grid';
import queryShapeById from '../../functions/queryShapeById';
export default async (req, res) => {
   try {
      const { size: _size, shape, id, level, units } = req.query;
      const geometry = await queryShapeById(id, level);

      const output = [];

      const bounds = bbox(geometry);

      var options = { units: 'kilometers' };

      let grid = null;

      const size = units === 'km' ? _size : _size / 1000;

      if (shape === 'square') {
         grid = squareGrid(bounds, size, options);
      } else if (shape === 'point') {
         grid = pointGrid(bounds, size, options);
      } else if (shape === 'hex') {
         // hex
         grid = hexGrid(bounds, size, options);
      } else {
         //triange
         grid = triangleGrid(bounds, size, options);
      }
      grid.features.forEach((z, i) => {
         const c = centroid(z);

         const within = booleanPointInPolygon(c, geometry);

         if (within) {
            output.push(z);
         }
      });

      if (geometry && output.length === 0) {
         res.json({
            error: true,
            message:
               'Please reduce the cell size amount in order to fit the boundary geometry',
         });
      } else {
         res.statusCode = 200;
         res.json({
            collection: { type: 'FeatureCollection', features: output },
            bounds,
         });
      }
   } catch (e) {
      res.json({
         error: true,
         message:
            'Error with creating the geometry. Please try a different geometry',
      });
   }
};
