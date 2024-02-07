import * as Phaser from 'phaser';
import { aokijiIdle } from '../data/asset-keys';
import { getCharacterAnimation } from '../utils/character-utils';
import { IAnimation } from '../interface/IAnimation';
import { IBattleCharacter } from '../interface/IBattleCharacter';

export class Character extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, aokijiIdle);
  }

  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  public slot: number;

  public createCharacter(battleCharacter: IBattleCharacter): void {
    const characterAnimation = getCharacterAnimation(battleCharacter.characterId);
    this.createAnimations(battleCharacter.characterId);
    this.sprite = this.scene.physics.add.sprite(this.x, this.y, characterAnimation.idle.key);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setScale(characterAnimation.scaleX);
    this.sprite.setOrigin(0.5, 1);
    this.sprite.setFlipX(battleCharacter.isFlip);
    this.sprite.setDepth(1);
    this.slot = battleCharacter.slot;
    this.sprite.anims.play(characterAnimation.idle.key, true);
  }

  public updateAnimationSpeed(newSpeed: number): void {
    const currentAnimation = this.sprite.anims.currentAnim as IAnimation;
    if (currentAnimation) {
      currentAnimation.frameRate = currentAnimation.frameRateStart * newSpeed;
      this.sprite.anims.play(currentAnimation.key);
    }
  }

  private createAnimations(characterId: number): void {
    const characterAnimation = getCharacterAnimation(characterId);
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
}
