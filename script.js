/*
1.get all the elements from HTML
2.initialize the values of scores and wickets to 0 and team1
3.create an array to store possible outcomes
4. create diff functions
    a. strike
    b. reset
    c. update
    d. gameover
*/

let strike= document.getElementById("strike")
let reset=document.getElementById("reset")

//team india
let IndiaScores=document.getElementById("scoreind")
let IndiaWickets=document.getElementById("wicketsind")

//team pakistan
let PakScores=document.getElementById("scorepak")
let PakWickets=document.getElementById("wicketspak")


let Team1Scores=0;
let Team2Scores=0;
let Team1Wickets=0;
let Team2Wickets=0;

let Turn=1;
let Team1BallsFaced=0;
let Team2BallsFaced=0;

let PossibleOutcomes=[0,1,2,3,4,6,"W"];

//audio
let gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer")
let StrikeAudio=new Audio("http://bit.ly/so-ball-hit")

function GameOver() {
    gameOverAudio.play();

    var resultMessage;

    switch (true) {
        case Team1Scores > Team2Scores:
            resultMessage = "Team India Wins";
            break;
        case Team1Scores < Team2Scores:
            resultMessage = "Team Pak Wins";
            break;
        case Team1Scores === Team2Scores:
            resultMessage = "We'll have another SuperOver!!!";
            break;
        default:
            resultMessage = "Game Result Unknown";
            break;
    }
    alert(resultMessage);
}


function UpdateScores(){
    IndiaScores.textContent=Team1Scores;
    PakScores.textContent=Team2Scores;
    IndiaWickets.textContent=Team1Wickets;
    PakWickets.textContent=Team2Wickets;


}

reset.onclick=()=>{
    //reload the page
    window.location.reload();

}

strike.onclick=()=>{
    //play song
    StrikeAudio.pause()
    StrikeAudio.currentTime=0;
    StrikeAudio.play();

    //generate random number
    let randomNumber=PossibleOutcomes[Math.floor(Math.random()*PossibleOutcomes.length)]
    console.log(randomNumber)
    
    //second batting
    if(Turn==2){
        //increase the ball count
        //update score in the white circle
        //if wicket, update the wicket
        Team2BallsFaced++;
        document.querySelector(`#pak div:nth-child(${Team2BallsFaced})`).textContent= randomNumber;

        if(randomNumber=="W"){
            Team2Wickets++;
            UpdateScores()

        }else{
            Team2Scores+=randomNumber;
            UpdateScores()
            
        }

        if(
            Team2BallsFaced===6 || Team2Wickets==2|| Team2Scores>Team1Scores
        ){
            Turn=3;
            GameOver();
        }
    }

    else if (Turn==1){
        Team1BallsFaced++;
        document.querySelector(
            `#ind div:nth-child(${Team1BallsFaced})`
        ).textContent=randomNumber;
        if (randomNumber==="W"){
            Team1Wickets++;

        }else{
            Team1Scores+=randomNumber;
            console.log(Team1Scores)
        }
        UpdateScores()
        if((Team1BallsFaced===6) || (Team1Wickets===2)) {
            Turn=2
        }
    }
    
    
}