import * as Phaser from 'phaser';
import { getCharacterAnimation } from '../utils/character-utils';
import { IAnimation } from '../interface/IAnimation';
import { IBattleCharacter } from '../interface/IBattleCharacter';
import { ICharacterAnimation } from '../interface/ICharacterAnimation';
import { StatusBar } from '../components/StatusBar';

export class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, null);
  }

  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  public slot: number;
  public statusBar: StatusBar;

  private characterAnimation: ICharacterAnimation;

  public createCharacter(battleCharacter: IBattleCharacter): void {
    this.characterAnimation = getCharacterAnimation(battleCharacter.characterId);
    this.createAnimations(battleCharacter.characterId);
    this.sprite = this.scene.physics.add.sprite(this.x, this.y, this.characterAnimation.idle.key);
    this.setupSprite(battleCharacter.isFlip);
    this.slot = battleCharacter.slot;
    this.sprite.anims.play(this.characterAnimation.idle.key, true);
  }

  public updateAnimationSpeed(newSpeed: number): void {
    const currentAnimation = this.sprite.anims.currentAnim as IAnimation;
    if (currentAnimation) {
      currentAnimation.frameRate = currentAnimation.frameRateStart * newSpeed;
      this.sprite.anims.play(currentAnimation.key);
    }
  }

  public changeIdleAnimation(speed: number): void {
    this.sprite.anims.play(this.characterAnimation.idle.key);
    this.setupSprite();
    this.updateAnimationSpeed(speed);
  }

  public changeRunAnimation(speed: number): void {
    this.sprite.anims.play(this.characterAnimation.run.key);
    this.setupSprite();
    this.updateAnimationSpeed(speed);
  }

  public changeAttackMeleeAnimation(speed: number): number {
    this.sprite.anims.play(this.characterAnimation.attackMelee.key);
    this.setupSprite();
    this.updateAnimationSpeed(speed);
    return this.sprite.anims.currentAnim.duration;
  }

  public blinkSprite(speed: number): void {
    const tween = this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0,
      duration: 100,
      yoyo: true,
      repeat: -1,
      onYoyo: () => {
        this.scene.time.delayedCall(500 / speed, () => {
          tween.stop();
          this.sprite.setAlpha(1);
        });
      },
    });
  }

  public createStatusBar(isFlip = false): void {
    this.statusBar = new StatusBar(this.scene, this.sprite);
    this.statusBar.createStatusBarContainer(isFlip);
  }

  private setupSprite(isFlip = false): void {
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setScale(this.characterAnimation.scaleX);
    if (isFlip) {
      this.sprite.setOrigin(0, 1);
    } else {
      this.sprite.setOrigin(1, 1);
    }
    this.sprite.setFlipX(isFlip);
    this.sprite.setDepth(1);
    this.sprite.body.setSize(this.sprite.width, this.sprite.height);
  }

  private createAnimations(characterId: number): void {
    const characterAnimation = getCharacterAnimation(characterId);
    this.createIdleAnimation(characterAnimation);
    this.createRunAnimation(characterAnimation);
    this.createAttackMeleeAnimation(characterAnimation);
  }

  private createIdleAnimation(characterAnimation: ICharacterAnimation): void {
    if (!this.scene.anims.exists(characterAnimation.idle.key)) {
      const idle = this.scene.anims.create({
        key: characterAnimation.idle.key,
        frames: characterAnimation.idle.frames,
        frameRate: characterAnimation.idle.frameRate,
        repeat: characterAnimation.idle.repeat,
        yoyo: characterAnimation.idle.yoyo,
      }) as IAnimation;
      idle.frameRateStart = characterAnimation.idle.frameRateStart;
    }
  }

  private createRunAnimation(characterAnimation: ICharacterAnimation): void {
    if (characterAnimation.run && !this.scene.anims.exists(characterAnimation.run.key)) {
      const run = this.scene.anims.create({
        key: characterAnimation.run.key,
        frames: characterAnimation.run.frames,
        frameRate: characterAnimation.run.frameRate,
        repeat: characterAnimation.run.repeat,
        yoyo: characterAnimation.run.yoyo,
      }) as IAnimation;
      run.frameRateStart = characterAnimation.run.frameRateStart;
    }
  }

  private createAttackMeleeAnimation(characterAnimation: ICharacterAnimation): void {
    if (
      characterAnimation.attackMelee &&
      !this.scene.anims.exists(characterAnimation.attackMelee.key)
    ) {
      const attackMelee = this.scene.anims.create({
        key: characterAnimation.attackMelee.key,
        frames: characterAnimation.attackMelee.frames,
        frameRate: characterAnimation.attackMelee.frameRate,
        repeat: characterAnimation.attackMelee.repeat,
        yoyo: characterAnimation.attackMelee.yoyo,
      }) as IAnimation;
      attackMelee.frameRateStart = characterAnimation.attackMelee.frameRateStart;
    }
  }
}
