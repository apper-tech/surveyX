import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import Routes from './Routing';
import { Drizzle, generateStore } from 'drizzle';
import Survey from './contracts/Survey.json';

const options = {
    contracts: [Survey],
    web3: {
        fallback: {
            type: "ws",
            url: "ws://127.0.0.1:9545",
        }
    }
};

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);


ReactDOM.render(Routes(drizzle), document.getElementById('root'));

