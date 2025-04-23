// ../js/spriteAnimator.js

import { gameDisplay } from './constants.js'; // 導入遊戲顯示相關的常量

/**
 * SpriteAnimator 類別用於處理 Sprite Sheet 的動畫播放。
 * 它負責載入圖片、追蹤動畫播放時間、計算當前幀並繪製。
 */
class SpriteAnimator {
    /**
     * 構造函數，用於初始化 SpriteAnimator 的實例。
     * @param {string} imageSrc - Sprite Sheet 圖片的路徑。
     * @param {number} frameWidth - Sprite Sheet 中每一幀的寬度（像素）。
     * @param {number} frameHeight - Sprite Sheet 中每一幀的高度（像素）。
     * @param {number} framesPerRow - Sprite Sheet 中每一行包含的幀數。
     * @param {number} animationSpeed - 動畫播放的速度，即每幀之間顯示的時間間隔（秒）。
     * @param {number} [scale=1] - 繪製 Sprite 時的縮放比例（可選，預設為 1）。
     */
    constructor(imageSrc, frameWidth, frameHeight, framesPerRow, animationSpeed, scale = 1) {
        this.image = new Image(); // 創建一個新的 Image 物件來載入 Sprite Sheet 圖片
        this.image.src = imageSrc; // 設置圖片的來源路徑
        this.frameWidth = frameWidth; // 儲存每一幀的寬度
        this.frameHeight = frameHeight; // 儲存每一幀的高度
        this.framesPerRow = framesPerRow; // 儲存每一行的幀數
        this.animationSpeed = animationSpeed; // 儲存動畫播放速度
        this.scale = scale; // 儲存縮放比例
        this.currentTime = 0; // 動畫播放的總時間，用於計算當前幀
        this.totalFrames = 0; // 總幀數，在圖片載入後計算
        this.image.onload = () => {
            this.totalFrames = this.getTotalFrames();
        };
    }

    /**
     * 計算 Sprite Sheet 的總幀數。
     * @returns {number} - Sprite Sheet 的總幀數。
     */
    getTotalFrames() {
        return this.framesPerRow * Math.ceil(this.image.naturalHeight / this.frameHeight);
    }

    /**
     * 更新動畫的進度，這裡主要更新總播放時間並處理循環。
     * @param {number} deltaTime - 自上次更新以來經過的時間（秒）。通常是遊戲迴圈中每幀之間的時間差。
     */
    update(deltaTime) {
        // 偵錯輸出：查看 currentTime 的變化
         console.log(`[SpriteAnimator] currentTime: ${this.currentTime.toFixed(3)}`);
        // 只有當圖片載入完成且動畫速度有效時才更新時間
        if (this.image.complete && this.animationSpeed > 0 && this.totalFrames > 0) {
            this.currentTime += deltaTime; // 將經過的時間累加到總播放時間上
            const totalAnimationDuration = this.totalFrames * this.animationSpeed;
            // 使用模運算符確保 currentTime 在一個完整的動畫循環時間內
            this.currentTime %= totalAnimationDuration;
        }
    }

    /**
     * 繪製 Sprite Sheet 的當前幀。當前幀的計算基於總播放時間。
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
     * @param {number} originalX - Sprite 在畫布上的原始 X 座標。
     * @param {number} originalY - Sprite 在畫布上的原始 Y 座標。
     */
    draw(ctx, originalX, originalY) {
        
        // 只有當圖片載入完成且總幀數和動畫速度有效時才進行繪製
        if (this.image.complete && this.totalFrames > 0 && this.animationSpeed > 0) {
            // 根據總播放時間和動畫速度計算當前幀的索引
            const frameIndex = Math.floor(this.currentTime / this.animationSpeed) % this.totalFrames;

            // 偵錯輸出：查看 frameIndex 的變化
             console.log(`[SpriteAnimator] frameIndex: ${frameIndex}`);

            // 計算當前幀在 Sprite Sheet 中的 X 和 Y 索引
            const frameX = frameIndex % this.framesPerRow; // X 索引：當前幀索引除以每行幀數的餘數
            const frameY = Math.floor(frameIndex / this.framesPerRow); // Y 索引：當前幀索引除以每行幀數的商的向下取整

            // 計算 Sprite 在畫布上縮放後的 X 和 Y 座標
            const scaledX = originalX * gameDisplay.scaleX;
            const scaledY = originalY * gameDisplay.scaleY;
            // 計算 Sprite 在畫布上縮放後的寬度和高度
            const scaledWidth = this.frameWidth * this.scale * gameDisplay.scaleX;
            const scaledHeight = this.frameHeight * this.scale * gameDisplay.scaleY;

            // 使用 drawImage 方法繪製 Sprite Sheet 的一部分到畫布上
            ctx.drawImage(
                this.image, // Sprite Sheet 圖片物件
                frameX * this.frameWidth, // 源圖像中要開始裁剪的 X 座標
                frameY * this.frameHeight, // 源圖像中要開始裁剪的 Y 座標
                this.frameWidth, // 要從源圖像中裁剪的寬度
                this.frameHeight, // 要從源圖像中裁剪的高度
                scaledX, // 圖像在畫布上的目標 X 座標
                scaledY, // 圖像在畫布上的目標 Y 座標
                scaledWidth, // 圖像在畫布上的目標寬度
                scaledHeight // 圖像在畫布上的目標高度
            );
        }
    }
}

export default SpriteAnimator; // 導出 SpriteAnimator 類別，使其可以在其他模組中導入和使用

