import Phaser from 'phaser';

export class BootLoader extends Phaser.Scene {
  constructor(config: any) {
    super(config);
  }

  preload() {
    console.log('Escena BootLoader');

    this.load.image('body', 'assets/images/body.png');

    this.load.image('food', 'assets/images/food.png');

    this.load.image('board', 'assets/images/board.png');

    this.load.json('fontJson', 'assets/font/font.json');
    this.load.image('font', 'assets/font/font.png');
  }

  create() {
    const fontJson = this.cache.json.get('fontJson');
    this.cache.bitmapFont.add(
      'pixel',
      Phaser.GameObjects.RetroFont.Parse(this, fontJson)
    );
    this.scene.start('Menu');
  }
}
