// ..js/gameState.js
// 管理遊戲的全域狀態與變數

export const gameStates = {

    // 遊戲狀態
    currentGameState  : 'mainMenu',  // 遊戲階段 'mainMenu', 'toolSelection', 'playing', 'gameOver'
    isGameOver : false,

    // 分數相關
    score : 0,
    highScore : 0,
    timeLeft : 60,

    gameInterval:null, // 用於儲存 setInterval 的 ID
    gameStartTime:null , // 用於儲存遊戲開始的時間
    gameEndTime:null , // 用於儲存遊戲結束的時間
    gameTime : 0, // 遊戲時間

};



