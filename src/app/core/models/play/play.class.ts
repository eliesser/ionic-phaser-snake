import Phaser from 'phaser';

import { Eat, Snake, UI } from '@models/index';

export class Play extends Phaser.Scene {
  constructor(
    public snake: Snake,
    public eat: Eat,
    public keys: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  ) {
    super('Play');
  }

  preload() {
    const scale = 3;
    this.snake = new Snake(this, scale);

    this.eat = new Eat(this, scale, this.snake);
  }

  create() {
    this.scene.launch('UI');
    const sceneUI: any = this.scene.get('UI');
    this.keys = this.input.keyboard?.createCursorKeys();

    this.physics.add.collider(this.snake.body[0], this.eat.food, () => {
      this.eat.createFood();
      this.snake.grow();
      sceneUI.addPoint();
    });
  }

  override update(time: number) {
    if (this.keys?.left.isDown && this.snake.dir !== 'right') {
      this.snake.changeMove('left');
    } else if (this.keys?.right.isDown && this.snake.dir !== 'left') {
      this.snake.changeMove('right');
    } else if (this.keys?.up.isDown && this.snake.dir !== 'down') {
      this.snake.changeMove('up');
    } else if (this.keys?.down.isDown && this.snake.dir !== 'up') {
      this.snake.changeMove('down');
    }

    this.snake.update(time);
  }
}
