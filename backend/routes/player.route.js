const express = require('express');
const app = express();
const playerRoute = express.Router();

//Player model
let Player = require('../models/Player');

//Post Method
playerRoute.post('/create', async (req, res) => {
    const data = new Player({
        personal_Details:[{
            First_Name: req.body.First_Name,
            Last_Name: req.body.Last_Name,
            Grade: req.body.Grade}],
        player_Details:[{
            position: req.body.position,
            jersey_number: req.body.jerseyNumber}],
        stats:[{
            goals_scored: req.body.goalsScored,
            assists: req.body.assists,
            goals_saved: req.body.goalsSaved}]
    })
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
playerRoute.get('/', async (req, res) => {
    try{
        const data = await Player.find();
        res.json(data)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
playerRoute.get('/read/:id', async (req, res) => {
    try{
        const data = await Player.findById(req.params.id);
        res.json(data)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
playerRoute.patch('/update/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new: true};

        const result = await Player.findByIdAndUpdate(
            id, updatedData, options
        )

        res.json(result)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})

//Delete by ID Method
playerRoute.delete('/delete/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Player.findByIdAndDelete(id)
        res.send(`Document with ${data.id} has been deleted...`)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = playerRoute;