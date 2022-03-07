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

arcgisRest
  .queryDemographicData({
    studyAreas,
    analysisVariables,
    authentication,
  })
  .then((response) => {
    console.log(response);
  });
