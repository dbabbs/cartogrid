import { saveAs } from 'file-saver';

function download(title = 'geojson', geojson) {
   const blob = new Blob([JSON.stringify(geojson)], {
      type: 'text/plain;charset=utf-8',
   });
   saveAs(blob, title.split(' ').join('-') + '.geojson');
}

export default download;
