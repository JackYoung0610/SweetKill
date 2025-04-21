// ../js/drawing.js

import { gameVersion } from '../main.js'; // 導入遊戲版本號
import {  STYLES } from './constants.js';
import { gameStates } from './gameState.js';
import { calculateButtonArea } from './utils.js';

/**
 * 繪製文字。
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
 * @param {string} text - 要繪製的文字。
 * @param {number} x - 文字的 X 座標。
 * @param {number} y - 文字的 Y 座標。
 * @param {Object} options - 繪製選項（字體、顏色等）。
 */
export function drawText(ctx, text, x, y, options = {}) {
    const { font = '20px "Microsoft JhengHei", sans-serif', color = 'white', textAlign = 'center', baseline = 'alphabetic' } = options;
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = textAlign;
    ctx.textBaseline = baseline;
    ctx.fillText(text, x, y);
}


/**
 * 繪製矩形。
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
 * @param {number} x - 矩形的 X 座標。
 * @param {number} y - 矩形的 Y 座標。
 * @param {number} width - 矩形的寬度。
 * @param {number} height - 矩形的高度。
 * @param {Object} options - 繪製選項（填充顏色、邊框顏色等）。
 */
export function drawRectangle(ctx, x, y, width, height, options = {}) {

    const { fillColor = 'black', strokeColor = null, lineWidth = 1 } = options;

    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, width, height);
    }

    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x, y, width, height);
    }
}

/**
 * 繪製圓形。
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
 * @param {number} x - 圓心的 X 座標。
 * @param {number} y - 圓心的 Y 座標。
 * @param {number} radius - 圓的半徑。
 * @param {Object} options - 繪製選項（填充顏色、邊框顏色等）。
 */
export function drawCircle(ctx, x, y, radius, options = {}) {
    const { fillColor = 'black', strokeColor = null, lineWidth = 1 } = options;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);

    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }

    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
    ctx.closePath();
}

// 繪製主選單畫面
export function drawGamePhase_mainMenu(ctx, gameCanvas) {

    // 清除畫布
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // 繪製背景
    drawRectangle(ctx, 0, 0, gameCanvas.width, gameCanvas.height, { fillColor: 'rgba(201, 235, 151 , 1)' });

    // 繪製遊戲標題
    drawText(ctx, 'Sweet Kill', gameCanvas.width / 2, gameCanvas.height * 0.3, STYLES.text.mainMenu_Title);

    //繪製最高分
    drawText(ctx, `最高分 : ${gameStates.highScore}`, 10, 20, STYLES.text.mainMenu_Status);

    drawText(ctx, '點擊後開始恩愛', gameCanvas.width / 2, gameCanvas.height * 0.7, STYLES.text.mainMenu_Button);

    // 繪製版本號
    drawText(ctx, gameVersion , gameCanvas.width - 50 , gameCanvas.height - 10, STYLES.text.mainMenu_Version);

}

/**
 * 繪製工具選擇畫面。
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
 * @param {HTMLCanvasElement} gameCanvas - Canvas 元素。
 */
export function rawGamePhase_toolSelection(ctx, gameCanvas) {
    
    // 清除畫布
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // 繪製背景
    drawRectangle(ctx, 0, 0, gameCanvas.width, gameCanvas.height, { fillColor: 'rgba(201, 235, 151 , 1)' });

    // 繪製遊戲標題
    drawText(ctx, '選擇順手的工具', gameCanvas.width / 2, gameCanvas.height * 0.3, STYLES.text.toolSelection_Title);

}

/**
 * 繪製遊戲畫面。
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
 * @param {HTMLCanvasElement} gameCanvas - Canvas 元素。
 */
export function rawGamePhase_playing(ctx, gameCanvas) {
    
    // 清除畫布
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // 繪製背景
    drawRectangle(ctx, 0, 0, gameCanvas.width, gameCanvas.height, { fillColor: 'rgba(201, 235, 151 , 1)' });

    // 繪製遊戲標題
    drawText(ctx, '遊戲中…', gameCanvas.width / 2, gameCanvas.height * 0.3, STYLES.text.playing_Title);

}


/**
 * 繪製結算畫面。
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
 * @param {HTMLCanvasElement} gameCanvas - Canvas 元素。
 */
export function rawGamePhase_gameOver(ctx, gameCanvas) {
    
    // 清除畫布
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // 繪製背景
    drawRectangle(ctx, 0, 0, gameCanvas.width, gameCanvas.height, { fillColor: 'rgba(0, 0, 0 , 1)' });

    // 繪製遊戲標題
    drawText(ctx, '遊戲結束囉…', gameCanvas.width / 2, gameCanvas.height * 0.3, STYLES.text.gameOver_Title);

    // 按鈕類：重新選擇工具
    gameCanvas.toToolSelectionButtonArea = calculateButtonArea(ctx, gameCanvas.width * 0.25, gameCanvas.height * 0.8, '重新選擇工具 (T)');
    drawText(ctx, '重新選擇工具 (T)', gameCanvas.width * 0.25, gameCanvas.height * 0.8, STYLES.text.gameOver_Button);

    // 按鈕類：重新開始遊戲
    gameCanvas.toPlayingButtonArea = calculateButtonArea(ctx, gameCanvas.width * 0.25, gameCanvas.height * 0.8, '重新開始遊戲 (R)');
    drawText(ctx, '重新開始遊戲 (R)', gameCanvas.width * 0.5, gameCanvas.height * 0.8, STYLES.text.gameOver_Button);

    // 按鈕類：回到主畫面
    gameCanvas.toMainMenuButtonArea = calculateButtonArea(ctx, gameCanvas.width * 0.75, gameCanvas.height * 0.8, '回到主畫面 (M)');
    drawText(ctx, '回到主畫面 (M)', gameCanvas.width * 0.75, gameCanvas.height * 0.8, STYLES.text.gameOver_Button);
}



