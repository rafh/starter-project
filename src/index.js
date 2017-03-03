var style = require('./style/global.css');

import $ from 'jquery';

var app = document.getElementById('app');
app.innerHTML = `
    <div id="menu">
        <button id="loadPage1">Load Page 1</button>
        <button id="loadPage2">Load Page 2</button>
    </div>
    <div id="content">
        <h1>Homes</h1>
    </div>
`;

const theEl = document.getElementById('content');

document.getElementById('loadPage1').addEventListener('click', () => {
    System.import('./page-1')
        .then(pageModule => {
            theEl.innerHTML = pageModule.default;
        });
});

document.getElementById('loadPage2').addEventListener('click', () => {
    System.import('./page-2')
        .then(pageModule => {
            theEl.innerHTML = pageModule.default;
        });
});

if (DEVELOPMENT) {
    if (module.hot) {
        module.hot.accept();
    }
}
