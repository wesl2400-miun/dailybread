
/** Hämtar ett HTML-element baserat på ett ID.
 * @param {string} id - ID på ett HTML-element.
 * @returns {HTMLElement} - Returnerar ett existerande HTML-element.
 */
export const element = (id) => document.getElementById(id);

/** Skapar ett nytt HTML-element.
 * @param {string} type - Typen av HTML-element.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till;
 * är valfritt och kan förses med null-värdet.
 * @param {string|null} [text] - Ett textinnehåll; är valfritt och kan förses med null-värdet.
 * @param {string|null} [style] - Namnet på en css-klass som elementet ska stiliseras med;
 * är valfritt och kan förses med null-värdet.
 * @returns {HTMLElement} - Returnerar ett HTML-element.
 */
const newNode = (type, parent, text, style) => {
  const node = document.createElement(type);
  if(text) node.textContent = text;
  if(style) node.classList.add(style);
  if(parent) parent.appendChild(node);
  return node;
}


/** Skapar ett rubrikelement.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @param {string} level - Rubrik-nivå. 
 * @example heading(parent, '1', 'Hello') - Skapar en rubrik av förstagraden med titeln 'Hello'.
 * @param {string} title - Titeln på rubriken.
 * @returns {HTMLElement} - Returnerar en rubrik.
 */
export const heading = (parent, level, title) => {
  return newNode(`h${level}`, parent, title, null);
}

/** Skapar ett paragrafelement.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @param {string} text - Textinnehållet. 
 * @param {string} [style=null] - Namnet på CSS-klassen som elementet ska stiliseras med; är valfritt.
 * @returns {HTMLElement} - Returnerar en paragraf.
 */
export const paragraph = (parent, text, style = null) => {
  return newNode('p', parent, text, style);
}

/** Skapar ett element av typen 'span'.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @param {string} text - Textinnehållet. 
 * @returns {HTMLElement} - Returnerar ett 'span'-element.
 */
export const span = (parent, text) => {
  return newNode('span', parent, text, null);
}

/** Skapar ett element av typen 'article'.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @param {string} [style=null] - Namnet på CSS-klassen som elementet ska stiliseras med; är valfritt.
 * @returns {HTMLElement} - Returnerar ett 'article'-element.
 */
export const article = (parent, style = null) => {
  return newNode('article', parent, null, style);
}

/** Skapar ett element av typen 'section'.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @returns {HTMLElement} - Returnerar en sektion.
 */
export const section = (parent) => {
  return newNode('section', parent, null, null);
}

/** Skapar en HTML-lista.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @returns {HTMLElement} - Returnerar ett HTML-lista.
 */
export const list = (parent) => {
  return newNode('ol', parent, null, null);
}

/** Skapar ett element i en lista.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @returns {HTMLElement} - Returnerar en listartikel.
 */
export const listItem = (parent) => {
  return newNode('li', parent, null, null);
}

/** Skapar ett element av typen 'fieldset'.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @param {string} title - Titel på formulärfältet som förklarar dess syfte.
 * @returns {HTMLElement} - Returnerar en 'fieldset' som kommer att omge ett formulärfält
 * för bästa praxis.
 */
export const fieldset = (parent, title) => {
  const node = newNode('fieldset', parent, null, null);
  newNode('legend', node, title, null);
  return node;
}

/** Skapar ett formulärfält.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @returns {HTMLElement} - Returnerar ett formulärfält.
 */
export const form = (parent) => {
  const form = newNode('form', parent, null, null);
  form.noValidate = true;
  return form;
}

/** En hjälpmetod för inmatningselement för att göra dem tillgängliga.
 * @param {string} id - ID som ska koppla ett element av typen 'label' till ett inmatningsfält.
 * @param {HTMLElement} input - Elementet av typen 'input'.
 * @param {HTMLElement} label - Eelementet av typen 'label'.
 */
const accesify = (id, input, label) => {
  input.id = id;
  label.htmlFor = id;
}

/** Skapar ett input-element av typen 'text'.
 * @param {string} id - ID på inmatningsfältet.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @param {string} placeHolder - Utgångsvärdet för inmatningsfältet som visas med grå färg.
 * @param {string} title - Titeln på inmatningsfältet för tillgänglighetens skull.
 * @returns {HTMLInputElement} Returnerar ett textinmatningsfält.
 */
export const textfield = (id, parent, placeHolder, title) => {
  const label = newNode('label', parent, title, null);
  const input = newNode('input', parent, null, null);
  accesify(id, input, label);
  input.required = true;
  input.type = 'text';
  input.autocomplete = 'on';
  input.placeholder = placeHolder;
  return input;
}

/** Skapar ett input-element av typen 'checkbox'.
 * @param {string} id - ID på inmatningsfältet.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @param {string} title - Titeln på kryssrutan för tillgänglighetens skull.
 * @returns {HTMLInputElement} - Returnerar en kryssruta.
 */
export const checkbox = (id, parent, title) => {
  const checker = newNode('div', parent, null, 'checker')
  const input = newNode('input', checker, null, null);
  input.type = 'checkbox';
  const label = newNode('label', checker, title, null);
  accesify(id, input, label);
  return input;
}

/** Skapar ett input-element av typen 'submit'.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @param {string} title - Titeln på submit-knappen.
 * @returns {HTMLElement} - Returnerar en 'submit'-knapp.
 */
export const submitBtn = (parent, title) => {
  const input = newNode('input', parent, null, null);
  input.type = 'submit';
  input.value = title;
  return input;
}

/** Skapar en knapp.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @param {string} title - Titeln på knappen.
 * @returns {HTMLElement} - Returnerar en knapp.
 */
export const button = (parent, title) => {
  return newNode('button', parent, title, null);
}

/** Skapar en skräddarsydd förloppsindikatorn.
 * @param {HTMLElement|null} [parent] - Ett element som det nya elementet ska kopplas till.
 * @returns {{bar: HTMLElement, prog: HTMLElement}} - Returnerar en förloppsindikatorn.
 */
export const progbar = (parent) => {
  const wrapper = newNode('div', 
    parent, null, 'progbar');
  return {
    bar: wrapper,
    prog: newNode('div', wrapper, 
    null, 'progress')
  }
}