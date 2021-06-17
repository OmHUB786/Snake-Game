let inputDir = {x:0, y:0};
const foodsound = new Audio("food.mp3");
const movesound = new Audio('move.mp3');
const gameOverSound = new Audio('gameover.mp3');
const backgroundMusic = new Audio('music.mp3');
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
]
snakefood = {x:6, y:8};



function main(currentTime)
{
    window.requestAnimationFrame(main);
    // console.log(currentTime);
    if((currentTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}
function isCollide(snake){
    // if u collid with urself
    for(let index = 1;index < snakeArr.length;index++)
    {
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
    {
        return true; 
    }
}
function gameEngine()
{
    // Update the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        backgroundMusic.pause();
        inputDir = {x: 0, y: 0};
        alert("GAME OVER! Press any key to play again");
        snakeArr = [{x:13, y:15}];
        backgroundMusic.play();
        score = 0;
    }
    //if u have eaten the food then regenerate the food and increment the score
    if(snakeArr[0].y==snakefood.y  && snakeArr[0].x==snakefood.x){
        foodsound.play();
        score += 1;
        if(score > hiscoreval)
        {
            hiscoreval = score;
            localStorage.setItem("highScore", JSON.stringify(hiscoreval));
            highScore.innerHTML = "HiScore :" + hiscoreval;
        }
        scoreBox.innerHTML = "Score :" + score;
        let a = 2;
        let b = 16;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        snakefood = {x:Math.round(a + (b-a)* Math.random()),y:Math.round(a + (b-a)* Math.random())};
    }

    //Moving of Snake
    for(let i=snakeArr.length - 2; i>=0 ; i--)
    {
        const element = snakeArr[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // display the snke:
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snakebody');
        if(index==0)
        {
            snakeElement.classList.add('snakehead');
        }
        else{
            snakeElement.classList.add('snakebody');
        }
        board.appendChild(snakeElement);
    })

    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = snakefood.y;
    foodElement.style.gridColumnStart = snakefood.x;
    foodElement.classList.add('snakefood');
    board.appendChild(foodElement);

}
    

// main logic 
let hiscore = localStorage.getItem('hiscore');
if(hiscore === null)
{
    hiscoreval = 0;
    localStorage.setItem("highScore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(hiscore);
    highScore.innerHTML = "HiScore :" + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x: 0, y: 1};
    movesound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("Arrowleft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;

    }

})
