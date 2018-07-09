const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  // converts data to a json file
  .then(data => cities.push(...data))
  // spreads in to the array individual cities

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    // global and anycase search
    return place.city.match(regex) || place.state.match(regex)
    // checks for if either the place or state contain the letters
  })
}
