const db = require('../db/knex'); // kendi db bağlantı dosyanı ekle!
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'gizliAnahtar';

// Kayıt ol
exports.register = async (req, res) => {
    const { username, password, email, fullName, birthDate, gender } = req.body;
    const userExists = await db('users').where({ username }).first();
    if (userExists) return res.status(400).json({ message: 'Kullanıcı zaten kayıtlı' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db('users').insert({ username, password: hashedPassword, email, fullName, birthDate, gender });
    res.json({ message: 'Kayıt başarılı' });
};

// Giriş yap
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await db('users').where({ email }).first();
    if (!user) return res.status(400).json({ message: 'Kullanıcı bulunamadı' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Şifre yanlış' });

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            birthDate: user.birthDate,
            gender: user.gender
        },
        SECRET_KEY,
        { expiresIn: '15m' }
    );

    res.json({ token });
};

// Şifre değiştir
exports.changePassword = async (req, res) => {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ message: 'Geçerli bir şifre giriniz.' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db('users').where({ id: req.user.id }).update({ password: hashedPassword });
    res.json({ message: 'Şifre başarıyla değiştirildi.' });
};
