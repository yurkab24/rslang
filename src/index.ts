import './index.scss';
import './style';
import App from './pages/app/app';
import { addElementWrapper, addElementSection, addButtonsOfSection } from './views';

const app = new App();
app.run();

addElementWrapper();
addElementSection();
addButtonsOfSection();
