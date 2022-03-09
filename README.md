# Building a Site Selection App with the ArcGIS Platform

## Overview

This repo contains sample code from Esri's 2022 Developer Summit. In the session, we illustrated how developers can take advantage of Esri's [GeoEnrichment Service](https://developers.arcgis.com/documentation/mapping-apis-and-services/demographics/geoenrichment/), Esri's [ArcGIS REST JS API](https://developers.arcgis.com/arcgis-rest-js/), and Esri's [Calcite Design Language]() to build a Site Selection application. This sample code is split into three sections / stages. Each stage has both the initial and final state of that section's HTML & JavaScript.

## ArcGIS Platform Requirements.

This application uses Esri's [GeoEnrichment Service](https://developers.arcgis.com/documentation/mapping-apis-and-services/demographics/geoenrichment/). This service requires authentication, and (as used in this application) will also perform non-stored [geocodes](https://developers.arcgis.com/documentation/mapping-apis-and-services/search/geocoding/) and generate [network service areas (isochrones)](https://developers.arcgis.com/documentation/mapping-apis-and-services/routing/service-areas/).

The easiest way to authenticate to this service is with an API Key. To get an API Key, you will need to have (or create) a developer account from [developers.arcgis.com](https://developers.arcgis.com/). Your API key must be scoped for the following services:

1. Geocoding (Not Stored)
1. Service Area
1. GeoEnrichment

If you need more information about creating your account and managing your API Keys, please refer to the [Getting Started](https://developers.arcgis.com/documentation/mapping-apis-and-services/get-started/) guide in the developer documentation.. You may also choose to use an application login. If so, you may refer to the [documentation](https://developers.arcgis.com/documentation/mapping-apis-and-services/security/application-credentials/)

## Step 1: Starting Point

### Overview

In this step, you will begin by learning how to work with the GeoEnrichment API. In the live session, we covered four topics:

1. Configuring ArcGIS REST JS with an API Key
1. Defining the Sudy Area for our site
1. Defining the variables for the GeoEnrichment Service
1. Making a request to the GeoEnrichment service

### Key Documentation

Key topics in Esri's Documentation:

- [ArcGIS REST JS](https://developers.arcgis.com/arcgis-rest-js/)
- [GeoEnrichment API](https://developers.arcgis.com/rest/geoenrichment/api-reference/enrich.htm)
- [Data Browser](https://doc.arcgis.com/en/esri-demographics/data/data-browser.htm) ( easily copy out the JSON for your analysis variables )

## Step 2: Working with the Results

### Overview

Calcite components are a distributed set of composable, purpose-built web components for building great web experiences. These components make it easy to capture user input and display information. In this step, you will accomplish three objectives:

1. Using Esri's Calcite Design Language, add a button component with the label "Add Site"
   - Check the styles in the HTML for classes that can help with the display of the button.
1. Modify the application so that the request to the GeoEnrichemnt service only happens when the user clicks on the button
1. When the GeoEnrichment response comes back, display the results in a calcite card
   - Use the Card's Title and Subtitle to display information about the site address and the study area
   - For each attribute in the response, add that attribute as a new row to the card
     - The response contains the alias for each field, which can improve the display
     - Check the styles in the HTML for classes for a data row, label, and value which you may use to improve the display

### Key Documentation

Key topics in Esri's Documentation:

- [Esri's Calcite Design System](https://developers.arcgis.com/calcite-design-system/)
- [Calcite Components](https://developers.arcgis.com/calcite-design-system/components/)

## Step 3: Getting User Inputs

### Overview

In this last step, you will add the ability to get user input for the addres, site radius, travel mode, and radius units from the user. To do this you will need to:

1. Add calcite components to get the user's input settings
1. Modify the code to access the components values, and use those to modify the study area, when the user clicks on "Add Site"

### Key Documentation

Key topics in Esri's Documentation:

- [Calcite Input](https://developers.arcgis.com/calcite-design-system/components/input/)
- [Calcite Select](https://developers.arcgis.com/calcite-design-system/components/select/)
