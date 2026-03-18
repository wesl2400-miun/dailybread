
/** Utgångsvärden som används vid fel så att appliaktionen kan fortsätta att köra
 * även om API-anropen misslyckas.
 * @type {{TEMP: number, WCODE: number, REGION: string, WIS_REF: string, PSALM_REF: string, CITY: string}}
 */
export const DEFAULT = Object.freeze({
  TEMP: 20,
  WCODE: 0,
  REGION: 'Europe',
  WIS_REF: 'Matthew7:12',
  PSALM_REF: 'Psalms117',
  CITY: 'Jerusalem'
});