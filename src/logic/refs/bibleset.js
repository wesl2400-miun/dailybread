import { EXCERPT } from "./excerpt.js";

/** En lista på kategorier ur vilka bibelverser väljs. Shabbat-kategorin
 * finns inte här, eftersom denna läggs till enbart under shabbat-dagen.
 * @type {string[]}
 */
export const BIBLESET = [ 
  EXCERPT.PRAISE, 
  EXCERPT.STRENGTH,
  EXCERPT.TRIAL, 
  EXCERPT.PERSECUTION,
  EXCERPT.ISRAEL, 
];