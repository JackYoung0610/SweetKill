// ..js/constants.js

// 遊戲的基礎設定
export const HIGHSCORE = 'SweetKillHighScore';

//遊戲畫面縮放率
export const gameDisplay ={

    BASE_WIDTH : 800,
    BASE_HEIGHT : 600,

    resolutionScaleX : 0.9,
    resolutionScaleY : 0.9,

    scaleX : 1,
    scaleY : 1,

}



// 定義遊戲的基礎速度，遊戲進行中速度會逐漸增加
export const baseGameSpeed = 1;

// 文字樣式定義
export const STYLES = {
    text: {
        // 主畫面標題樣式
        mainMenu_Title: { font: '48px sans-serif', fillStyle: 'black', textAlign: 'center'},
        // 主畫面按鈕樣式
        mainMenu_Button: { font: '24px sans-serif', fillStyle: 'black', textAlign: 'center'},
        // 主畫面狀態文字樣式
        mainMenu_Status: { font: '24px sans-serif', fillStyle: 'black', textAlign: 'start' },
        // 主畫面版號文字樣式
        mainMenu_Version: { font: '24px sans-serif', fillStyle: 'black', textAlign: 'center' },

        // 道具選擇畫面標題樣式
        toolSelection_Title: { font: '48px sans-serif', fillStyle: 'black', textAlign: 'center' },

        //遊戲中畫面標題
         playing_Title: { font: '48px sans-serif', fillStyle: 'black', textAlign: 'center' },

         // 遊戲結算畫面標題
        gameOver_Title: { font: '48px sans-serif', fillStyle: 'white', textAlign: 'center' },
        //結算畫面按鈕樣式
        gameOver_Button: { font: '24px sans-serif', fillStyle: 'white', textAlign: 'center' },

    }
};

