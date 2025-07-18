const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 8888,
        user: 'postgres',
        password: 'muhsin123',
        database: 'jwt_auth_app'
    }
});
module.exports = knex;
