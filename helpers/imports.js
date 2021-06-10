const path = require('path');

const express = require('express');
const session = require('express-session');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const index = require('../routes/index');
const { getSession, catchAndFordwartoErrorHandler, errorHandler } = require('../controllers/controller');

module.exports = {
    path, express, session, favicon, logger, cookieParser, bodyParser,
    hbs, index, getSession, catchAndFordwartoErrorHandler, errorHandler
}