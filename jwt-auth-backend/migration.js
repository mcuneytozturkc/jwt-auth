const db = require('./db');

db.schema.hasTable('users').then(exists => {
    if (!exists) {
        return db.schema.createTable('users', t => {
            t.increments('id').primary();
            t.string('username').unique().notNullable();
            t.string('email').unique().notNullable();
            t.string('fullName');
            t.string('birthDate');
            t.string('gender');
            t.string('password');
        })
            .then(() => {
                console.log('Kullanıcı tablosu oluşturuldu!');
                process.exit();
            });
    } else {
        console.log('Kullanıcı tablosu zaten var!');
        process.exit();
    }
});
