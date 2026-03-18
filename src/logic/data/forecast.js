/**
 * Väderkoder som används för att räkna ut vilken bibelvers som väljs. 
 * Ju värre väder, desto mer stärkande bibelverser.
 * @typedef {Object} FORECAST
 * @property {number[]} GOOD - lista med koder för bra väder
 * @property {number[]>} BAD - lista med koder för regnigt och molnigt väder
 * @property {number[]} TERRIBLE - lista med koder för oväder
 */
export const FORECAST = Object.freeze({
  GOOD: [0, 1, 2],
  BAD: [3, 45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  TERRIBLE: [71, 73, 75, 77, 85, 86, 95, 96, 99]
});