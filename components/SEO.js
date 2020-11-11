import { NextSeo } from 'next-seo';

const base = `https://cartogrid.vercel.app/`;
const SEO = () => {
   return (
      <NextSeo
         title="CartoGrid - Generate grid-based maps from administrative boundary geometries"
         description="Generate grid-based maps from administrative boundary geometries"
         canonical={base}
         openGraph={{
            url: base,
            title: 'CartoGrid',
            description:
               'Generate grid-based maps from administrative boundary geometries',
            images: [
               {
                  url: base + 'open-graph.png',
                  width: 1024,
                  height: 512,
                  alt: 'grid based map of Japan',
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
