
export const API = Object.freeze({
  bible: (ref) => `https://bible-api.com/${ref}`,
  location: (city) => `https://nominatim.openstreetmap.org/search?q=${city}&format=json&accept-language=en`,
  weather: (lat, long) => `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code&daily=temperature_2m_mean&timezone=auto&temperature_unit=celsius`,
  shabbat: (lat, long) => `https://www.hebcal.com/shabbat?cfg=json&latitude=${lat}&longitude=${long}&M=on&leyning=off`,
  countdown: (date) => `https://digidates.de/api/v1/countdown/${date}`
});

