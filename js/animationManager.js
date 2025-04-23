// ../js/animationManager.js

import { SPRITE_SHEET } from './spriteSheet.js';
import SpriteAnimator from './spriteAnimator.js';

const animationCache = {};

/**
 * 動畫管理器，用於集中管理遊戲中的所有 SpriteAnimator 實例。
 */
const animationManager = {
    /**
     * 根據配置創建並儲存 SpriteAnimator 實例。
     * @param {string} key - 用於識別動畫器的唯一鍵名。
     * @param {object} spriteConfig - 包含 Sprite Sheet 配置的物件。
     */
    createAnimator(key, spriteConfig) {
        if (!animationCache[key]) {
            animationCache[key] = new SpriteAnimator(
                spriteConfig.imageSrc,
                spriteConfig.frameWidth,
                spriteConfig.frameHeight,
                spriteConfig.framesPerRow,
                spriteConfig.animationSpeed,
                spriteConfig.scale
            );
        }
        return animationCache[key];
    },

    /**
     * 獲取已創建的 SpriteAnimator 實例。
     * @param {string} key - 要獲取的動畫器的鍵名。
     * @returns {SpriteAnimator | undefined} - 如果存在則返回 SpriteAnimator 實例，否則返回 undefined。
     */
    getAnimator(key) {
        return animationCache[key];
    },

    /**
     * 更新所有已創建的動畫器。
     * @param {number} deltaTime - 自上次更新以來經過的時間（秒）。
     */
    updateAll(deltaTime) {
        for (const key in animationCache) {
            if (animationCache.hasOwnProperty(key)) {
                animationCache[key].update(deltaTime);
            }
        }
    },

    /**
     * 繪製指定的動畫器。
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D 繪圖上下文。
     * @param {string} key - 要繪製的動畫器的鍵名。
     * @param {number} x - 繪製的 X 座標。
     * @param {number} y - 繪製的 Y 座標。
     */
    drawAnimator(ctx, key, x, y) {
        const animator = this.getAnimator(key);
        if (animator) {
            animator.draw(ctx, x, y);
        }
    },

    /**
     * 重置指定動畫器的播放時間。
     * @param {string} key - 要重置的動畫器的鍵名。
     */
    resetAnimator(key) {
        const animator = this.getAnimator(key);
        if (animator) {
            animator.currentTime = 0;
        }
    }

};

// 預先創建主選單的標題動畫器
if (SPRITE_SHEET.mainMenu && SPRITE_SHEET.mainMenu[0]) {
    animationManager.createAnimator('mainMenuTitle', SPRITE_SHEET.mainMenu[0]);
}

export default animationManager;