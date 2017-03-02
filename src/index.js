var style = require('./style/global.css');

var messages = require('./messages');

// import Button from './button';
// import Jungle from './image';

// var newMessage = () => (`
//     <p>
//         ${messages.hi} ${messages.event}
//         ${Jungle}
//     </p>
//
// `);
// var newMessage = () => (Button.button);
// import from './style/global';
import { multiply } from './mathStuff';
const newMessage = () => (`
    <div class="${style.box}">
    DEV: ${DEVELOPMENT.toString()}<br>
    PROD: ${PRODUCTION.toString()}<br>
    </div>
`);

var app = document.getElementById('app');
app.innerHTML = newMessage();

// Button.attachEl();

if (DEVELOPMENT) {
    if(module.hot) {
        module.hot.accept();
    }
}
