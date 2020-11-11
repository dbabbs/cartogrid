import React, { useEffect, useState } from 'react';
import { Select, TYPE } from 'baseui/select';
import { toaster } from 'baseui/toast';
const HERE_API_KEY = process.env.NEXT_PUBLIC_HERE_API_KEY;

function capitalize(str) {
   return str[0].toUpperCase() + str.substring(1);
}
const geocodeUrl = (query) =>
   `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${HERE_API_KEY}&query=${query}&resultType=areas&language=en`;
const Search = ({ value, setValue, setError }) => {
   const [inputValue, setInputValue] = useState('');

   const [options, setOptions] = useState([]);

   useEffect(() => {
      async function fetchData() {
         try {
            const response = await fetch(geocodeUrl(inputValue)).then((res) =>
               res.json()
            );

            const levels = {};
            response.suggestions.forEach((item) => {
               if (levels.hasOwnProperty(capitalize(item.matchLevel))) {
                  levels[capitalize(item.matchLevel)].push({
                     label: item.label,
                     id: item.locationId,
                     level: item.matchLevel,
                  });
               } else {
                  levels[capitalize(item.matchLevel)] = [
                     {
                        label: item.label,
                        id: item.locationId,
                        level: item.matchLevel,
                     },
                  ];
               }
            });

            setOptions(levels);
         } catch (e) {
            toaster.negative(
               'Error communicating with server. Please try again.'
            );
         }
      }
      if (inputValue.length > 0) {
         fetchData();
      }
   }, [inputValue]);

   return (
      <Select
         options={options}
         onInputChange={(evt) => setInputValue(evt.target.value)}
         labelKey="label"
         valueKey="id"
         placeholder="Search for a zone"
         maxDropdownHeight="300px"
         type={TYPE.search}
         onChange={({ value }) => setValue(value)}
         value={value}
      />
   );
};

export default Search;
