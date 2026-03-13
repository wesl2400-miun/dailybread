
export const element = (id) => document.getElementById(id);

const newNode = (type, parent, text, style) => {
  const node = document.createElement(type);
  if(text) node.textContent = text;
  if(style) node.classList.add(style);
  if(parent) parent.appendChild(node);
  return node;
}

export const heading = (parent, level, text) => {
  return newNode(`h${level}`, parent, text, null);
}

export const paragraph = (parent, text, style = null) => {
  return newNode('p', parent, text, style);
}

export const span = (parent, text) => {
  return newNode('span', parent, text, null);
}

export const article = (parent, style) => {
  return newNode('article', parent, null, style);
}

export const section = (parent, style) => {
  return newNode('section', parent, null, style);
}

export const fieldset = (parent, title, style) => {
  const node = newNode('fieldset', parent, null, style);
  newNode('legend', node, title, null);
  return node;
}

export const list = (parent) => {
  return newNode('ol', parent, null, null);
}

export const listItem = (parent) => {
  return newNode('li', parent, null, null);
}

export const form = (parent) => {
  const form = newNode('form', parent, null, null);
  form.noValidate = true;
  return form;
}

const accesify = (id, input, label) => {
  input.id = id;
  label.htmlFor = id;
}

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

export const checkbox = (id, parent, title) => {
  const checker = newNode('div', parent, null, 'checker')
  const input = newNode('input', checker, null, null);
  input.type = 'checkbox';
  const label = newNode('label', checker, title, null);
  accesify(id, input, label);
  return input;
}

export const submitBtn = (parent, title) => {
  const input = newNode('input', parent, null, null);
  input.type = 'submit';
  input.value = title;
  return input;
}

export const button = (parent, title) => {
  return newNode('button', parent, title, null);
}

export const progbar = (parent) => {
  const wrapper = newNode('div', 
    parent, null, 'progbar');
  return {
    bar: wrapper,
    prog: newNode('div', wrapper, 
    null, 'progress')
  }
}