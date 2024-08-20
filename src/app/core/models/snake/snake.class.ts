import { DirectionMove } from '@models/direction-move.type';

export class Snake {
  constructor(
    public scene: Phaser.Scene,
    public body: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[] = [],
    public dir: DirectionMove = 'left',
    public timer: number = 0,
    public gameWidth: number = 0,
    public gameHeight: number = 0
  ) {
    this.scene = scene;
    this.body = body;
    this.dir = dir;
    this.timer = timer;
    this.gameWidth = Number(this.scene.sys.game.config.width);
    this.gameHeight = Number(this.scene.sys.game.config.height);

    for (let index = 0; index < 3; index++) {
      let body = this.scene.physics.add
        .image(this.gameWidth / 2 + index * 10, this.gameHeight / 2, 'body')
        .setOrigin(0);

      if (index === 0) body = body.setCollideWorldBounds(true);

      this.body.push(body);
    }

    for (let index = 1; index < this.body.length; index++) {
      this.scene.physics.add.collider(this.body[0], this.body[index], () =>
        this.crash()
      );
    }
  }

  update(time: number) {
    if (this.body[0].y <= 15) this.crash();

    if (time > this.timer) {
      for (let index = this.body.length - 1; index > 0; index--) {
        this.body[index].x = this.body[index - 1].x;
        this.body[index].y = this.body[index - 1].y;

        this.body[this.body.length - 1 - index].x = Phaser.Math.Wrap(
          this.body[this.body.length - 1 - index].x,
          0,
          this.gameWidth
        );

        this.body[this.body.length - 1 - index].y = Phaser.Math.Wrap(
          this.body[this.body.length - 1 - index].y,
          20,
          this.gameHeight
        );
      }

      switch (this.dir) {
        case 'right':
          this.body[0].x += 10;
          break;
        case 'left':
          this.body[0].x -= 10;
          break;
        case 'up':
          this.body[0].y -= 10;
          break;
        case 'down':
          this.body[0].y += 10;
          break;

        default:
          break;
      }
      this.timer = time + 150;
    }
  }

  grow() {
    const obj = this.body[this.body.length - 1];

    const newObj = this.scene.physics.add
      .image(obj.x, obj.y, 'body')
      .setOrigin(0);

    this.body.push(newObj);

    this.scene.physics.add.collider(this.body[0], newObj, () => this.crash());
  }

  crash() {
    this.scene.scene.start('GameOver');
  }

  changeMove(dir: DirectionMove) {
    this.dir = dir;
  }
}
