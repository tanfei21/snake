import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

class GameControl {
  settingEle: HTMLElement;
  startEle: HTMLElement;
  setTitLEle: HTMLElement;
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: string = ''; // 按键方向
  isLive: boolean = true; // 游戏状态

  constructor() {
    this.settingEle = document.getElementById('setting')!;
    this.startEle = document.getElementById('start')!;
    this.setTitLEle = document.getElementById('set-title')!;
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
  }

  // 初始化
  init() {
    console.log('初始化');
    this.snake.init();
    this.scorePanel.init();
    this.food.init();
    this.direction = 'Right';
    this.isLive = true;
    // 按键按下
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    (document.getElementById('up') as HTMLElement).addEventListener(
      'click',
      this.clickHandler.bind(this)
    );
    (document.getElementById('down') as HTMLElement).addEventListener(
      'click',
      this.clickHandler.bind(this)
    );
    (document.getElementById('left') as HTMLElement).addEventListener(
      'click',
      this.clickHandler.bind(this)
    );
    (document.getElementById('right') as HTMLElement).addEventListener(
      'click',
      this.clickHandler.bind(this)
    );
    // 调用run方法, 使蛇移动
    this.run();
  }

  // 监听键盘按下
  keydownHandler(event: KeyboardEvent) {
    this.direction = event.key;
  }

  clickHandler(event: Event) {
    console.log(event);
    this.direction = (event?.target as HTMLElement)?.dataset?.direction!;
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
      this.over()
    }

    // 开启一个定时调用
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  // 游戏结束
  over() {
    // 将isLive设置为false
    this.isLive = false;
    this.snake.over();
    this.food.over();
    this.settingEle.style.display = 'flex';
    this.startEle.innerHTML = '重新开始';
    this.setTitLEle.innerHTML = 'Game Over!';
  }

  // 是否吃到食物
  checkEat(X: number, Y: number): void {
    if (X === this.food.X && Y === this.food.Y) {
      console.log('吃到了');
      // 食物位置重置
      this.food.changeLocation();
      // 分数增加
      this.scorePanel.addScore();
      // 蛇身体增加一节
      this.snake.addBody();
      return;
    }

    // 食物出现在身体内部, 自动增长身体
    const snakeBodies = this.snake.bodiesEle;
    for (let i = 0; i < snakeBodies.length; i++) {
      if (
        (snakeBodies[i] as HTMLElement).offsetLeft === this.food.X &&
        (snakeBodies[i] as HTMLElement).offsetTop === this.food.Y
      ) {
        // 食物位置重置
        this.food.changeLocation();
        // 分数增加
        this.scorePanel.addScore();
        // 蛇身体增加一节
        this.snake.addBody();
        return;
      }
    }
  }
}

export default GameControl;
