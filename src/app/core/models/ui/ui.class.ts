import Phaser from 'phaser';

export class UI extends Phaser.Scene {
  constructor(public points: any = 0) {
    super('UI');
  }

  create() {
    const gameWidth = Number(this.sys.game.config.width);

    const board = this.add.image(0, 0, 'board').setOrigin(0);
    board.setOrigin(0.5, 0);
    const scaleX = gameWidth / board.width;
    const scaleY = 2;
    board.setScale(scaleX, scaleY);
    board.setPosition(gameWidth / 2, 0);

    this.add.dynamicBitmapText(10 * 2, 7 * 2, 'pixel', 'POINTS', 8).setScale(2);
    this.points = this.add
      .dynamicBitmapText(
        gameWidth - 60 * 2,
        7 * 2,
        'pixel',
        Phaser.Utils.String.Pad(0, 6, '0', 1),
        8
      )
      .setScale(2);
  }

  addPoint() {
    this.points.setText(
      Phaser.Utils.String.Pad(parseInt(this.points.text, 10) + 10, 6, '0', 1)
    );
  }
}
