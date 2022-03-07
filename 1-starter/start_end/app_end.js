/* Set your API Key to Authenticate with the ArcGIS Platform
NOTE: You will be building an application which uses the GeoEnrichment service from the ArcGIS Platform
      - You can create an account and API Key here https://developers.arcgis.com/
      - Your API Key *must* be scoped to the following services:
        ~ Geocoding (not stored) 
        ~ Service Area
        ~ GeoEnrichment
      - Adding these services to your API key will require configuring billing on your account
*/
const apiKey = 'YOUR_API_KEY';

// ArcGIS REST JS authentication
const authentication = new arcgisRest.ApiKey({
  key: apiKey,
});

// Default site address and study area settings
const address = '380 New York St. Redlands, CA 92373';
const bufferRadii = ['5'];
const bufferUnits = 'Miles';
const travelMode = 'Driving';

// Create an object for our study area that we will pass to the REST JS API
const studyAreas = [
  {
    address: { text: address },
    areaType: 'NetworkServiceArea',
    bufferUnits,
    bufferRadii,
    travel_mode: travelMode,
  },
];

// Analysis variables - to browse all avaialable data see the browser here https://doc.arcgis.com/en/esri-demographics/data/data-browser.htm
// For this application, it helps to remove the collection name from the variable (browser JSON is -> colection.variable)
const analysisVariables = [
  'DPOP_CY',
  'MEDVAL_CY',
  'AVGVAL_CY',
  'AVGHHSZ_CY',
  'DIVINDX_CY',
  'MEDHINC_CY',
  'AVGHINC_CY',
  'PCI_CY',
];

// Use the ArcGIS REST JS API to query the demographic data for our Study Area
arcgisRest
  .queryDemographicData({
    studyAreas,
    analysisVariables,
    authentication,
  })
  .then((response) => {
    console.log(response);
  });
