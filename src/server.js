const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('dist'));
app.post('/users', (req, res) => res.jsonp({ message: 'thanks!' }));

app.listen(PORT, () => console.log('Webserver listening on ' + PORT));