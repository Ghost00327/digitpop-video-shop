// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:"http://localhost:9000",
  playerUrl:"http://localhost:4201",
  cloudinaryUrl:"https://api.cloudinary.com/v1_1/",
  //currect billsby
  billsbyUrl:"https://public.billsby.com/api/v1/rest/core/digitpop",
  billsbyKey:"digitpop_f1efba4792104a3ab66c1cb59f43993a",

  //new billsby
  // billsbyUrl:"https://public.billsby.com/api/v1/rest/core/staging-digitpop",
  // billsbyKey:"stagingdigitpop_e63c7ed880354970adf026d1a9c80e97",
  CLOUDINARY_CLOUD_NAME:"boggssystems",
  CLOUDINARY_UPLOAD_PRESET:"yspatu75"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
