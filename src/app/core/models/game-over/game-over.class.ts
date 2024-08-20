export class GameOver extends Phaser.Scene {
  constructor(public timeout: any) {
    super('GameOver');
  }

  create() {
    const gameWidth = Number(this.sys.game.config.width);
    const gameHeight = Number(this.sys.game.config.height);

    this.scene.stop('UI');
    this.add
      .dynamicBitmapText(
        gameWidth / 2,
        gameHeight / 2 - 30,
        'pixel',
        'GAMEOVER',
        20
      )
      .setOrigin(0.5);

    this.timeout = setTimeout(() => this.goToMenu(), 10000);

    const enterKey = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    enterKey?.on('down', () => this.goToMenu());

    this.input.on('pointerdown', () => this.goToMenu());
  }

  goToMenu() {
    clearTimeout(this.timeout);
    this.scene.start('Menu');
  }
}
