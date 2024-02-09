import * as Phaser from 'phaser';
import { IStatusBar } from '../interface/IStatusBar';

export class StatusBar {
  constructor(scene: Phaser.Scene, sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    this.scene = scene;
    this.sprite = sprite;
  }

  private scene: Phaser.Scene;
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private statusBarContainer: Phaser.GameObjects.Container;
  private containerWidth: number;
  private hpBar: IStatusBar;
  private manaBar: IStatusBar;

  public createStatusBarContainer(isFlip = false): void {
    const containerBackground = this.scene.add.graphics();
    containerBackground.fillStyle(0x333333, 1);
    containerBackground.fillRect(0, 0, this.sprite.width * this.sprite.scaleX, 30);
    this.containerWidth = this.sprite.width * this.sprite.scaleX;
    this.hpBar = this.createStatusBar(0xffffff, 0x00ff00);
    const barHeight = 10;
    this.hpBar.bar.y = barHeight + 5;
    this.manaBar = this.createStatusBar(0xffffff, 0xffa500);
    this.statusBarContainer = this.scene.add.container(
      isFlip ? this.sprite.x : this.sprite.x - this.containerWidth,
      this.sprite.y - this.sprite.height * this.sprite.scaleY - 30
    );
    this.statusBarContainer.setDepth(1);
    this.statusBarContainer.add([containerBackground, this.manaBar.bar, this.hpBar.bar]);
  }

  public show(): void {
    this.statusBarContainer.setVisible(true);
  }

  public hide(): void {
    this.statusBarContainer.setVisible(false);
  }

  public updateHP(newHP: number, maxHP: number, speed: number): void {
    this.hpBar.value = newHP;
    const newWidth = (this.containerWidth * this.hpBar.value) / maxHP;
    const clampedWidth = Phaser.Math.Clamp(newWidth, 0, this.containerWidth);
    this.scene.tweens.add({
      targets: this.hpBar.bar,
      scaleX: clampedWidth / this.containerWidth,
      duration:
        (500 / speed) * Math.abs(this.hpBar.bar.scaleX - clampedWidth / this.containerWidth),
      ease: Phaser.Math.Easing.Linear,
    });
  }

  private createStatusBar(bgColor: number, fillColor: number): IStatusBar {
    const barHeight = 10;
    const bar = this.scene.add.graphics();
    bar.fillStyle(bgColor, 1);
    bar.fillRoundedRect(0, 0, this.containerWidth, barHeight, 5);
    const value = this.scene.add.graphics();
    value.fillStyle(fillColor, 1);
    value.fillRoundedRect(0, 0, this.containerWidth, barHeight, 5);
    return { bar: value, value: 100 };
  }
}
