import express from 'express';
import Battle from '../models/battlesModel';
import Type from '../models/typesModel';
const battlesRouter = express.Router();
battlesRouter.route('/')
  .get((req, res) => {
    Battle.find({})
    .populate('fighterA')
    .populate('fighterB')
    .exec((err, battle) => {
      res.status(201).send(battle)
    });
  })
  .post((req, res) => {
    Type.findOne({ name: req.body.fighterA })
    .exec((err, typeA) => {
      Type.findOne({ name: req.body.fighterB })
      .exec((err, typeB) => {
        let battle = new Battle({ ...req.body, fighterA: typeA._id, fighterB: typeB._id });
        battle.save();
        res.status(201).send(battle);
      });
    });
  })

battlesRouter.use('/:battleId', (req, res, next)=>{
  Battle.findById( req.params.battleId, (err,battle)=>{
    if(err)
      res.status(500).send(err)
    else {
      req.battle = battle;
      next()
    }
  })
})
battlesRouter.route('/:battleId')
  .get((req, res) => {
    res.json(req.battle)
  })
  .put((req,res) => {
    req.battle.name = req.body.name;
    req.battle.save();
    res.json(req.battle)
  })
  .delete((req,res)=>{
    req.battle.remove(err => {
      if(err){
        res.status(500).send(err)
      }
      else{
        res.status(204).send('removed')
      }
    })
  })

export default battlesRouter;
