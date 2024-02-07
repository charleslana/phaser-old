import * as Phaser from 'phaser';
import { BattleScene } from './BattleScene';

export class HomeScene extends Phaser.Scene {
  constructor() {
    super({ key: HomeScene.key });
  }

  public static key = 'HomeScene';

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
      .text(100, 200, 'Próxima Cena', { backgroundColor: '#00ff00', color: '#000000' })
      .setInteractive()
      .on('pointerdown', () => this.startNextScene());
  }

  private startNextScene(): void {
    this.scene.start(BattleScene.key);
  }
}
