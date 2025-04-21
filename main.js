// SweetKill - main.js
// 版本號: 0.001
export const gameVersion = 'v 0.001'

import { resolutionScaleX, resolutionScaleY } from './js/constants.js';
import { gameStates, } from './js/gameState.js';
import { drawGamePhase_mainMenu, rawGamePhase_toolSelection, rawGamePhase_playing, rawGamePhase_gameOver} from './js/drawing.js';
import { addEventListeners, removeEventListeners } from './js/eventHandlers.js';
import { getHighScore,  calculateButtonArea } from './js/utils.js';

export {  init_central };

// 獲取 canvas 元素
const gameCanvas = document.getElementById('gameCanvas');
if (!gameCanvas) {
    throw new Error('Canvas element with id "gameCanvas" not found.');
}

// 獲取 2D 渲染上下文
const ctx = gameCanvas.getContext('2d');
if (!ctx) {
    throw new Error('Failed to get 2D context for canvas.');
}

// 初始化 中央室
function init_central(options = {}) {
 
    const { bInitAll = false, 
                    // 初始化選項
                    bInitGameCanvas = false, bInitGameStates = false,bInitBackgroud = false , bInitMainCat = false, bInitObjects = false,

                    bRandSelectCat = false 

                } = options;

    // 初始化畫布
    if (bInitAll || bInitGameCanvas){
        init_gameCanvas();
    }

    // 初始化遊戲狀態
    if (bInitAll || bInitGameStates){
        init_gameStates();
    }
}

// 初始化 遊戲畫布
function init_gameCanvas() {
    // 設定 gameCanvas 的寬度與高度
    gameCanvas.width = window.innerWidth * resolutionScaleX;
    gameCanvas.height = window.innerHeight * resolutionScaleY;
}

// 初始化 遊戲狀態
function init_gameStates() {

    // 初始化分數與遊戲狀態
    gameStates.score = 0;
    gameStates.highScore = getHighScore();
    gameStates.timeLeft = 60;

    gameStates.isGameOver = false;
    gameStates.gameState = 'mainMenu';

    gameStates.gameStartTime = null;
    // 清除之前的 interval
    if (gameStates.gameInterval) {
        clearInterval(gameStates.gameInterval);
        gameStates.gameInterval = null;
    }
}

function update() {
    // 根據目前的遊戲階段執行不同的邏輯
    switch (gameStates.currentGameState) {
        case 'mainMenu':

            drawGamePhase_mainMenu(ctx, gameCanvas);
    
            requestAnimationFrame(update);

            return;

        case 'toolSelection':

            rawGamePhase_toolSelection(ctx, gameCanvas);
    
            requestAnimationFrame(update);

            return;

        case 'playing':
             // 更新遊戲邏輯
            //updateGameLogic(ctx, gameCanvas);

            // 繪製遊戲畫面
            rawGamePhase_playing(ctx, gameCanvas);
    
            requestAnimationFrame(update);

            return;

        case 'gameOver':

            rawGamePhase_gameOver(ctx, gameCanvas);

            requestAnimationFrame(update);

            return;

        default:
            console.warn('Unknown game state:', gameStates.currentGameState);
    }

    // 請求下一次動畫影格，以創建遊戲迴圈
    requestAnimationFrame(update);
}

/**
 * 捕捉全域錯誤的處理函式。
 * @param {string} message - 錯誤訊息。
 * @param {string} source - 錯誤來源檔案的 URL。
 * @param {number} lineno - 錯誤發生的行號。
 * @param {number} colno - 錯誤發生的列號。
 * @param {Error} error - 錯誤物件。
 */
window.onerror = function (message, source, lineno, colno, error) {
    console.error('Global error caught:', {
        message,
        source,
        lineno,
        colno,
        error
    });
    alert('An unexpected error occurred. Please refresh the page to continue.');
};


//初始化
init_central( {bInitAll : true });

// 設置事件監聽器
addEventListeners(ctx, gameCanvas);

update();



