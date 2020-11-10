import fetch from 'node-fetch';
import wellknown from 'wellknown';
const HERE_API_KEY = process.env.NEXT_PUBLIC_HERE_API_KEY;
const url = (id, level) =>
   `https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid=${id}&gen=8&apiKey=${HERE_API_KEY}&additionaldata=IncludeShapeLevel,${level}`;
async function queryShapeById(id, level) {
   const response = await fetch(url(id, level)).then((res) => res.json());
   const shape = response.Response?.View[0]?.Result[0]?.Location?.Shape.Value;
   let geojson = { type: 'FeatureCollection', features: [] };
   if (shape) {
      geojson = wellknown(shape);
   }
   return geojson;
}
export default queryShapeById;
