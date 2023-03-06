export class Player {
    personal_Details:[{
        First_Name: {type: String, required: true},
        Last_Name: {type: String, required: true},
        Grade: {type: String, required: true}}];
    player_Details:[{
        position: {type: String, required: true},
        jersey_number: {type: Number, required: true}}];
    stats:[{
        goals_scored:  {type: Number, required: true},
        assists:  {type: Number, required: true},
        goals_saved:  {type: Number, required: true}}];
}
