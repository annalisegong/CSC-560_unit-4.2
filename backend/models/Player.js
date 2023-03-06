const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
const Player = new Schema({
    personal_Details:[{
        First_Name: {type: String, required: true},
        Last_Name: {type: String, required: true},
        Grade: {type: String, required: true}}],
    player_Details:[{
        position: {type: String, required: true},
        jersey_number: {type: Number, required: true}}],
    stats:[{
        goals_scored:  {type: Number, required: true},
        assists:  {type: Number, required: true},
        goals_saved:  {type: Number, required: true}}]
    }, 
    {
        collection: 'players'
    })
module.exports = mongoose.model('Player', Player)