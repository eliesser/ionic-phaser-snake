import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';

import Phaser from 'phaser';

import { BootLoader, GameOver, Menu, Play, UI } from '@models/index';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      title: 'Snake',
      width: 320,
      height: 180,
      type: Phaser.AUTO,
      parent: 'game-content',
      backgroundColor: '#f9ca24',
      pixelArt: true,
      physics: {
        default: 'arcade',
      },
      scene: [BootLoader, Play, GameOver, UI, Menu],
    };
  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }
}
