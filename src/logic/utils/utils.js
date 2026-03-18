

/**
 * Abstraktionen över fetch metoden för smidigare API:anrop
 * @param {string} api - API-endpoint
 * @returns {Promise<any|Error>} - Funktionen är asynkron
 * och returnerar ett Promise-objekt med json-data eller ett Error-objekt vid fel.
 */
export const query = async (api) => {
  try {
    const request = new Request(api);
    const response = await fetch(request);
    return await response.json();
  } catch(err) {
    return err;
  }
}

/**
 * Jämför två strängar utifrån innehållet.
 * @param {string} str1 - Första strängen för jämförelsen.
 * @param {string} str2 - Andra strängen för jämförelsen.
 * @returns {boolean} - Returnerar värdet true om strängarna är likadana
 * eller false om de är olika.
 */
export const contEqual = (str1, str2) =>  str1.toLowerCase() === str2.toLowerCase();

/**
 * Kollar upp om en vald sträng är tom.
 * @param {string} str - Strängen som ska kollas upp.
 * @returns {boolean} - Returnerar värdet true om strängen är tom
 * eller false om den inte är det.
 */
export const emptyStr = (str) => str.length === 0;


/**
 * Väljer ett slumpmässigt värde ur en lista.
 * @param {any[]} options - En lista på olika värden.
 * @returns {any} - Ett slumpmässigt värde ur en lista.
 */
export const randOpt = (options) => {
  const limit = options.length;
  const dice = Math.floor(Math.random() * limit);
  return options[dice];
}

/**
 * Extraherar ett namn på ett land ur en sträng.
 * @param {string} info - En sträng med platdata.
 * @returns {string} - Namn på ett land.
 */
export const getCountry = (info) => {
  const state = info.split(', ');
  const last = state.length - 1;
  return state[last];
}

/**
 * Abstraktionen över metoden 'localStorage.setItem' för smidighetens skull.
 * @param {string} key - Nyckeln för ett värde som ska sparas i localStorage.
 * @param {string} value - Värdet som ska sparas i localStorage.
 */
export const save = (key, value) => {
  localStorage.setItem(key, value);
}

/**
 * Abstraktionen över metoden 'localStorage.getItem' för smidighetens skull.
 * @param {string} key - Nyckeln för ett värde som hämtas ur localStorage.
 * @returns {string} - Returnerar en sträng. Om värdet inte finns i localStorage
 * returnerar en tom sträng.
 */
export const load = (key) => {
  return localStorage.getItem(key) || '';
}

/**
 * Formaterar ort-data i syfte att undvika API-fel.
 * Om användaren skriver orten med små bokstäver eller bara med stora,
 * kommer orten ändå hittas i API:n med hjälp av denna formateringsfunktionen.
 * @param {string} userCity - Ort som har matats i formulärfältet av användaren.
 * @returns {string} - Returnerar orten i korrekt format.
 */
export const formatCity = (userCity) => {
  const firstChar = userCity[0]
    .toUpperCase();
  const formatted = firstChar + userCity
    .toLowerCase()
    .slice(1, userCity.length);
  return formatted;
}

/**
 * Jämför orten som har matats av användaren i formulärfältet med orten
 * som kommer från API:n. API:n för orten returnerar ibland en approximativ
 * ort vid fel stavning, så denna funktion försäkrar att orten är den samma
 * som användaren efterfrågar.
 * @param {string} userCity - Ort som har matats i formulärfältet av användaren.
 * @param {string} apiCity - Ort som API:n har returnerat.
 * @returns {boolean} - Returnerar värdet true om API:orten stämmer med den som
 * användaren efterfrågar och false om den inte stämmer.
 */
export const cityNotFound = (userCity, apiCity) => {
  const invalidCity = emptyStr(userCity) 
    ||!contEqual(userCity, apiCity);
  return invalidCity;
}
