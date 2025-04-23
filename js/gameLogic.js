// ..js/gameLogic.js

import {  baseGameSpeed} from './constants.js';
import { gameStates } from './gameState.js';
//import { isColliding, isTooClose } from './utils.js';

//包含所有與遊戲邏輯相關
export function updateGameLogic(ctx, canvas) {
    // 更新遊戲速度
    const elapsedTimeInSeconds = gameStates.gameStartTime ? (Date.now() - gameStates.gameStartTime) / 1000 : 0;
    const timeBasedSpeedIncrease = Math.floor(elapsedTimeInSeconds / 10) * 0.1;
    const scoreBasedSpeedIncrease = gameStates.score * 0.001;
    const gameSpeed = baseGameSpeed + timeBasedSpeedIncrease + scoreBasedSpeedIncrease;

    //處理遊戲過程
    
}


