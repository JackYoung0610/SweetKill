// ../js/drawing.js

import { gameVersion } from '../main.js'; // 導入遊戲版本號
import {  gameDisplay, STYLES } from './constants.js';
import { gameStates } from './gameState.js';
import { calculateButtonArea } from './utils.js';

/**
 * 繪製文字。
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
 * @param {string} text - 要繪製的文字。
 * @param {number} originalX - 文字的 X 座標。
 * @param {number} originalY - 文字的 Y 座標。
 * @param {Object} options - 繪製選項（字體、顏色等）。
 */

export function drawText(ctx, text, originalX, originalY, options = {},  shouldScale = true,  shouldScaleFont = true) {

    const { font = '20px "Microsoft JhengHei", sans-serif', fillStyle = 'white', textAlign = 'center', textBaseline = 'alphabetic' } = options;

    const scaledX = shouldScale ? originalX * gameDisplay.scaleX : originalX;
    const scaledY = shouldScale ? originalY * gameDisplay.scaleY : originalY;

    let scaledFont = font;

    if (shouldScaleFont && font ) {
        const parts = font.split(' ');
        const size = parseFloat(parts[0]);
        if (!isNaN(size)) {
          parts[0] = `${size * Math.min(gameDisplay.scaleX, gameDisplay.scaleY)}px`;
          scaledFont = parts.join(' ');
        }
      }

    ctx.font = scaledFont;
    ctx.fillStyle = fillStyle;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.fillText(text, scaledX, scaledY);

}


/**
 * 繪製矩形。
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
 * @param {number} originalX - 矩形的 X 座標。
 * @param {number} originalY - 矩形的 Y 座標。
 * @param {number} originalWidth - 矩形的寬度。
 * @param {number} originalHeight - 矩形的高度。
 * @param {Object} options - 繪製選項（填充顏色、邊框顏色等）。
 */
export function drawRectangle(ctx, originalX, originalY, originalWidth, originalHeight, options = {}, shouldScale = true) {

    const { fillColor = 'black', strokeColor = null, lineWidth = 1 } = options;

    const scaledX = shouldScale ? originalX * gameDisplay.scaleX : originalX;
    const scaledY = shouldScale ? originalY * gameDisplay.scaleY : originalY;
    const scaledWidth = shouldScale ? originalWidth * gameDisplay.scaleX : originalWidth;
    const scaledHeight = shouldScale ? originalHeight * gameDisplay.scaleY : originalHeight;
    const scaledLineWidth = shouldScale ? lineWidth * Math.min(gameDisplay.scaleX, gameDisplay.scaleY) : lineWidth;

    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(scaledX, scaledY, scaledWidth, scaledHeight);
    }

    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = scaledLineWidth
        ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
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
export function drawCircle(ctx, originalX, originalY, originalRadius, options = {}, shouldScale = true) {

    const { fillColor = 'black', strokeColor = null, lineWidth = 1 } = options;

    const scaledX = shouldScale ? originalX * gameDisplay.scaleX : originalX;
    const scaledY = shouldScale ? originalY * gameDisplay.scaleY : originalY;
    const scaledRadius = shouldScale ? originalRadius * Math.min(gameDisplay.scaleX, gameDisplay.scaleY) : originalRadius;
    const scaledLineWidth = shouldScale ? lineWidth * Math.min(gameDisplay.scaleX, gameDisplay.scaleY) : lineWidth;

    ctx.beginPath();
    ctx.arc(scaledX, scaledY, scaledRadius, 0, Math.PI * 2);

    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }

    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = scaledLineWidth
        ctx.stroke();
    }
    ctx.closePath();
}

// 繪製主選單畫面
export function drawGamePhase_mainMenu(ctx, gameCanvas) {

    // 清除畫布
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // 繪製背景
    drawRectangle(ctx, 0, 0, gameCanvas.width, gameCanvas.height, { fillColor: 'rgba(201, 235, 151 , 1)' }, false);

    // 繪製遊戲標題
    drawText(ctx, 'Sweet Kill', gameCanvas.width / 2, gameCanvas.height * 0.3, STYLES.text.mainMenu_Title, false,);

    //繪製最高分
    drawText(ctx, `最高分 : ${gameStates.highScore}`, 30 , 35 , STYLES.text.mainMenu_Status,);

    drawText(ctx, '點擊後開始恩愛', gameCanvas.width / 2, gameCanvas.height * 0.7, STYLES.text.mainMenu_Button,false);

    // 繪製版本號
    drawText(ctx, gameVersion , gameCanvas.width - 50 , gameCanvas.height - 10, STYLES.text.mainMenu_Version,false);

}

/**
 * 繪製工具選擇畫面。
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
 * @param {HTMLCanvasElement} gameCanvas - Canvas 元素。
 */
export function drawGamePhase_toolSelection(ctx, gameCanvas) {
    
    // 清除畫布
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // 繪製背景
    drawRectangle(ctx, 0, 0, gameCanvas.width, gameCanvas.height, { fillColor: 'rgba(201, 235, 151 , 1)' }, false);

    // 繪製遊戲標題
    drawText(ctx, '選擇順手的工具', gameCanvas.width / 2, gameCanvas.height * 0.3, STYLES.text.toolSelection_Title,false );

}

/**
 * 繪製遊戲畫面。
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
 * @param {HTMLCanvasElement} gameCanvas - Canvas 元素。
 */
export function drawGamePhase_playing(ctx, gameCanvas) {
    
    // 清除畫布
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // 繪製背景
    drawRectangle(ctx, 0, 0, gameCanvas.width, gameCanvas.height, { fillColor: 'rgba(201, 235, 151 , 1)' }, false);

    // 繪製遊戲標題
    drawText(ctx, '遊戲中…', gameCanvas.width / 2, gameCanvas.height * 0.3, STYLES.text.playing_Title, false);

}


/**
 * 繪製結算畫面。
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
 * @param {HTMLCanvasElement} gameCanvas - Canvas 元素。
 */
export function drawGamePhase_gameOver(ctx, gameCanvas) {
    
    // 清除畫布
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // 繪製背景
    drawRectangle(ctx, 0, 0, gameCanvas.width, gameCanvas.height, { fillColor: 'rgba(0, 0, 0 , 1)' }, false);

    // 繪製遊戲標題
    drawText(ctx, '遊戲結束囉…', gameCanvas.width / 2, gameCanvas.height * 0.3, STYLES.text.gameOver_Title, false);

    // 按鈕類：重新選擇工具
    gameCanvas.toToolSelectionButtonArea = calculateButtonArea(ctx, gameCanvas.width * 0.25, gameCanvas.height * 0.8, '重新選擇工具 (T)');
    drawText(ctx, '重新選擇工具 (T)', gameCanvas.width * 0.25, gameCanvas.height * 0.8, STYLES.text.gameOver_Button, false);

    // 按鈕類：重新開始遊戲
    gameCanvas.toPlayingButtonArea = calculateButtonArea(ctx, gameCanvas.width * 0.5, gameCanvas.height * 0.8, '重新開始遊戲 (R)');
    drawText(ctx, '重新開始遊戲 (R)', gameCanvas.width * 0.5, gameCanvas.height * 0.8, STYLES.text.gameOver_Button, false);

    // 按鈕類：回到主畫面
    gameCanvas.toMainMenuButtonArea = calculateButtonArea(ctx, gameCanvas.width * 0.75, gameCanvas.height * 0.8, '回到主畫面 (M)');
    drawText(ctx, '回到主畫面 (M)', gameCanvas.width * 0.75, gameCanvas.height * 0.8, STYLES.text.gameOver_Button, false );
}



