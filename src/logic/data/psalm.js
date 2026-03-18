import { Passage } from "../models/Passage.js";
import { Scripture } from "../models/Scripture.js";

/**
 * Lagrar ett psalmavsnitt som visas om API-anrop för psalmer misslyckas.
 * @type {Scripture<string, Passage[]>}
 */

export const PSALM = new Scripture('Psalms 117', [
    new Passage('1', 'O praise the Lord, all ye nations: praise him, all ye people.'),
    new Passage('2', 'For his merciful kindness is great toward us: and the truth of the Lord endureth for ever. Praise ye the Lord.')
  ]
);