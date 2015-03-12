//Parse API
var Parse = require('node-parse-api').Parse;
//Express
var express = require('express');
var app_express = express();
//Other Mods
var path = require('path');
var bodyParser = require('body-parser')

//For Parse API
var options = {
    app_id: 'd8DVPfw910FyMIlUIroB41Yr7bm1p2MwiDk6yYo9',
    api_key: 'KqeF5L73PN6r9OvdXBflEYNwMHViD5Bmd4LuP4nH' // master_key:'...' could be used too
}

var app_parse = new Parse(options);
console.log(app_parse);

app_parse.find('User', '0OWlJ9HxlD', function(err, response) {
    console.log(response);
});
//End Parse API
//****************************************************************
//Express Module
app_express.set('views', path.join(__dirname, 'views'));
app_express.set('view engine', 'ejs');
//middleware
app_express.use(bodyParser.urlencoded({extended: false}));


// Register request handlers for each route.
//GET
app_express.get('/', function(req, res) {
    res.render('index', {title: 'boom'});
});
//POST
app_express.post('/login', function(req, res) {
    req.assert('username', 'User Name is required').notEmpty();           //Validate name
    req.assert('email', 'required').notEmpty();
    req.assert('email', 'valid email required').isEmail();
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    app_parse.insert('User',
            {
                username: username,
                password: password,
                email: email
            }, function(err, response) {
        console.log(response);
    });

    res.redirect('/');
});
app_express.listen(3000)
