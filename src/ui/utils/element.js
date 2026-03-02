
export const node = (id) => document.getElementById(id);

const newNode = (type, parent, text, style) => {
  const node = document.createElement(type);
  if(text) node.textContent = text;
  if(style) node.classList.add(style);
  parent.appendChild(node)
}

export const heading = (grade, parent, text) => {
  return newNode(`h${grade}`, parent, text, null);
}

export const paragraph = (parent, text) => {
  return newNode('p', parent, text, null);
}

export const span = (parent, text) => {
  return newNode('span', parent, text, null);
}

export const article = (parent, style) => {
  return newNode('article', parent, null, style);
}

export const list = (parent, style) => {
  return newNode('ol', parent, null, style);
}

export const item = (parent, style) => {
  return newNode('li', parent, null, style);
}

export const form = (parent, style) => {
  return newNode('form', parent, null, style)
}

export const label = (parent, text) => {
  return newNode('label',parent, text, null);
}

export const textfield = (id, parent, placeHolder) => {
  const input = newNode('input', parent, null, null);
  input.id = id;
  input.required = true;
  input.autocomplete = 'on';
  input.placeholder = placeHolder;
  return input;
}

export const checkbox = (id, parent) => {
  const input = newNode('input', parent, null, null);
  input.id = id;
  input.type = 'checkbox';
  return input;
}