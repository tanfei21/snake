class Food {
  // 食物
  foodEle: HTMLElement;
  // 蛇身集合
  bodiesEle: HTMLCollection;
  // 舞台
  stageEle: HTMLElement;

  constructor() {
    // 获取页面食物元素
    this.foodEle = document.getElementById('food')!;
    // 获取页面蛇身体集合
    this.bodiesEle = document
      .getElementById('snake')!
      .getElementsByTagName('div');
    // 获取页面舞台元素
    this.stageEle = document.getElementById('stage')!;
  }

  // 获取食物 X 轴坐标
  get X(): number {
    return this.foodEle.offsetLeft;
  }

  // 获取食物 Y 轴坐标
  get Y(): number {
    return this.foodEle.offsetTop;
  }

  // 修改食物的位置
  changeLocation(): void {

    

    // 默认食物为正方形
    // 食物出现的最大位置: 舞台最大宽度/高度 - 食物大小
    const foodWidth = this.foodEle.clientWidth;
    const maxWidth = (this.stageEle.clientWidth - foodWidth) / foodWidth;
    const maxHeight = (this.stageEle.clientHeight - foodWidth) / foodWidth;

    // 每次移动的位置必须是食物大小的整数倍
    const left = Math.round(Math.random() * maxWidth) * foodWidth;
    const top = Math.round(Math.random() * maxHeight) * foodWidth;

    this.foodEle.style.left = left + 'px';
    this.foodEle.style.top = top + 'px';

    // 食物位置不能出现在蛇身体内部
    for (let i = 0; i < this.bodiesEle.length; i++) {
      const bodyEle = this.bodiesEle[i] as HTMLElement;
      console.log(this.X);
      
      if (this.X === bodyEle.offsetLeft && this.Y === bodyEle.offsetTop) {
        // 出现在内部
        this.changeLocation()
      }
    }
  }
}

export default Food;
