import bbox from '@turf/bbox';

function calculateBounds(bounds, viewport, padding = 50) {
   const [minLng, minLat, maxLng, maxLat] = bounds;
   let newViewState = null;
   try {
      newViewState = viewport.fitBounds(
         [
            [minLng, minLat],
            [maxLng, maxLat],
         ],
         {
            padding: { top: 50, left: 300, right: 50, bottom: 50 },
         }
      );
   } catch (e) {
      newViewState = viewport.fitBounds([
         [minLng, minLat],
         [maxLng, maxLat],
      ]);
   }

   return newViewState;
}

export default calculateBounds;
