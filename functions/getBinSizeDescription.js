function getBinSizeDescription(shape, units) {
   if (shape === 'hex') {
      return 'Length of hexagon side in ' + units.toUpperCase();
   } else if (shape === 'square') {
      return 'Length of square side in ' + units.toUpperCase();
   } else if (shape === 'triangle') {
      return (
         'Length of  triangle non-hypotonuse side in ' + units.toUpperCase()
      );
   }
}

export default getBinSizeDescription;
