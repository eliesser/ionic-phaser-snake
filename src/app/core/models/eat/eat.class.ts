import { Snake } from '@models/index';

export class Eat {
  constructor(public scene: any, public snake: Snake, public food: any = {}) {
    this.scene = scene;
    this.snake = snake;

    this.food = this.scene.physics.add.group({
      key: 'food',
      setXY: this.getRandomXY(),
    });

    this.food.getChildren()[0].setOrigin(0).setDepth(-1);
  }

  preload() {
    this.snake = new Snake(this);
  }

  createFood() {
    const { x, y } = this.getRandomXY();
    this.food.getChildren()[0].destroy();
    this.food.create(x, y, 'food');
    this.food.getChildren()[0].setOrigin(0).setDepth(-1);
  }

  private getRandomXY() {
    let x: number;
    let y: number;
    let exist: boolean;

    do {
      exist = false;

      x = Phaser.Math.Between(0, this.scene.sys.game.config.width - 10);
      y = Phaser.Math.Between(15, this.scene.sys.game.config.height - 10);

      x = Phaser.Math.Snap.To(x, 10);
      y = Phaser.Math.Snap.To(y, 10);

      for (let index = 0; index < this.snake.body.length; index++) {
        const body = this.snake.body[index];

        if (body.x === x && body.y === y) {
          exist = true;
          break;
        }
      }
    } while (exist);

    return { x, y };
  }
}
