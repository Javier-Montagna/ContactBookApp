'use strict';

var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

const contactsContainer = require('./contacts.json');


app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      next();
  });

app.set('port', (process.env.PORT || 9001));

/**
 * GET /tasks
 * 
 * Return the list of tasks with status code 200.
 */
app.get('/contacts', (req, res) => {
  return res.status(200).json(contactsContainer);
});

app.listen(app.get('port'), () => {
  process.stdout.write('the server is available on http://localhost:' + app.get('port') + '/\n');
});
