let currentImgBackground = "";
let isAnimating = false;
let backgroundLayer = null;

const initializeBackgroundLayer = () => {
    if (!backgroundLayer) {
        backgroundLayer = document.createElement('div');
        backgroundLayer.classList.add('dynamic-background-layer');
        document.body.appendChild(backgroundLayer);
        backgroundLayer.style.position = 'fixed';
        backgroundLayer.style.top = '-10px';
        backgroundLayer.style.left = '-10px';
        backgroundLayer.style.width = 'calc(100vw + 20px)';
        backgroundLayer.style.height = 'calc(100vh + 20px)';
        backgroundLayer.style.zIndex = '-2';
        backgroundLayer.style.backgroundSize = 'cover';
        backgroundLayer.style.backgroundPosition = 'center';
        backgroundLayer.style.transition = 'opacity 1s ease';
        backgroundLayer.style.willChange = 'opacity, background-image';
        backgroundLayer.style.transform = 'translateZ(0)';
        backgroundLayer.style.filter = 'blur(3px) brightness(0.5)';
    }
};

const updateBackgroundImage = (imgBackground) => {
    if (backgroundLayer) {
        if (backgroundLayer.style.backgroundImage.includes(imgBackground)) {
            return;
        }

        const tempLayer = document.createElement('div');
        tempLayer.style.position = 'fixed';
        tempLayer.style.top = '-10px';
        tempLayer.style.left = '-10px';
        tempLayer.style.width = 'calc(100vw + 20px)';
        tempLayer.style.height = 'calc(100vh + 20px)';
        tempLayer.style.zIndex = '-1';
        tempLayer.style.backgroundSize = 'cover';
        tempLayer.style.backgroundPosition = 'center';
        tempLayer.style.opacity = '0';
        tempLayer.style.transition = 'opacity 1s ease';
        tempLayer.style.backgroundImage = `url(${imgBackground})`;
        tempLayer.style.filter = 'blur(3px) brightness(0.5)';

        const img = new Image();
        img.src = imgBackground;
        img.onload = () => {
            document.body.appendChild(tempLayer);

            requestAnimationFrame(() => {
                tempLayer.style.opacity = '1';

                tempLayer.addEventListener('transitionend', () => {
                    if (backgroundLayer) {
                        backgroundLayer.remove();
                    }
                    backgroundLayer = tempLayer;
                    isAnimating = false;
                });
            });

            isAnimating = false; // Использовалось раньше для того, чтобы анимация не ломалась. Сейчас рекомендуется держать на false
        };
    }
};

setInterval(() => {
    const imgElements = document.querySelectorAll('[class*="PlayerBarDesktop_cover__IYLwR"]');
    let imgBackground = "";

    imgElements.forEach(img => {
        if (img.src && img.src.includes('/1000x1000')) {
            imgBackground = img.src.replace('/1000x1000', '/1000x1000');
        }
    });

    if (imgBackground && imgBackground !== currentImgBackground && !isAnimating) {
        initializeBackgroundLayer();
        updateBackgroundImage(imgBackground);
        currentImgBackground = imgBackground;
    }
}, 1000);
/*--------------------------------------------*/

// Отключение тупого даблклика
/*--------------------------------------------*/
function disableDoubleClick() {
    const elements = document.querySelectorAll('.PlayerBar_root__cXUnU');

    elements.forEach(element => {
        element.addEventListener('dblclick', function(event) {
            event.preventDefault();
            event.stopPropagation();
        }, true);
    });
}

setInterval(disableDoubleClick, 1000);

function checkHeight() {
    const contentElement = document.querySelector('.DefaultLayout_content__md70Z');
    const mneLenElement = document.querySelector('.mneLen');

    if (contentElement && mneLenElement) {
        const currentHeight = contentElement.clientHeight;
        const windowHeight = window.innerHeight;
        const thresholdHeight = windowHeight * 0.8;

        if (currentHeight < thresholdHeight) {
            mneLenElement.style.display = 'block';
        } else {
            mneLenElement.style.display = 'none';
        }
    }
}

setInterval(checkHeight, 100);
/*--------------------------------------------*/

// Кастом mneLen
/*--------------------------------------------*/
var mneLen = document.createElement('div');
mneLen.className = 'mneLen';
mneLen.textContent = 'Мне лень оптимизировать';
document.body.appendChild(mneLen);
/*--------------------------------------------*/

// Авто смена темы Яндекс Музыки на тёмную
/*--------------------------------------------*/
setInterval(() => {
  const body = document.body;
  if (!body.classList.contains('ym-dark-theme') && !body.classList.contains('ym-light-theme')) {
    body.classList.add('ym-dark-theme');
  } else if (body.classList.contains('ym-light-theme')) {
    body.classList.replace('ym-light-theme', 'ym-dark-theme');
  }
}, 0);
/*--------------------------------------------*/

// МЕНЯЙТЕ ЦВЕТ!!!
/*--------------------------------------------*/
const css = `
:root {
    --background-color: #000;
}

.TrackLyricsModal_root__KsVRf,
.QualitySettingsModal_root__f3gE2,
.QualitySettingsContextMenu_root_withEqualizer__GPjIg,
.TrailerModal_modalContent__ZSNFe,
.TrackAboutModalDesktop_root_withWindows__jIOiB {
    background-color: var(--background-color);
}
`;

const style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

function applyBackgroundColor() {
    const elementWithColor = document.querySelector("[style*='--player-average-color-background']");

    if (elementWithColor) {
        const backgroundColor = getComputedStyle(elementWithColor).getPropertyValue('--player-average-color-background');
        document.documentElement.style.setProperty('--background-color', backgroundColor);
    }

    setTimeout(applyBackgroundColor, 1000);
}

applyBackgroundColor();
/*--------------------------------------------*/// Громкость на колесико
function changeVolumeOnWheel() {
	const changeVolumeRoot = document.querySelector('.ChangeVolume_root__HDxtA');
	const changeVolume = changeVolumeRoot.querySelector('input');

	changeVolumeRoot.onwheel = (event) => {
		let value;

		if (event.wheelDelta > 0) value = Number(changeVolume.value) + 0.02;
		else value = Number(changeVolume.value) - 0.02;

		if (value > 100) value = 100;
		else if (value < 0) value = 0;

		const lastValue = changeVolume.value;
		changeVolume.value = value;

		const inputEvent = new Event("input", { bubbles: true });
		const tracker = changeVolume._valueTracker;
		if (tracker) {
			tracker.setValue(lastValue);
		}
		changeVolume.dispatchEvent(inputEvent);
	}
}

setInterval(changeVolumeOnWheel, 2000);
/*--------------------------------------------*/
const themeTitleText = document.createElement('div');
themeTitleText.className = 'GeniusClientTitle';

themeTitleText.style.position = 'fixed';
themeTitleText.style.visibility = 'visible';
themeTitleText.style.fontFamily = '"DL Slifted Display", PostScript Outlines';
themeTitleText.style.fontSize = '14px';
themeTitleText.style.fontWeight = '100';
themeTitleText.style.left = '50%';
themeTitleText.style.marginLeft = '-66px';
themeTitleText.style.marginTop = '6px';
themeTitleText.style.color = '#ff0';
themeTitleText.style.zIndex = '1';

document.body.appendChild(themeTitleText);
/*--------------------------------------------*/
