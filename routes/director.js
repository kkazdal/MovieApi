const express = require("express");
const { Types } = require("mongoose");
const router = express.Router();
const Director = require("../models/Director");

router.post('/',  (req, res) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err );
    });
})

router.get('/',  (req, res) => {
    const promise = new Director.aggregate([
        {
            $lookup:{
                from:"movie",
                localField:"_id",
                foreignField:"director_id",
                as:"movies"
            }
        },
        {
            $unwind:{
                path:"$movies",
                preserveNullAndEmptyArrays:true//Yönetmeni olmayan yönetmenler de gelir,
            }
        },
        {
            $group:{
                _id:{
                    _id:"$_id",
                    name:"$name",
                    surname:"$surname",
                    bio:"$bio"
                },
                movies:{
                    $push:"$movies",
                }
            }
        },
        {
            $project:{
                _id:"$_id._id",
                name:"$_id.name",
                surname:"_id.$surname",
                bio:"$_id.bio",
                movies:"$movies",
            }
        }

    ]);

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err );
    });
})

router.get('/',  (req, res) => {
    const promise = new Director.aggregate([
        {
          $match:{
            "_id":Types.ObjectId(req.params.director_id),
          }      
        },
        {
          
            $lookup:{
                from:"movie",
                localField:"_id",
                foreignField:"director_id",
                as:"movies"
            }
        },
        {
            $unwind:{
                path:"$movies",
                preserveNullAndEmptyArrays:true//Yönetmeni olmayan yönetmenler de gelir,
            }
        },
        {
            $group:{
                _id:{
                    _id:"$_id",
                    name:"$name",
                    surname:"$surname",
                    bio:"$bio"
                },
                movies:{
                    $push:"$movies",
                }
            }
        },
        {
            $project:{
                _id:"$_id._id",
                name:"$_id.name",
                surname:"_id.$surname",
                bio:"$_id.bio",
                movies:"$movies",
            }
        }

    ]);

    promise.then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err );
    });
})

router.put('/:directorId', (req, res) => {
    const promise = Movie.findByIdAndUpdate(req.params.directorId,req.body,{
        new:true
    });
  
    promise.then((data)=>{
      res.json(data);
     }).catch((err)=>{
       res.json(err);
     });
});

router.delete('/:directorId', (req, res, next) => {
    const promise = Movie.findByIdAndRemove(req.params.directorId);
    promise.then((data)=>{
     if(!data){
       next({message:"The movie was not found.", code:100});
       return;
     }
     res.json(data);
    }).catch((err)=>{
      res.json(err);
    });
})

module.exports = router;