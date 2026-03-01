
export const API = Object.freeze({
  bible: (ref) => `https://bible-api.com/${ref}?translation=kjv`,
  location: (city) => `https://nominatim.openstreetmap.org/search?q=${city}&format=json&accept-language=en`,
  weather: (lat, long) => `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code&daily=temperature_2m_mean&timezone=auto&temperature_unit=celsius`,
});

