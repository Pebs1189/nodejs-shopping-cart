const fs = require('fs');
const { response } = require("express");
const { validationResult } = require('express-validator');

const Cart = require('../models/cart');
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));


const renderIndex = (req, res = response) => {
    res.render('index', { 
        title: 'NodeJS Shopping Cart',
        products: products
    });
};

const addId = (req, res = response) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    const product = products.filter((item) => {
      return item.id == productId;
    });

    cart.add(product[0], productId);
    req.session.cart = cart;
    res.redirect('/');
};

const getCart = (req, res = response) => {
    if (!req.session.cart) {
      return res.render('cart', {
        products: null
      });
    }

    const cart = new Cart(req.session.cart);

    res.render('cart', {
      title: 'NodeJS Shopping Cart',
      products: cart.getItems(),
      totalPrice: cart.totalPrice
    });
};

const removeId = (req, res = response, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
};

const getSession = (req, res = response, next) => {
  res.locals.session = req.session;
  next();
}

const catchAndFordwartoErrorHandler = (req, res = response, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}

const errorHandler = (err, req, res = response, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
}

const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    next();
};


const validarParamsPermitidas = (coleccion = '', colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
      throw new Error(`La colección ${coleccion} no está permitida: ${colecciones}`);
  }

  return true;
};

module.exports = {
    renderIndex,
    addId,
    getCart,
    removeId,
    getSession,
    catchAndFordwartoErrorHandler,
    errorHandler
}