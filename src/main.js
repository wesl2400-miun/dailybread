import { element } from "./ui/utils/element.js";
import { AppView } from "./ui/views/AppView.js";
import { VIEW_ID } from "./ui/refs/view-id.js";
import { SCREEN } from "./ui/refs/screen.js";


/** Skapar alla vyer och sätter upp hela appen.
 */
const main = () => {
  
  const app = element(VIEW_ID.APP);
  const footer = element(VIEW_ID.FOOTER);
 
  const appView = new AppView(app, footer);
  appView.init(SCREEN.LOCATION);
}

/** Startar appen.
 */
main();

