const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/survey', (req, res) => {
  if (req.body) {
    try {
      const { age, gender } = req.body;
      if (typeof age === 'number' && age > 0 && typeof gender === 'string') {
        res
          .status(201)
          .jsonp({
            message: 'Survey Accepted'
          });
      }
      else {
        throw new Error('malformed_request');
      }
    }
    catch (e) {
      res
        .status(400)
        .jsonp({
          error_code: 'malformed_request',
          error_description: 'The server rejected the survey data.'
        });
    }
  }
  else {
    res
      .status(400)
      .jsonp({
        error_code: 'invalid_request',
        error_description: 'Missing required fields.'
      });
  }
});
app.route('**', (req, res) => res.status(404).send('Page Not Found'));

app.listen(PORT, () => console.log('Webserver listening on ' + PORT));