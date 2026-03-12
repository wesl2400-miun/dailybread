import { element } from "./ui/utils/element.js";
import { AppView } from "./ui/views/AppView.js";
import { VIEW_ID } from "./ui/refs/view-id.js";
import { SCREEN } from "./ui/refs/screen.js";


const main = async () => {
  
  const app = element(VIEW_ID.APP);
  const footer = element(VIEW_ID.FOOTER);
 
  const appView = new AppView(app, footer);
  await appView.init(SCREEN.LOCATION);
}

await main().catch((error) => {
  console.log(error)
});

