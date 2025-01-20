const asyncHandler = require('express-async-handler')

const Score = require('../model/scoreModel')
const User = require('../model/userModel')



const addScore = asyncHandler( 
    async (req,res) => {

        const { user, score } = req.body;

        try {
          const updatedScore = await Score.findOneAndUpdate(
            { user:req.user.id, userName:req.user.name },
            { $inc: { score: score } }, // Increment the totalScore by the new score
            { new: true, upsert: true } // Create a new entry if it doesn't exist
          );
      
          res.status(201).json({
            message: 'Score updated successfully',
            score: updatedScore.score,
          });
        } catch (error) {
          res.status(500).json({ message: 'Failed to update score', error });
        }


    }
) 



const getScore = asyncHandler(async(req,res) => {
  const {userName} = req.query
  try {

    const userScore = await Score.findOne({userName})

    res.status(200).json(userScore)
    
  } catch (error) {
    req.status(500).json({message:'error fetching user data'})
  }
})






module.exports = {
   
    addScore,
    getScore
 
}