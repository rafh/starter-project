var style = require('./style/button.scss');
var style = require('./style/global.scss');

import $ from 'jquery';

var app = document.getElementById('app');
app.innerHTML = `
    <div id="menu">
        <a id="loadPage1" class="btn btn--shimmer"><span>Gallery</span></a>
        <a id="loadPage2" class="btn btn--shimmer"><span>Blog</span></a>
    </div>
    <div id="content">
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
