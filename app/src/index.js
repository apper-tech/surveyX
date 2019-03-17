import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import Routes from './Routing';
import { Drizzle, generateStore } from 'drizzle';
import Survey from './contracts/Survey.json';

const options = { contracts: [Survey] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);


ReactDOM.render(Routes(drizzle), document.getElementById('root'));

