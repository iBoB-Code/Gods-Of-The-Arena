import express from 'express';
import Type from '../models/typesModel';
import Gladiateur from '../models/gladiateursModel';
const gladiateursRouter = express.Router();
gladiateursRouter.route('/')
  .get((req, res) => {
    Gladiateur.find({})
    .populate('type')
    .exec((err, gladiateur) => {
      res.status(201).send(gladiateur)
    });
  })
  .post((req, res) => {
    Type.findOne({ name: req.body.type })
    .exec((err, type) => {
      let gladiateur = new Gladiateur({ ...req.body, type: type._id });
      gladiateur.save();
      res.status(201).send(gladiateur);
    });
  })

gladiateursRouter.use('/:gladiateurId', (req, res, next)=>{
  Gladiateur.findById( req.params.gladiateurId, (err,gladiateur)=>{
    if(err)
      res.status(500).send(err)
    else {
      req.gladiateur = gladiateur;
      next()
    }
  })
})
gladiateursRouter.route('/:gladiateurId')
  .get((req, res) => {
    res.json(req.gladiateur)
  })
  .put((req,res) => {
    req.gladiateur.custom = req.body.custom ? req.body.custom : req.gladiateur.custom;
    req.gladiateur.stats = req.body.stats ? req.body.stats : req.gladiateur.stats;
    req.gladiateur.save();
    res.status(201).send(req.gladiateur)
  })
  .delete((req,res)=>{
    req.gladiateur.remove(err => {
      if(err){
        res.status(500).send(err)
      }
      else{
        res.status(204).send('removed')
      }
    })
  })

export default gladiateursRouter;
