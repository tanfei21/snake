import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init();
  }

  init() {
    console.log(123);
    
    document.addEventListener('keydown', this.keydownHandler);
  }

  keydownHandler(event: KeyboardEvent) {
    console.log(event.key);
  }
}

export default GameControl;
