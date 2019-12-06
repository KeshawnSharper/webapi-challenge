const express = require('express');
const db = require('./data/helpers/projectModel')
const actionDb = require('./data/helpers/actionModel')
const projectRouter = express.Router();

projectRouter.post('/',validateProject,(req, res) => {
  db.insert(req.body).then(user =>
    res.status(201).json(user)).catch(error =>{
    res.status(500).json(error);
})})
projectRouter.post('/:id/actions',validateProjectId,validateAction,(req, res) => {
    // do your magic!
    actionDb.insert(req.body).then(post => 
      {res.status(201).json(post)})
  });
projectRouter.get('/',(req, res) => {
    console.log(req.user)
    db.get()
    .then(i => res.status(200).json(i))
    .catch(err => res.status(500).json(err))
  });

projectRouter.get('/:id',validateProjectId,(req, res) => {
  console.log(req.user)
  db.get(req.params.id)
  .then(i => res.status(200).json(i))
});

projectRouter.get('/:id/posts', (req, res) => {
  // do your magic!
  db.getUserPosts(req.params.id).then(
    i => res.status(200).json(i)
  )
});

projectRouter.delete('/:id',validateProjectId,(req, res) => {
  // do your magic!
  db.remove(req.user.id).then(
 i => db.get().then(i => res.status(200).json(i)))


});

projectRouter.put('/:id', validateUpdateId,validateProject,(req, res) => {
  // do your magic!
  db.update(req.params.id,req.body).then(i => db.get(req.params.id).then(i => res.status(200).json(i)))
});

//custom middleware

function validateProjectId(req, res, next) {
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
function validateProject(req, res, next){
  if(Object.keys(req.body).length === 0){
res.status(400).json({ message: "missing user data" })
  }
  else if (!req.body.name){
    res.status(404).json({ message: "missing required name field" })
  }
  next()
};
function validateAction(req, res, next) {
    // do your magic!
    if(Object.keys(req.body).length === 0){
      res.status(400).json({ message: "missing action data" })
        }
        else if (!req.body.description && !req.body.notes){
          res.status(400).json({ message: "missing required text or notes field" })
        }
        req.body.project_id = req.params.id
        next()
  }


module.exports = projectRouter;
