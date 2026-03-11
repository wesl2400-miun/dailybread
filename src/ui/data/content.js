
 export const CONTENT = Object.freeze({
  CITY_VIEW: Object.freeze({
    TITLE1: 'How it works',
    ABOUT: 'Our Bible engine generates a personalized Bible passage and prayer ' +
    'based on your region, current weather, and Shabbat times.',
    TITLE2: 'Privacy Policy',
    POLICY: 'We gather location data only to provide a personalized prayer experience. '
  }),
  LOC_CARD: Object.freeze({
    TITLE: 'Type Your City',
    CITY: 'My City',
    SAVE: 'Remember my location in this browser',
    SUBMIT: 'PICK MY PRAYER',
    ERROR: 'City not found. Are you sure you spelled it correctly?'
  }),
  PRAY_VIEW: Object.freeze({
    TITLE1: "Your Daily Wisdom",
    TITLE2: 'Your Daily Prayer',
    BACK_BTN: 'START OVER'
  }),
  SHAB_VIEW: Object.freeze({
    TODAY: 'Today is Shabbat! Enjoy your rest.',
    daysLeft: (countdown) => `${countdown} days until Shabbat.`,
    times: (city) => `Times apply to ${city}.`
  })
});