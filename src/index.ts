import './style/index.less';
import GameControl from './modules/GameControl';

const settingEle = (document.getElementById('setting') as HTMLElement);
const startBtnEle = (document.getElementById('start') as HTMLElement);
const snakeEle = (document.getElementById('snake') as HTMLElement);
const foodEle = (document.getElementById('food') as HTMLElement);
startBtnEle.addEventListener('click', newGame);

const gameControl = new GameControl();
  
function newGame() {
  console.log('重新开始');
  settingEle.style.display = 'none';
  snakeEle.style.display = 'block';
  foodEle.style.display = 'flex';
  gameControl.init();
}
