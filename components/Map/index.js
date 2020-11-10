import React, { useState, useMemo, useEffect } from 'react';
import { SolidPolygonLayer } from '@deck.gl/layers';
import { _GlobeView as GlobeView, OrthographicView } from '@deck.gl/core';
import { FlyToInterpolator } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';

import styles from './index.module.scss';
import layer from './layer';
import useViewport from '../../hooks/useViewport';
import calculateBounds from './functions/calculateBounds';
import { Spinner } from 'baseui/spinner';
import { StaticMap } from 'react-map-gl';
const Map = ({ collection, bounds, size, loading, mapVisible }) => {
   const [viewState, setViewState] = useState({
      latitude: 1.7031799208128016,
      longitude: 17.54684579848662,
      zoom: 0,
      // target: [1.7, 17, 0],
   });

   const layers = [
      // new SolidPolygonLayer({
      //    id: 'background',
      //    data: [
      //       [
      //          [-180, 90],
      //          [0, 90],
      //          [180, 90],
      //          [180, -90],
      //          [0, -90],
      //          [-180, -90],
      //       ],
      //    ],
      //    getPolygon: (d) => d,
      //    stroked: false,
      //    filled: true,
      //    getFillColor: [230, 230, 230],
      // }),
      layer({ data: collection, size }),
   ];

   const viewport = useViewport(viewState);

   useEffect(() => {
      if (bounds.length === 4 && !bounds.includes(null)) {
         const newViewState = calculateBounds(bounds, viewport);
         setViewState({
            ...newViewState,
            transitionInterpolator: new FlyToInterpolator(),
            transitionDuration: 1000,
         });
      }
   }, [bounds]);

   return (
      <div className={styles.map}>
         {loading && (
            <div className={styles['spinner-container']}>
               <Spinner />
            </div>
         )}

         <DeckGL
            // views={new GlobeView()}
            layers={layers}
            initialViewState={viewState}
            controller={true}
            onViewStateChange={({ viewState }) => setViewState(viewState)}
         >
            {/* <GlobeView id="globe" /> */}
            {mapVisible && (
               <StaticMap
                  mapboxApiAccessToken={
                     'pk.eyJ1IjoiYmFiYnMiLCJhIjoiY2s1b2JoMjZvMGYydzNmbXAxMXp1NWZhZyJ9.LEHmtAFLAij67eF-54FjxA'
                  }
                  visible={mapVisible}
               />
            )}
         </DeckGL>
      </div>
   );
};
export default Map;
