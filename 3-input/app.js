/* Set your API Key to Authenticate with the ArcGIS Platform
NOTE: You will be building an application which uses the GeoEnrichment service from the ArcGIS Platform
      - You can create an account and API Key here https://developers.arcgis.com/
      - Your API Key *must* be scoped to the following services:
        ~ Geocoding (not stored) 
        ~ Service Area
        ~ GeoEnrichment
      - Adding these services to your API key will require configuring billing on your account
*/
const apiKey = '';

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

// Get the div that we will place our result in to by it's ID
const resultContainer = document.getElementById('result-container');

// Define the behavior for the submit button
const buttonSubmit = document.querySelector('#button-submit');

// Set an asynchronus callback on the button
buttonSubmit.addEventListener('click', async () => {
  console.log('submitting analysis');

  // Use the ArcGIS REST JS APO to query the demographic data for our Study Area
  const response = await arcgisRest.queryDemographicData({
    studyAreas,
    analysisVariables,
    authentication,
  });

  // Get the attributes and field aliases for the result.
  // NOTE: If you decide to use multiple rings or sites at once, you will need to
  //       adapt how this is working
  const attributes =
    response.results[0].value.FeatureSet[0].features[0].attributes;
  const aliases = response.results[0].value.FeatureSet[0].fieldAliases;

  // For the result that we get back, create a new calcite card.

  /* First:
    - Create an open calcite card
    - Set the address as the card's title
    - Create a div to put the enriched content in
   */
  let newHtml = `<calcite-card>
    <span slot="title">${address}</span>
    <span slot="subtitle">${bufferRadii[0]} ${bufferUnits} ${travelMode}</span>
    <div class="geoenriched-content">
  `;
  
  // Then, for each attribute in the result lookup the alias and 
  // value and add these as a data row
  for (const attribute in attributes) {
    if (analysisVariables.includes(attribute)) {
      newHtml += `
      <div class="data-row">
        <div class="data-label">${aliases[attribute]}</div>
        <div class="data-value">${attributes[attribute]}</div>
      </div>`;
      console.log(aliases[attribute], attributes[attribute]);
    }
  }

  // Finally, close the content containing div and the calcite card
  newHtml += `</div></calcite-card>`;

  // Add the new calcite card's HTML to the result container
  resultContainer.innerHTML += newHtml;
});
