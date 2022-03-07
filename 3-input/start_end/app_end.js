const apiKey = '';
const authentication = new arcgisRest.ApiKey({
  key: apiKey,
});

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

// Get Input Elements
const inputAddress = document.getElementById('input-address');
const inputRadius = document.getElementById('input-radius');
const inputUnits = document.getElementById('input-unit');
const inputMode = document.getElementById('input-mode');

// Result container
const resultContainer = document.getElementById('result-container');

// Submit button
const buttonSubmit = document.querySelector('#button-submit');

// Set Submit callback
buttonSubmit.addEventListener('click', async () => {
  // Get the inputs
  const address = inputAddress.value;
  const bufferRadii = [inputRadius.value];
  const bufferUnits = inputUnits.value;
  const travelMode = inputMode.value;

  // Create the study area
  const studyAreas = [
    {
      address: { text: address },
      areaType: 'NetworkServiceArea',
      bufferUnits,
      bufferRadii,
      travel_mode: travelMode,
    },
  ];

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

  // Build the card for the result
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

  // Add the card
  resultContainer.innerHTML += newHtml;
});
