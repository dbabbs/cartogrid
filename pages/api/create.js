import centroid from '@turf/centroid';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import squareGrid from '@turf/square-grid';
import hexGrid from '@turf/hex-grid';
import bbox from '@turf/bbox';
import triangleGrid from '@turf/triangle-grid';
import pointGrid from '@turf/point-grid';
import queryShapeById from '../../functions/queryShapeById';
import calculateArea from '@turf/area';
export default async (req, res) => {
   // try {
   const { size: _size, shape, id, level, units } = req.query;

   if (
      id === 'NT_Ya5FK7rlnK5m6PEDf7BwfA' ||
      id === 'NT_YNyDRrNT727bvYdjC-oR1C' ||
      id === 'NT_jhhTwSLmSRweTGoDKjeSWC'
   ) {
      res.json({
         error: true,
         type: 'error',
         message:
            'This geometry is currently unavailable. Please try a different geometry.',
      });
      return;
   }
   const geometry = await queryShapeById(id, level);


   const area = geometry ? calculateArea(geometry) / 1000 : 0; //meters

   const output = [];

   const bounds = geometry ? bbox(geometry) : [-150, -80, 150, 80];

   var options = { units: 'kilometers' };

   let grid = null;

   const size = units === 'km' ? _size : _size / 1000;

   if (area / size > 500000000) {
      res.json({
         error: true,
         type: 'warn',
         message: 'Please increase the bin size for this geometry.',
      });
      return;
   }

   if (!geometry) {
      res.json({
         error: true,
         type: 'error',
         message:
            'This geometry is currently unavailable. Please try a different geometry.',
      });
      return;
   }

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
         type: 'warn',
         message:
            'Please reduce the bin size amount in order to fit the boundary geometry.',
      });
   } else {
      res.statusCode = 200;
      res.json({
         collection: { type: 'FeatureCollection', features: output },

         bounds,
      });
   }
   // } catch (e) {
   //    res.json({
   //       error: true,
   //       type: 'error',
   //       message:
   //          'Error with creating the geometry. Please try a different geometry.',
   //    });
   // }
};

// export default async (req, res) => {
//    // try {
//    const { size: _size, shape, id, level, units } = req.query;
//    const geometry = await queryShapeById(id, level);

//    const area = calculateArea(geometry) / 1000

//    const output = [];

//    // const bounds = geometry ? bbox(geometry) : [-150, -80, 150, 80];
//    //[minX, minY, maxX, maxY]
//    const bounds =  [-170, -80, 170, 80]
//    console.log(bounds);

//    var options = { units: 'kilometers' };

//    let grid = null;

//    const size = units === 'km' ? _size : _size / 1000;

//    if (shape === 'square') {
//       grid = squareGrid(bounds, size, options);
//    } else if (shape === 'point') {
//       grid = pointGrid(bounds, size, options);
//    } else if (shape === 'hex') {
//       // hex
//       grid = hexGrid(bounds, size, options);
//    } else {
//       //triange
//       grid = triangleGrid(bounds, size, options);
//    }

//    console.log(grid.features.length);
//    grid.features.forEach((z, i) => {
//       const c = centroid(z);
//       const within = booleanPointInPolygon(c, geometry);
//       if (within) {
//          output.push(z);
//       }
//    });

//    res.json({
//       collection: { type: 'FeatureCollection', features: output },
//       // collection: grid,
//       bounds,
//    });
// };
