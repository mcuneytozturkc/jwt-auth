const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Yeni router dosyanı burada kullan!
app.use('/auth', require('./routes/auth'));

// Diğer endpointler (ör. profile, users) burada olacak

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server ${PORT} portunda başladı`));
app.use('/profile', require('./routes/profile'));
