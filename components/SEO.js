import { NextSeo } from 'next-seo';

const base = `https://cartogrid.vercel.app/`;
const SEO = () => {
   return (
      <NextSeo
         title="CartoGrid"
         description="Make grid-based maps from administrative boundary geometries"
         canonical={base}
         openGraph={{
            url: base,
            title: 'Open Graph Title',
            description: 'Open Graph Description',
            images: [
               {
                  url: base + 'open-graph.png',
                  width: 1024,
                  height: 512,
                  alt: 'Og Image Alt',
               },
            ],
            site_name: 'CartoGrid',
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
