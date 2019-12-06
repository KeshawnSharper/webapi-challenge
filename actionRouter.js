const express = require('express');
const db = require('./data/helpers/actionModel')
const actionRouter = express.Router();

actionRouter.get('/',(req, res) => {
    db.get()
    .then(i => res.status(200).json(i))
  });

actionRouter.get('/:id',validateActionId,(req, res) => {
  console.log(req.user)
  db.get(req.params.id)
  .then(i => res.status(200).json(i))
});


actionRouter.delete('/:id',validateActionId,(req, res) => {
  // do your magic!
  db.remove(req.params.id).then(
 i => db.get().then(i => res.status(200).json(i)))


});

actionRouter.put('/:id', validateUpdateId,validateAction,(req, res) => {
  // do your magic!
  db.update(req.params.id,req.body).then(i => db.get(req.params.id).then(i => res.status(200).json(i)))
});

//custom middleware

function validateActionId(req, res, next) {
  // do your magic!
  db.get(req.params.id).then(i => {
    if(!i){
      res.status(400).json({ message: "invalid user id" })
    }
    else{
      req.user = i 
      next()
    }
  })

}
function validateUpdateId(req, res, next) {
    // do your magic!
    db.get(req.params.id).then(i => {
      if(!i){
        res.status(400).json(null)
      }
      else{
        req.user = i 
        next()
      }
    })
  
  }
function validateAction(req, res, next){
  if(Object.keys(req.body).length === 0){
res.status(400).json({ message: "missing user data" })
  }
  else if (!req.body.notes && !req.body.description){
    res.status(404).json({ message: "missing required notes or description field" })
  }
  next()
};


module.exports = actionRouter;
