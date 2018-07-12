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
    // regex used to match, hi = global and anycase search
    return place.city.match(regex) || place.state.match(regex)
    // checks for if either the place or state contain the letters
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  // creates array of displayMatches
  const html = matchArray.map(place => {
    // loops over array, backtick holds list item
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span
     class="hl">${this.value}</span>`)
    const stateName = place.state.replace(regex, `<span
      class="hl">${this.value}</span>`)
    // finds what it matched in the regex and highlights that value

    return `
  <li>
  <span class="name">${cityName}, ${stateName}</span>
  <span class="population">${place.population}</span>
  </li>
`;
  }).join('');
  // turns array in to one string
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
// target html classes

searchInput.addEventListener('change', displayMatches);
// listens to the change event, when input changes runs displayMatches
searchInput.addEventListener('keyup', displayMatches);
// keyup - displayMatches when keys presses
