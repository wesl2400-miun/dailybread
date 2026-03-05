
 export const CONTENT = Object.freeze({
  CITY_VIEW: Object.freeze({
    TITLE1: 'How it works',
    ABOUT: 'Our Bible engine generates a personalized Bible passage and prayer ' +
    'based on your region, current weather, and Shabbat times.',
    TITLE2: 'Privacy Policy',
    POLICY: 'We gather location data only to provide a personalized prayer experience. ' +
      "If you don't want to share you location data, select the checkbox for the default city. "
  }),
  LOC_CARD: Object.freeze({
    TITLE: 'Type Your City',
    CITY: 'My City',
    DEFAULT: 'Make Jerusalem my default city',
    SAVE: 'Remember my location in this browser',
    SUBMIT: 'PICK MY PRAYER'
  }),
  PRAY_VIEW: Object.freeze({
    TITLE1: "Jesus' Words for You",
    TITLE2: 'Your Daily Prayer'
  }),
  SHAB_VIEW: Object.freeze({
    DEFAULT: 'Update your city to view relevant Shabbat times.',
    TODAY: 'Today is Shabbat! Enjoy your rest.',
    daysLeft: (countdown) => `${countdown} days until Shabbat.`,
    times: (city) => `Times apply to ${city}.`
  })
});