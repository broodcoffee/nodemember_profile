const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.render('index'); 
}); 

router.get('/register', (request, response) => {
    response.render('registration'); 
});

router.get('/list', (request, response) => {
    response.render('list'); 
});

module.exports = router;