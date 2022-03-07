const apiKey = '';
const authentication = new arcgisRest.ApiKey({
  key: apiKey,
});

const address = '380 New York St. Redlands, CA 92373';
const bufferRadii = ['5'];
const bufferUnits = 'Miles';
const travelMode = 'Driving';

const studyAreas = [
  {
    address: { text: address },
    areaType: 'NetworkServiceArea',
    bufferUnits,
    bufferRadii,
    travel_mode: travelMode,
  },
];
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

// Result container
const resultContainer = document.getElementById('result-container');

const buttonSubmit = document.querySelector('#button-submit');
buttonSubmit.addEventListener('click', async () => {
  console.log('submitting analysis');

  const response = await arcgisRest.queryDemographicData({
    studyAreas,
    analysisVariables,
    authentication,
  });

  // App will only allow a single ring, so OK to grab this
  // prettier-ignore
  const attributes = response.results[0].value.FeatureSet[0].features[0].attributes
  const aliases = response.results[0].value.FeatureSet[0].fieldAliases;

  //Build the card for the result
  let newHtml = `<calcite-card>
    <span slot="title">${address}</span>
    <span slot="subtitle">${bufferRadii[0]} ${bufferUnits} ${travelMode}</span>
    <div class="geoenriched-content">
  `;
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
  newHtml += `</div></calcite-card>`;
  resultContainer.innerHTML += newHtml;
});
