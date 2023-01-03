const express = require('express');
const router = express.Router();
var todos = [];

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  try{
    return res.status(200).json(todos)
  } catch (e){
    return  res.status(400).json(e);
  }
});
router.post('/new', function(req, res, next) {
  try {
    const todo = req.body;

    todo.uuid = CreateUUID()

    todos.push(todo);

    return res.status(200).json(todo);
  } catch (e) {
    return res.status(400).json(e)
  }
});
router.post('/finish/:id', function(req, res, next) {
  try {
    const { id } = req.params;
    let todo = todos.find(x => x.uuid == id)
    todos[todos.indexOf(todo)].finished = !todos[todos.indexOf(todo)].finished

    return res.status(200).json();

  } catch (e) {
    return res.status(400).json(e)
  }
});
router.delete('/delete/:id', function(req, res, next) {
  try {
    const { id } = req.params;
    let todo = todos.find(x => x.uuid == id)
    todos.splice(todos.indexOf(todo), 1)

    return res.status(204).json();

  } catch (e) {
    return res.status(400).json(e)
  }
});

function CreateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


module.exports = router;
