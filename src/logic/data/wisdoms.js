import { EXCERPT } from "../refs/excerpt.js";

/**
 * Lagrar referenser till psalmavsnitt enligt olika kategorier.
 * Nyckeln är enumvärdet EXCERPT medan värdet är en lista med referenser till verser från Nya Testamentet.
 * @type {Map<EXCERPT, string[]>} 
 */

export const WISDOMS = new Map([
  [EXCERPT.PRAISE, [
    'Mark10:14', 'John17:4', 'John17:23', 'John17:20', 'John13:31',
    'John13:34', 'John13:35', 'John13:13', 'John13:15', 'John12:46'
  ]],
  [EXCERPT.STRENGTH, [
    'Mark10:43', 'Mark9:23', 'Mark11:24', 'Mark11:25', 'Mark12:30',
    'Mark12:31', 'Mark13:11', 'Mark13:35', 'Luke22:32', 'John16:33',
  ]],
  [EXCERPT.TRIAL, [
    'Matthew6:14', 'Matthew6:20', 'Matthew6:26', 'Matthew5:39', 'Matthew5:44',
    'Matthew5:46', 'Matthew5:10', 'Matthew24:44', 'Luke6:40', 'Luke10:9'
  ]],
  [EXCERPT.PERSECUTION, [
    'Mark8:34', 'Mark8:35', 'Mark8:36', 'Mark8:38', 'Matthew24:13',
    'Matthew5:12', 'Matthew10:16', 'Matthew10:17', 'Matthew5:11', 'Matthew 10:28'
  ]],
  [EXCERPT.ISRAEL, [
    'John6:37', 'John:10:16', 'John6:39', 'John6:58', 'John13:45',
    'John14:18', 'Luke15:32', 'Luke19:10', 'Luke13:35', 'Matthew26:64'
  ]],
  [EXCERPT.SHABBAT, [
    'Luke6:5', 'Mark2:27', 'Matthew11:28', 'Matthew5:5', 'Matthew6:34',
    'Matthew5:16', 'Luke9:23', 'Luke11:28', 'John3:6', 'John4:23'
  ]]
]);