const db = require('../db/knex'); // kendi db bağlantı dosyanı ekle!

// Profil görüntüle
exports.getProfile = async (req, res) => {
    const user = await db('users').where({ id: req.user.id }).first();
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

    // Güvenlik için şifreyi göndermiyoruz!
    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
};

// Profil güncelle
exports.updateProfile = async (req, res) => {
    const { email, fullName, birthDate, gender } = req.body;
    await db('users')
        .where({ id: req.user.id })
        .update({ email, fullName, birthDate, gender });

    // Güncellenmiş profili tekrar çek
    const user = await db('users').where({ id: req.user.id }).first();
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

    // Şifreyi göndermiyoruz!
    const { password, ...userWithoutPassword } = user;
    res.json({
        message: 'Profil güncellendi.',
        user: userWithoutPassword
    });
};


// Profil sil
exports.deleteProfile = async (req, res) => {
    await db('users').where({ id: req.user.id }).del();
    res.json({ message: 'Profil silindi.' });
};
