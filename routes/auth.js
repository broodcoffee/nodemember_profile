const express = require('express');
const router = express.Router();

const regController = require('../controllers/authAccount');

router.post('/login', regController.login);
router.post('/register', regController.register);
router.get('/updateform/:email_address', regController.update_form);
router.post('/update_user', regController.update_user);
router.get('/delete/:email_address', regController.delete_user);

module.exports = router;