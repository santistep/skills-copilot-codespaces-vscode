// create web server
// create an array of comments
// create a route for GET /comments
// create a route for POST /comments
// create a route for DELETE /comments/:id

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let comments = [
  {id: 1, author: 'Anonymous', body: 'Hello world!'},
  {id: 2, author: 'Anonymous', body: 'This is a comment.'},
  {id: 3, author: 'Anonymous', body: 'This is another comment.'}
];

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const comment = req.body;
  comment.id = comments.length + 1;
  comments.push(comment);
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  comments = comments.filter(comment => comment.id !== id);
  res.json({status: 'ok'});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
