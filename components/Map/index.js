import React, { useState, useMemo, useEffect } from 'react';
import { SolidPolygonLayer } from '@deck.gl/layers';
import { _GlobeView as GlobeView, OrthographicView } from '@deck.gl/core';
import { FlyToInterpolator } from '@deck.gl/core';
import DeckGL from '@deck.gl/react';

import styles from './index.module.scss';
import layer from './layer';
import globe from './globe';
import useViewport from '../../hooks/useViewport';
import calculateBounds from './functions/calculateBounds';
import { Spinner } from 'baseui/spinner';
import { StaticMap } from 'react-map-gl';
import { theme } from './globe';
const NEXT_PUBLIC_MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const Map = ({ collection, bounds, size, loading, mapVisible, projection }) => {
   const [viewState, setViewState] = useState({
      latitude: 35.492696316137526,
      longitude: 131.32047909091202,
      zoom: 4.416726761134002,
   });

   const [world, setWorld] = useState({
      type: 'FeatureCollection',
      features: [],
   });

   useEffect(() => {
      async function fetchWorld() {
         const response = await fetch('/world.json').then((res) => res.json());
         setWorld(response);
      }

      fetchWorld();
   }, []);

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
      ...(projection === 'globe' && mapVisible ? globe({ world }) : []),
      layer({ data: collection, size }),
   ];

   const viewport = useViewport(viewState, projection);

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
      <div
         className={styles.map}
         style={{ background: theme.globeContainerBackground }}
      >
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
            parameters={{
               cull: true,
               // depthTest: false,
            }}
         >
            {mapVisible && (
               <>
                  {projection === 'globe' ? (
                     <GlobeView id="globe" />
                  ) : (
                     <StaticMap
                        mapboxApiAccessToken={NEXT_PUBLIC_MAPBOX_TOKEN}
                        visible={mapVisible}
                     />
                  )}
               </>
            )}
         </DeckGL>
      </div>
   );
};
export default Map;
