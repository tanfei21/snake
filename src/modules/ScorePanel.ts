class ScorePanel {
  score = 0; // 分数
  level = 1; // 等级

  scoreEle: HTMLElement; // 分数元素
  levelEle: HTMLElement; // 等级元素

  maxLevel: number; // 最高等级
  upScore: number; // 升级分数节点

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 增加分数
  addScore() {
    this.scoreEle.innerHTML = ++this.score + '';
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  // 升级等级
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + '';
    }
  }
}

export default ScorePanel;
