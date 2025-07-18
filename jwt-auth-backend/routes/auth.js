const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Kayıt ol
router.post('/register', authController.register);

// Giriş yap
router.post('/login', authController.login);

// Şifre değiştir (giriş yapmış kullanıcı)
router.post('/change-password', authMiddleware, authController.changePassword);

module.exports = router;
