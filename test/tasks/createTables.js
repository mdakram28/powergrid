"use strict";

require('../utils/rootRequire')();
let Reading = rootRequire('app/models/reading.js');

Reading.sync().then(() => {
    console.log('Creating reading Book');
});
