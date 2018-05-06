const CLIENT_ID = 'WG14LKEVTBPKTNZO2135EJ2XRNDEVPOXSACHZ5GJ023OWNKT';
const CLIENT_SECRET = 'INOWQCW4WIT4J0BZSVEMOWLWHB2M1RAVPQZNE1UALG4W4P2B';


// url and params
const fSURL = 'https://api.foursquare.com/v2/venues/';
const VERS = '20171227';
const CATEGORIES = {
  'College & University': '4d4b7105d754a06372d81259',
}
// create array of categories
const CATEGORY_ID = Object.keys(CATEGORIES).map((cat) => CATEGORIES[cat]);

export const getFSLocations = (mapCenter) => {
  const requestURL = `${fSURL}search?ll=${mapCenter.lat},${mapCenter.lng}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERS}&categoryId=${CATEGORY_ID}`
  return fetch(requestURL)
  .then(response => {
      if (!response.ok) {
        throw response
      } else  return response.json()
    })
  .then(data => {
    const places = data.response.venues;
    return places;
  })

}
