import Phaser from 'phaser';

export class UI extends Phaser.Scene {
  constructor(public points: any) {
    super('UI');
  }

  create() {
    const gameWidth = Number(this.sys.game.config.width);

    this.add.image(0, 0, 'board').setOrigin(0);
    this.add.dynamicBitmapText(10, 7, 'pixel', 'POINTS', 8);
    this.points = this.add.dynamicBitmapText(
      gameWidth - 60,
      7,
      'pixel',
      Phaser.Utils.String.Pad(0, 6, '0', 1),
      8
    );
  }

  addPoint() {
    this.points.setText(
      Phaser.Utils.String.Pad(parseInt(this.points.text, 10) + 10, 6, '0', 1)
    );
  }
}
