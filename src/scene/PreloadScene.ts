import * as Phaser from 'phaser';
import { homeSceneKey, preloadSceneKey } from '../data/scene-keys';
import {
  aokijiAttackMelee,
  aokijiIdle,
  aokijiRun,
  battleBackground1,
  pirateIdle,
} from '../data/asset-keys';

export class PreloadScene extends Phaser.Scene {
  private progressBar: Phaser.GameObjects.Graphics;
  private progressBox: Phaser.GameObjects.Graphics;
  private loadingText: Phaser.GameObjects.Text;
  private percentText: Phaser.GameObjects.Text;
  private assetText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: preloadSceneKey });
  }

  preload(): void {
    this.createProgressBar();
    this.createLoadingText();
    this.createPercentText();
    this.createAssetText();
    this.setupLoadEvents();
    this.loadAssets();
  }

  create(): void {}

  private createProgressBar(): void {
    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    const barWidth = 320;
    const barHeight = 50;
    const barX = (this.cameras.main.width - barWidth) / 2;
    const barY = (this.cameras.main.height - barHeight) / 2;
    this.progressBox.fillRect(barX, barY, barWidth, barHeight);
  }

  private createLoadingText(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff',
      },
    });
    this.loadingText.setOrigin(0.5, 0.5);
  }

  private createPercentText(): void {
    const barWidth = 320;
    const barHeight = 50;
    const barX = (this.cameras.main.width - barWidth) / 2;
    const barY = (this.cameras.main.height - barHeight) / 2;
    this.percentText = this.make.text({
      x: barX + barWidth / 2,
      y: barY + barHeight / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff',
      },
    });
    this.percentText.setOrigin(0.5, 0.5);
  }

  private createAssetText(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        color: '#ffffff',
      },
    });
    this.assetText.setOrigin(0.5, 0.5);
  }

  private setupLoadEvents(): void {
    this.load.on(Phaser.Loader.Events.PROGRESS, this.handleProgressEvent, this);
    this.load.on(Phaser.Loader.Events.FILE_LOAD, this.handleLoadEvent, this);
    this.load.on(Phaser.Loader.Events.COMPLETE, this.handleCompleteEvent, this);
  }

  private handleProgressEvent(value: number): void {
    this.percentText.setText(`${Math.round(value * 100)}%`);
    this.progressBar.clear();
    this.progressBar.fillStyle(0xffffff, 1);
    const barWidth = 300;
    const barHeight = 30;
    const barY = (this.cameras.main.height - barHeight) / 2;
    const progressBarX = (this.cameras.main.width - barWidth) / 2;
    this.progressBar.fillRect(progressBarX, barY, barWidth * value, barHeight);
  }

  private handleLoadEvent(file: Phaser.Loader.File): void {
    this.assetText.setText('Loading asset: ' + file.key);
  }

  private handleCompleteEvent(): void {
    this.progressBar.destroy();
    this.progressBox.destroy();
    this.loadingText.destroy();
    this.percentText.destroy();
    this.assetText.destroy();
    this.scene.start(homeSceneKey);
  }

  private loadAssets(): void {
    this.load.image(battleBackground1, './assets/battle-bg/1.png');
    this.load.atlas(
      aokijiIdle,
      './assets/characters/Aokiji/idle.png',
      './assets/characters/Aokiji/idle.json'
    );
    this.load.atlas(
      aokijiRun,
      './assets/characters/Aokiji/run.png',
      './assets/characters/Aokiji/run.json'
    );
    this.load.atlas(
      aokijiAttackMelee,
      './assets/characters/Aokiji/attack_melee.png',
      './assets/characters/Aokiji/attack_melee.json'
    );
    this.load.atlas(
      pirateIdle,
      './assets/characters/pirate/idle.png',
      './assets/characters/pirate/idle.json'
    );
  }
}
