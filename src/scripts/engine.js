const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector(".lives")
    },
    values: {
       
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        livess: 3,
        
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
        timerId: setInterval(randomSquare, 1000),
    },
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Fim de jogo! O seu resultado foi: " + state.values.result);
        resetGame();
    }else if(state.values.livess === 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Você perdeu todas as vidas! O seu resultado foi: " + state.values.result);
        resetGame();
    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.mp3")
    audio.volume = 0.2;
    audio.play()
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    })
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }else if(square.id != state.values.hitPosition){

                state.values.livess = Math.max(0, state.values.livess - 1); // Evita valores negativos
                state.view.lives.textContent = state.values.livess;

            }

        })
    });
}





function resetGame() {
    // Vai Reiniciar os valores do jogo
    state.values.currentTime = 60;
    state.values.result = 0;
    state.values.livess = 3;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;
    state.view.lives.textContent = state.values.livess;

    // Vai Reiniciar os temporizadores
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}



function init(){
    moveEnemy();
    addListenerHitBox();
}

init();