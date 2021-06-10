
const Normalize = require('../helpers/normalize');
const OnError = require('../helpers/onerror');
const ImportsApp = require('../helpers/imports');

module.exports = {
    ...Normalize,
    ...OnError,
    ...ImportsApp
}