import Map from '../components/Map';
import styles from '../styles/app.module.scss';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import useDebounce from '../hooks/useDebounce';

import { Toast, ToasterContainer, KIND, PLACEMENT } from 'baseui/toast';

const Index = () => {
   const [collection, setCollection] = useState({
      type: 'FeatureCollection',
      features: [],
   });
   const [loading, setLoading] = useState(false);
   const [bounds, setBounds] = useState([]);

   const [size, setSize] = useState(100);
   const [shape, setShape] = useState([{ label: 'Hex', value: 'hex' }]); //choice of "hex", "point", "square", "triangle"
   const debouncedSize = useDebounce(size, 900);
   const [units, setUnits] = useState('km');
   const [value, setValue] = useState([]);
   const [error, setError] = useState(false);

   const [mapVisible, setMapVisible] = React.useState(true);

   useEffect(() => {
      async function fetchData() {
         setLoading(true);
         const response = await fetch(
            `/api/create?size=${size}&shape=${shape[0].value}&id=${value[0].id}&level=${value[0].level}&units=${units}`
         ).then((res) => res.json());

         if (response.hasOwnProperty('error')) {
            setError(true);
            setLoading(false);
         } else {
            setCollection(response.collection);
            setBounds(response.bounds);
            setLoading(false);
         }
      }
      if (value.length > 0) {
         fetchData();
      }
   }, [debouncedSize, shape, value, units]);

   return (
      <div className={styles.app}>
         <Map
            collection={collection}
            bounds={bounds}
            size={size}
            loading={loading}
            mapVisible={mapVisible}
         />
         <Sidebar
            shape={shape}
            setShape={setShape}
            value={value}
            setValue={setValue}
            units={units}
            setUnits={setUnits}
            size={size}
            setSize={setSize}
            mapVisible={mapVisible}
            setMapVisible={setMapVisible}
            collection={collection}
         />
         <div className={styles['toast-container']}>
            {error && (
               <ToasterContainer placement={PLACEMENT.bottomRight}>
                  <Toast kind={KIND.negative} autoHideDuration={3000}>
                     Negative notification
                  </Toast>
               </ToasterContainer>
            )}
         </div>
      </div>
   );
};

export default Index;
