import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: string = ''; // 按键方向
  isLive: boolean = true; // 游戏状态

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();

    this.init();
  }

  // 初始化
  init() {
    // 监听按键按下
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    // 调用run方法, 使蛇移动
    this.run();
  }

  // 监听键盘按下
  keydownHandler(event: KeyboardEvent) {
    this.direction = event.key;
  }

  // 蛇动起来
  run() {
    // 获取蛇现在坐标
    let X = this.snake.X;
    let Y = this.snake.Y;


    // 根据按键方向来修改X值和Y值
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
      case 'w':
      case 'W':
        // 向上移动 top 减少
        Y -= 10;
        break;
      case 'ArrowDown':
      case 'Down':
      case 's':
      case 'S':
        // 向下移动 top 增加
        Y += 10;
        break;
      case 'ArrowLeft':
      case 'Left':
      case 'a':
      case 'A':
        // 向左移动 left 减少
        X -= 10;
        break;
      case 'ArrowRight':
      case 'Right':
      case 'd':
      case 'D':
        // 向右移动 left 增加
        X += 10;
        break;
    }

    // 检查蛇是否吃到了食物
    this.checkEat(X, Y);

    //修改蛇的X和Y值
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      // 进入到catch，说明出现了异常，游戏结束，弹出一个提示信息
      alert(e.message);
      // 将isLive设置为false
      this.isLive = false;
    }

    // 开启一个定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 -(this.scorePanel.level-1)*30);
  }

  // 是否吃到食物
  checkEat(X: number, Y: number): void {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物位置重置
      this.food.changeLocation();
      // 分数增加
      this.scorePanel.addScore();
      // 蛇身体增加一节
      this.snake.addBody();
    }
  }
}

export default GameControl;
