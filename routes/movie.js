const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie");

router.post('/', (req, res, next) =>{
  const movie = new Movie(req.body);
  const promise = movie.save();
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

router.get('/', (req, res) => {
 const promise = Movie.aggregate([{
  $lookup:{
    from:"director",
    localField:"director_id",
    foreignField:"_id",
    as:"director"
  }
 },
 {
  $unwind:"$director"
 }
]);
 promise.then((data)=>{
  res.json(data);
}).catch((err)=>{
  res.json(err);
});
})

router.get('/top10', (req, res) => {
  const promise = Movie.find({}).limit(10).sort({imdb_score: -1});

  promise.then((data)=>{
   res.json(data);
 }).catch((err)=>{
   res.json(err);
 });
})

router.get('/:movieId', (req, res, next) => {
 const promise = Movie.findById(req.params.movieId);
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

router.put('/:movieId', (req, res) => {
  const promise = Movie.findByIdAndUpdate(req.params.movieId,req.body);

  promise.then((data)=>{
    res.json(data);
   }).catch((err)=>{
     res.json(err);
   });
});

router.delete('/:movieId', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movieId);
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
