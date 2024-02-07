import * as Phaser from 'phaser';
import { battleSceneKey, homeSceneKey } from '../data/scene-keys';

export class HomeScene extends Phaser.Scene {
  constructor() {
    super({ key: homeSceneKey });
  }

  create(): void {
    this.setBackgroundColor();
    this.createLayout();
  }

  private setBackgroundColor(): void {
    this.cameras.main.setBackgroundColor('#ff0000');
  }

  private createLayout(): void {
    this.add.text(100, 100, 'Cena 1 - Clique no botão para ir para a próxima cena', {
      backgroundColor: '#ffffff',
      color: '#000000',
    });
    this.add
      .text(100, 200, 'Próxima Cena', {
        backgroundColor: '#00ff00',
        color: '#000000',
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      })
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => this.goToBattleScene());
  }

  private goToBattleScene(): void {
    this.scene.start(battleSceneKey);
  }
}
