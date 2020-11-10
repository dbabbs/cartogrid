import { NextSeo } from 'next-seo';

const base = `https://carto-gridder.vercel.app`;
const SEO = () => {
   return (
      <NextSeo
         title="CartoGridder"
         description="Make grid-based maps from administrative boundary geometries"
         canonical={base}
         openGraph={{
            url: 'https://www.url.ie/a',
            title: 'Open Graph Title',
            description: 'Open Graph Description',
            images: [
               {
                  url: base + '/' + 'open-graph.png',
                  width: 800,
                  height: 600,
                  alt: 'Og Image Alt',
               },
            ],
            site_name: 'CartoGridder',
         }}
         twitter={{
            handle: '@dbabbs',
            site: '@dbabbs',
            cardType: 'summary_large_image',
         }}
      />
   );
};
export default SEO;
