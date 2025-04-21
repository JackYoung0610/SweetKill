// ..js/inputLogic.js

import { init_central } from '../main.js';

import { gameStates } from './gameState.js';
import { isInsideRectangle } from './utils.js';

//處理按下鍵盤
export function procKeyDown(ctx, gameCanvas, event) {
    
    console.log('Debug: procKeyDown event.code)' , event.code);
    console.log(`Debug: procClick gameStates.currentGameState = ${gameStates.currentGameState}  :)`);

    // 根據目前的遊戲階段執行不同的邏輯
    switch (gameStates.currentGameState) {
        case 'mainMenu':

            switch (event.code) {
                case 'KeyC':
                    clearHighScore();
                    break;
                case 'Space':
                    toToolSelection()
                    break;
                default:
                    //nothing to do
            }

            return

        case 'toolSelection':

             switch (event.code) {
                    case 'KeyC':
                        clearHighScore();
                        break;
                    case 'Space':
                        toPlaying()
                        break;
                    default:
                        //nothing to do
                }

            return;

        case 'playing':
             
            switch (event.code) {
                    case 'KeyC':
                        clearHighScore();
                        break;
                    case 'Space':
                        toGameOver()
                        break;
                    default:
                        //nothing to do
                }

            return;

        case 'gameOver':
            
             switch (event.code) {
                    case 'KeyM':
                        toMainMenu()
                        break;
                    case 'KeyR':
                        toPlaying()
                        break;
                    case 'KeyT':
                        toToolSelection()
                        break;
                    case 'Space':
                        toMainMenu()
                        break;
                    default:
                        //nothing to do
                }
            return;

        default:
            console.warn('Unknown game state:', gameStates.currentGameState);
    }

}

//處理放開鍵盤
export function procKeyUp(ctx, gameCanvas, event) {

    //console.log('Debug: procKeyUp event.code)' , event.code);

     // 根據目前的遊戲階段執行不同的邏輯
    switch (gameStates.currentGameState) {
        case 'mainMenu':

            switch (event.code) {
                case 'KeyC':
                    break;
                case 'Space':
                    break;
                default:
                    //nothing to do
            }

            return;

        case 'toolSelection':

            return;

        case 'playing':
             
            return;

        case 'gameOver':

            return;

        default:
            console.warn('Unknown game state:', gameStates.currentGameState);
    }
}

//處理點擊效果
export function procClick(ctx, gameCanvas, x, y) {
    
    console.log(`Debug: gameStates.currentGameState : )`,gameStates.currentGameState);
    console.log(`Debug: procClick x = ${x} , y = ${y} :)`);

    // 根據目前的遊戲階段執行不同的邏輯
    switch (gameStates.currentGameState) {
        case 'mainMenu':

            toToolSelection()

            return;

        case 'toolSelection':

            toPlaying()

            return;

        case 'playing':
             
             toGameOver()

            return;

        case 'gameOver':
            // 檢查是否點擊到重新開始或回到主畫面按鈕
            if (isInsideRectangle(x, y, gameCanvas.toToolSelectionButtonArea)) {
                toToolSelection()
            } else if (isInsideRectangle(x, y, gameCanvas.toPlayingButtonArea)) {
                toPlaying()
            }else if (isInsideRectangle(x, y, gameCanvas.toMainMenuButtonArea)) {
                toMainMenu();
            }
            return;

        default:
            console.warn('Unknown game state:', gameStates.currentGameState);
    }

}

//處理放開點擊效果
export function procRelease (ctx, gameCanvas, x, y) {

    //console.log(`Debug: procRelease x = ${x} , y = ${y} :)`);

    // 根據目前的遊戲階段執行不同的邏輯
    switch (gameStates.currentGameState) {
        case 'mainMenu':

            return;

        case 'toolSelection':

            return;

        case 'playing':

            return;

        case 'gameOver':

            return;

        default:
            console.warn('Unknown game state:', gameStates.currentGameState);
    }
}

//處理視窗大小變化
export function procWindowResize(){
    init_central( {bInitGameCanvas : true});
}



//回到主畫面
function toMainMenu() {

        init_central( {bInitAll : true  } );
        gameStates.currentGameState = 'mainMenu';
}

//進入工具選擇
function toToolSelection() {

    gameStates.currentGameState = 'toolSelection';

}

//進入遊戲
function toPlaying() {

    gameStates.currentGameState = 'playing';

}

//進入結算畫面
function toGameOver() {

    gameStates.currentGameState = 'gameOver';

}

//開始計時
function startGameTimer() {
    gameStates.gameInterval = setInterval(() => {
        if (gameStates.gameState === 'playing' && !gameStates.isGameOver) {
            gameStates.timeLeft -= 1;
            if (gameStates.timeLeft <= 0) {
                gameStates.isGameOver = true;
                clearInterval(gameStates.gameInterval); // 時間結束時清除 interval
            }
        }
    }, 1000); // 每 1000 毫秒 (1 秒) 執行一次
    gameStates.gameStartTime = Date.now(); // 記錄遊戲開始的確切時間
}

//將最高分清除為0
function clearHighScore() {

        localStorage.setItem('highScore', 0);
        init_central( {bInitGameStates : true });

}
