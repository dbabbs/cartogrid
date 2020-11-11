import React, { useState } from 'react';
import styles from './index.module.scss';
import { Select } from 'baseui/select';
import { Slider } from 'baseui/slider';
import Search from '../Search';
import { Button } from 'baseui/button';
import { Title, SectionTitle, Paragraph } from '../Text';
import download from '../../functions/download';
import { RadioGroup, Radio } from 'baseui/radio';
import getBinSizeDescription from '../../functions/getBinSizeDescription';
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from 'baseui/checkbox';
import { Tabs, Tab, FILL } from 'baseui/tabs-motion';
import { StyledLink } from 'baseui/link';
import GridIcon from '../../assets/GridIcon.js';
import { StatefulTooltip } from 'baseui/tooltip';

const Sidebar = ({
   shape,
   setShape,
   value,
   setValue,
   units,
   setUnits,
   size,
   setSize,
   mapVisible,
   setMapVisible,
   collection,
   projection,
   setProjection,
   enableMeters,
}) => {
   const [activeKey, setActiveKey] = useState('0');

   return (
      <div className={styles.sidebar}>
         <div className={styles.top}>
            <div className={styles.animator}>
               <Title>
                  <GridIcon className={styles.icon} />
                  CartoGrid{' '}
               </Title>
            </div>
            <Paragraph style={{ marginBottom: 5 }}>
               Prepare grid-based GeoJSON datasets from administrative boundary
               shapes.
            </Paragraph>
         </div>
         <Tabs
            activeKey={activeKey}
            onChange={({ activeKey }) => {
               setActiveKey(activeKey);
            }}
            fill={FILL.fixed}
            activateOnFocus
         >
            <Tab title="Query">
               <div className={styles.item}>
                  <SectionTitle style={{ marginTop: 0 }}>
                     Administrative Zone
                  </SectionTitle>
                  <Paragraph>
                     eg: San Francisco, Florida, Italy, or India.
                  </Paragraph>
                  <Search value={value} setValue={setValue} />
                  <Paragraph>Russia and USA are coming soon.</Paragraph>
               </div>

               <div className={styles.item}>
                  <SectionTitle>Grid Type</SectionTitle>
                  <Select
                     options={[
                        { label: 'Hexagon', value: 'hex' },
                        { label: 'Square', value: 'square' },
                        { label: 'Triangle', value: 'triangle' },
                     ]}
                     labelKey="label"
                     valueKey="value"
                     onChange={({ value }) => setShape(value)}
                     value={shape}
                     clearable={false}
                  />
               </div>

               <div className={styles.item}>
                  <SectionTitle>Bin Size Units</SectionTitle>
                  <RadioGroup
                     value={units}
                     onChange={(e) => setUnits(e.target.value)}
                     name="units"
                     overrides={{
                        Label: {
                           style: () => {
                              return {
                                 color: `rgba(0,0,0,0.7)`,
                                 fontWeight: 'normal',
                                 fontSize: '14px',
                              };
                           },
                        },
                     }}
                  >
                     <Radio value="km">Kilometers</Radio>
                     {enableMeters ? (
                        <Radio value="m">Meters</Radio>
                     ) : (
                        <Radio disabled={true} value="m">
                           <StatefulTooltip
                              accessibilityType={'tooltip'}
                              content="Country and state level geometries only support KM"
                              popoverMargin={8}
                           >
                              Meters
                           </StatefulTooltip>
                        </Radio>
                     )}
                  </RadioGroup>
               </div>
               <div className={styles.item}>
                  <SectionTitle>Bin Size</SectionTitle>
                  <Paragraph>
                     {getBinSizeDescription(shape[0].value, units)}
                  </Paragraph>
                  <Slider
                     value={[size]}
                     onChange={({ value }) => setSize(value)}
                     min={1}
                     max={500}
                     overrides={{
                        TickBar: ({ $min, $max }) => (
                           <div className={styles['custom-tick']}>
                              <div>
                                 {$min}
                                 {units}
                              </div>

                              <div>
                                 {$max}
                                 {units}
                              </div>
                           </div>
                        ),
                     }}
                  />
               </div>
               {/* <div className={styles.item}>
                  <SectionTitle>Base Map</SectionTitle>
                  <RadioGroup
                     value={projection}
                     onChange={(e) => setProjection(e.target.value)}
                     name="projection"
                     overrides={{
                        Label: {
                           style: () => {
                              return {
                                 color: `rgba(0,0,0,0.7)`,
                                 fontWeight: 'normal',
                                 fontSize: '14px',
                              };
                           },
                        },
                     }}
                  >
                     <Radio value="mercator">Mercator</Radio>
                     <Radio value="globe">Globe</Radio>
                  </RadioGroup>
                  <Checkbox
                     checked={mapVisible}
                     checkmarkType={STYLE_TYPE.toggle_round}
                     onChange={(e) => setMapVisible(e.target.checked)}
                     labelPlacement={LABEL_PLACEMENT.right}
                     overrides={{
                        Label: {
                           style: () => {
                              return {
                                 color: `rgba(0,0,0,0.7)`,
                                 fontWeight: 'normal',
                                 fontSize: '14px',
                              };
                           },
                        },
                     }}
                  >
                     Base map visible
                  </Checkbox>
               </div> */}

               <Button
                  onClick={() => download(value[0]?.label, collection)}
                  disabled={
                     collection.features.length === 0 && value.length === 0
                  }
               >
                  Download GeoJSON
               </Button>
            </Tab>
            <Tab title="About">
               <Paragraph style={{ marginTop: 0 }}>
                  Use this tool to generate and download grid-based maps from
                  administrative-level boundary geometries.
               </Paragraph>
               <Paragraph>
                  City, county, state, and country level zones (excluding China)
                  are supported.
               </Paragraph>
               <Paragraph>
                  The grid-based bins are generated using{' '}
                  <StyledLink target="_blank" href="https://turfjs.org/">
                     TurfJS
                  </StyledLink>
                  .
               </Paragraph>
               <Paragraph>
                  Built with{' '}
                  <StyledLink target="_blank" href="https://nextjs.org/">
                     Next.js
                  </StyledLink>
                  , deployed with{' '}
                  <StyledLink target="_blank" href="https://vercel.com/">
                     Vercel
                  </StyledLink>
                  .
               </Paragraph>
               <Paragraph>
                  This tool was created as part of the{' '}
                  <StyledLink
                     target="_blank"
                     href="https://twitter.com/tjukanov/status/1311568912950140930"
                  >
                     #30DayMapChallenge
                  </StyledLink>
                  : Grid.
               </Paragraph>

               <Paragraph style={{ marginBottom: 0 }}>
                  Made by{' '}
                  <StyledLink target="_blank" href="https://twitter.com/dbabbs">
                     @dbabbs
                  </StyledLink>
                  , with help from{' '}
                  <StyledLink
                     target="_blank"
                     href="https://twitter.com/burritojustice"
                  >
                     @burritojustice
                  </StyledLink>
                  .
               </Paragraph>
               <Paragraph style={{ marginBottom: 0 }}>
                  View the code on{' '}
                  <StyledLink
                     target="_blank"
                     href="https://github.com/dbabbs/cartogrid"
                  >
                     Github
                  </StyledLink>
                  .
               </Paragraph>
            </Tab>
         </Tabs>
      </div>
   );
};

export default Sidebar;
