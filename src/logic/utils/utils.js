
export const query = async (api) => {
  try {
    const request = new Request(api);
    const response = await fetch(request);
    return await response.json();
  } catch(err) {
    return err;
  }
}

export const contEqual = (str1, str2) =>  str1.toLowerCase() === str2.toLowerCase();

export const emptyStr = (str) => str.length === 0;

export const randOpt = (options) => {
  const limit = options.length;
  const dice = Math.floor(Math.random() * limit);
  return options[dice];
}

export const getCountry = (info) => {
  const state = info.split(', ');
  const last = state.length - 1;
  return state[last];
}

export const save = (key, value) => {
  localStorage.setItem(key, value);
}

export const load = (key) => {
  return localStorage.getItem(key) || '';
}

export const formatCity = (userCity) => {
  const firstChar = userCity[0]
    .toUpperCase();
  const formatted = firstChar + userCity
    .toLowerCase()
    .slice(1, userCity.length);
  return formatted;
}

export const cityNotFound = (userCity, apiCity) => {
  const invalidCity = emptyStr(userCity) 
    ||!contEqual(userCity, apiCity);
  if(invalidCity) return true;
  else return false;
}

export const progress = (prog, action) => {
  let step = 0;
  const increase = (intId) => {
    if(step === 100) {
      clearInterval(intId);
      action();
    }
    step += 1;
    prog.style.width = `${step}%`;
  }

  const intId = setInterval(() => {
    increase(intId)
  }, 0.5);
}