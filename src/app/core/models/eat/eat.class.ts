import { Snake } from '@models/index';

export class Eat {
  constructor(
    public scene: Phaser.Scene,
    public scale: number = 2,
    public snake: Snake,
    public food: any = {} /* Phaser.Physics.Arcade.Group = {} as Phaser.Physics.Arcade.Group */,
    public gameWidth: number = 0,
    public gameHeight: number = 0
  ) {
    this.scene = scene;
    this.snake = snake;
    this.gameWidth = Number(this.scene.sys.game.config.width);
    this.gameHeight = Number(this.scene.sys.game.config.height);
    this.scale = scale;

    this.food = this.scene.physics.add.group({
      key: 'food',
      setXY: this.getRandomXY(),
    });

    this.food
      .getChildren()[0]
      .setOrigin(0)
      .setDepth(-1)
      .setScale(this.scale, this.scale);
  }

  preload() {}

  createFood() {
    this.food.getChildren()[0].destroy();

    const { x, y } = this.getRandomXY();

    this.food.create(x, y, 'food');

    this.food
      .getChildren()[0]
      .setOrigin(0)
      .setDepth(-1)
      .setScale(this.scale, this.scale);
  }

  private getRandomXY() {
    let x: number;
    let y: number;
    let exist: boolean;

    do {
      exist = false;

      x = Phaser.Math.Between(0, this.gameWidth - 10 * this.scale);
      y = Phaser.Math.Between(15, this.gameHeight - 10 * this.scale);

      x = Phaser.Math.Snap.To(x, 10 * this.scale);
      y = Phaser.Math.Snap.To(y, 10 * this.scale);

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
