class Snake {
  // 蛇
  snakeEle: HTMLElement;
  // 蛇头
  headEle: HTMLElement;
  // 蛇身集合
  bodiesEle: HTMLCollection;
  // 舞台
  stageEle: HTMLElement;

  constructor() {
    // 获取页面蛇元素
    this.snakeEle = document.getElementById('snake')!;
    // 获取页面蛇头元素
    this.headEle = document.querySelector('#snake > div')!;
    // 获取页面蛇身体集合
    this.bodiesEle = this.snakeEle.getElementsByTagName('div');
    // 获取页面舞台元素
    this.stageEle = document.getElementById('stage')!;
  }

  // 获取蛇头 X 轴坐标
  get X(): number {
    return this.headEle.offsetLeft;
  }

  // 获取蛇头 Y 轴坐标
  get Y(): number {
    return this.headEle.offsetTop;
  }

  // 设置蛇头 X 轴坐标
  set X(value: number) {
    // 如果新值和旧值相同，则直接返回不再修改
    if (this.X === value) {
      return;
    }

    // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
    if (
      this.bodiesEle[1] &&
      (this.bodiesEle[1] as HTMLElement).offsetLeft === value
    ) {
      // console.log('水平方向发生了掉头');
      // 如果发生了掉头，让蛇向反方向继续移动
      if (value > this.X) {
        // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走
        value = this.X - 10;
      } else {
        // 向左走
        value = this.X + 10;
      }
    }

    // 蛇移动
    this.move('X', value);
  }

  // 设置蛇头 Y 轴坐标
  set Y(value: number) {
    // 如果新值和旧值相同，则直接返回不再修改
    if (this.Y === value) {
      return;
    }

    // 修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头，反之亦然
    if (
      this.bodiesEle[1] &&
      (this.bodiesEle[1] as HTMLElement).offsetTop === value
    ) {
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }

    // 蛇移动
    this.move('Y', value);
  }

  // 吃到食物, 增加身体长度
  addBody() {
    const body = document.createElement('div');
    this.snakeEle.insertAdjacentElement('beforeend', body);
  }

  // 蛇移动
  move(direction: string, value: number) {
    // 合法范围0 ~ (舞台最大位置 - 蛇头大小)
    const maxScope = this.stageEle.clientWidth - this.headEle.clientWidth;
    if (value < 0 || value > maxScope) {
      // 进入判断说明蛇撞墙了
      // throw new Error('游戏结束! Game Over!');
    }

    // 移动身体, 从后至前, 后面的身体位置替换掉前面身体的位置
    for (let i = this.bodiesEle.length - 1; i > 0; i--) {
      // 获取前面身体的位置
      const X = (this.bodiesEle[i - 1] as HTMLElement).offsetLeft;
      const Y = (this.bodiesEle[i - 1] as HTMLElement).offsetTop;

      // 设置到自己身上
      (this.bodiesEle[i] as HTMLElement).style.left = X + 'px';
      (this.bodiesEle[i] as HTMLElement).style.top = Y + 'px';
    }

    // 移动头部
    if (direction === 'X') {
      this.headEle.style.left = value + 'px';
    } else {
      this.headEle.style.top = value + 'px';
    }

    // 检查有没有撞到自己
    this.checkHeadBody();
  }

  // 检查是否撞到自己
  checkHeadBody() {
    // 获取所有身体, 检查身体和蛇头的坐标是否重叠
    for (let i = 1; i < this.bodiesEle.length; i++) {
      const bodyEle = this.bodiesEle[i] as HTMLElement;
      if (this.X === bodyEle.offsetLeft && this.Y === bodyEle.offsetTop) {
        // throw new Error('游戏结束! Game Over!');
      }
    }
  }
}

export default Snake;
