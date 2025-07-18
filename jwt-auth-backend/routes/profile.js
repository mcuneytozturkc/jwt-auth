const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

// Profil görüntüle (korumalı)
router.get('/', authMiddleware, profileController.getProfile);

// Profil güncelle (korumalı)
router.put('/', authMiddleware, profileController.updateProfile);

// Profil sil (korumalı)
router.delete('/', authMiddleware, profileController.deleteProfile);

module.exports = router;
