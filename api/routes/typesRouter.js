import express from 'express';
import Type from '../models/typesModel';
const typesRouter = express.Router();
typesRouter.route('/')
  .get((req, res) => {
    Type.find({}, (err, type) => {
      res.json(type)
    })
  })
  .post((req, res) => {
    let type = new Type(req.body);
    type.save();
    res.status(201).send(type)
  })

typesRouter.use('/:typeId', (req, res, next)=>{
  Type.findById( req.params.typeId, (err,type)=>{
    if(err)
      res.status(500).send(err)
    else {
      req.type = type;
      next()
    }
  })
})
typesRouter.route('/:typeId')
  .get((req, res) => {
    res.json(req.type)
  })
  .put((req,res) => {
    req.type.name = req.body.name;
    req.type.save();
    res.json(req.type)
  })
  .delete((req,res)=>{
    req.type.remove(err => {
      if(err){
        res.status(500).send(err)
      }
      else{
        res.status(204).send('removed')
      }
    })
  })

export default typesRouter;
