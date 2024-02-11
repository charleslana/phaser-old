import * as Phaser from 'phaser';

export class StatusBar {
  constructor(scene: Phaser.Scene, sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
    this.scene = scene;
    this.sprite = sprite;
  }

  private scene: Phaser.Scene;
  private sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private statusBarContainer: Phaser.GameObjects.Container;
  private containerWidth: number;
  private mpProgressBar: Phaser.GameObjects.Rectangle;
  private hpProgressBar: Phaser.GameObjects.Rectangle;

  public createStatusBarContainer(isFlip = false): void {
    this.containerWidth = this.sprite.width * this.sprite.scaleX;
    this.statusBarContainer = this.scene.add.container(
      isFlip ? this.sprite.x : this.sprite.x - this.containerWidth,
      this.sprite.y - this.sprite.height * this.sprite.scaleY - 30
    );
    this.statusBarContainer.setDepth(1);
    const containerBackground = this.scene.add.graphics();
    containerBackground.fillStyle(0x808080, 1);
    containerBackground.fillRect(0, 0, this.containerWidth, 30);
    this.statusBarContainer.add(containerBackground);
    this.createMPBar();
    this.createHPBar();
  }

  public show(): void {
    this.statusBarContainer.setVisible(true);
  }

  public hide(): void {
    this.statusBarContainer.setVisible(false);
  }

  public updateHPWithAnimation(hp: number, maxHP: number, speed: number): void {
    const normalizedHP = hp / maxHP;
    const newWidth = normalizedHP * this.containerWidth;
    this.scene.tweens.add({
      targets: this.hpProgressBar,
      width: newWidth,
      duration: 500 / speed,
      ease: Phaser.Math.Easing.Sine,
      onComplete: () => {
        const isLowHP = hp / maxHP <= 0.25;
        if (isLowHP) {
          this.hpProgressBar.setFillStyle(0xff0000);
        }
      },
    });
  }

  public updateMPWithAnimation(mp: number, maxMP: number, speed: number): void {
    const normalizedHP = mp / maxMP;
    const newWidth = normalizedHP * this.containerWidth;
    this.scene.tweens.add({
      targets: this.mpProgressBar,
      width: newWidth,
      duration: 500 / speed,
      ease: Phaser.Math.Easing.Sine,
      onComplete: () => {
        const isHighMP = mp / maxMP >= 1;
        if (isHighMP) {
          this.mpProgressBar.setFillStyle(0xffff00);
        }
      },
    });
  }

  private createMPBar(): void {
    const progressBox = this.scene.add.graphics();
    progressBox.fillStyle(0x333333, 1);
    progressBox.fillRoundedRect(0, 0, this.containerWidth, 5, 2);
    this.mpProgressBar = this.scene.add.rectangle(0, 0, this.containerWidth, 5, 0xffa500);
    this.mpProgressBar.setOrigin(0, 0);
    this.updateMP(0, 100);
    this.statusBarContainer.add([progressBox, this.mpProgressBar]);
  }

  private updateMP(mp: number, maxMP: number): void {
    const normalizedMP = mp / maxMP;
    const clampedWidth = Phaser.Math.Clamp(normalizedMP, 0, 1) * this.containerWidth;
    this.mpProgressBar.width = clampedWidth;
  }

  private createHPBar(): void {
    const progressBox = this.scene.add.graphics();
    progressBox.fillStyle(0x333333, 1);
    progressBox.fillRoundedRect(0, 10, this.containerWidth, 10, 4);
    this.hpProgressBar = this.scene.add.rectangle(0, 10, this.containerWidth, 10, 0x00ff00);
    this.hpProgressBar.setOrigin(0, 0);
    this.hpProgressBar.y = 10;
    this.updateHP(100, 100);
    this.statusBarContainer.add([progressBox, this.hpProgressBar]);
  }

  private updateHP(mp: number, maxMP: number): void {
    const normalizedHP = mp / maxMP;
    const clampedWidth = Phaser.Math.Clamp(normalizedHP, 0, 1) * this.containerWidth;
    this.hpProgressBar.width = clampedWidth;
  }
}
