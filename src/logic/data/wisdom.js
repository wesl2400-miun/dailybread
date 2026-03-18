import { Passage } from "../models/Passage.js";
import { Scripture } from "../models/Scripture.js";

/**
 * Lagrar en vers ur Nya Testamentet som visas om API-anrop för visdomsord misslyckas.
 * @type {Scripture<string, Passage[]>}
 */

export const WISDOM = new Scripture(
  'Matthew 7', [
    new Passage('12', 'So in everything, do to others what you would have them do to you, for this sums up the Law and the Prophets.')
  ]
);