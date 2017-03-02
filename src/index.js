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

import { multiply } from './mathStuff';
const newMessage = () => (`
    DEV: ${DEVELOPMENT.toString()}<br>
    PROD: ${PRODUCTION.toString()}<br>
`);

var app = document.getElementById('app');
app.innerHTML = newMessage();

// Button.attachEl();

if (DEVELOPMENT) {
    if(module.hot) {
        module.hot.accept();
    }
}
