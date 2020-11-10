import { useState, useEffect, useMemo } from 'react';
import { WebMercatorViewport } from '@deck.gl/core';
const useViewport = (viewState) => {
   const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

   function calculateDimensions() {
      const height = window.innerHeight;
      const width = window.innerWidth;
      setDimensions({
         height,
         width,
      });
   }

   const viewport = useMemo(
      () =>
         new WebMercatorViewport({
            ...viewState,
            width: dimensions.width,
            height: dimensions.height,
         }),
      [viewState, dimensions]
   );

   useEffect(() => {
      window.addEventListener('resize', calculateDimensions);
      calculateDimensions();
      return () => window.removeEventListener('resize', calculateDimensions);
   }, []);

   return viewport;
};

export default useViewport;
