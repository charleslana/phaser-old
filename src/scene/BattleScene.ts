import * as Phaser from 'phaser';
import { battleBackground1 } from '../data/asset-keys';
import { battleSceneKey, homeSceneKey } from '../data/scene-keys';
import { Character } from '../actor/Character';

export class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: battleSceneKey });
  }

  private players: Character[] = [];
  private enemies: Character[] = [];
  private player: Character;
  private enemy: Character;
  private speedMultiplier = 1;

  preload(): void {
    this.loadPlayer();
    this.loadEnemy();
  }

  create(): void {
    this.setBackgroundImage();
    this.createLayout();
    this.createPlayer();
    this.createEnemy();
    this.createMovePlayer();
    this.createChangeSpeedButton();
    this.createSlots();
  }

  private setBackgroundImage(): void {
    this.cameras.main.setBackgroundColor('#ffffff');
    const backgroundImage = this.add.image(0, 0, battleBackground1).setOrigin(0, 0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  private createLayout(): void {
    this.add.text(100, 100, 'Cena 2 - Pressione tecla delete para voltar para a cena anterior', {
      backgroundColor: '#ffffff',
      color: '#000000',
    });
    this.input.keyboard.on('keydown-DELETE', () => {
      this.scene.start(homeSceneKey);
    });
  }

  private loadPlayer(): void {
    this.player = new Character(this, 200, 400);
  }

  private loadEnemy(): void {
    this.enemy = new Character(this, 200, 400);
    this.updateEnemyPosition();
  }

  private updateEnemyPosition(): void {
    const playerX = this.player.x;
    const screenWidth = this.cameras.main.width;
    const enemyX = screenWidth - playerX;
    this.enemy.setPosition(enemyX, this.enemy.y);
  }

  private createPlayer(): void {
    this.player.createCharacter({ characterId: 1, slot: 1 });
    this.players.push(this.player);
  }

  private createEnemy(): void {
    this.enemy.createCharacter({ characterId: 2, slot: 2, isFlip: true });
    this.enemies.push(this.enemy);
  }

  private createMovePlayer(): void {
    this.input.keyboard.on('keydown-A', () => {
      this.moveToEnemy();
    });
  }

  private moveToEnemy(): void {
    this.player.sprite.depth++;
    const destinationX = this.enemy.x - this.enemy.width;
    const tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
      targets: this.player.sprite,
      x: destinationX,
      y: this.enemy.y,
      duration: 500 / this.speedMultiplier,
      onComplete: () => {
        this.time.delayedCall(1000 / this.speedMultiplier, () => {
          this.playerReturnToStartPosition();
        });
      },
    };
    this.tweens.add(tweenConfig);
  }

  private playerReturnToStartPosition(): void {
    const tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
      targets: this.player.sprite,
      x: this.player.x,
      y: this.player.y,
      duration: 500 / this.speedMultiplier,
      onComplete: () => {
        this.player.sprite.depth--;
      },
    };
    this.tweens.add(tweenConfig);
  }

  private createChangeSpeedButton(): void {
    const buttonWidth = 120;
    const buttonHeight = 40;
    const buttonX = this.cameras.main.width - buttonWidth / 2 - 20;
    const buttonY = this.cameras.main.height - buttonHeight / 2 - 20;
    const button = this.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0x8b4513);
    button.setOrigin(0.5);
    button.setDepth(2);
    const buttonText = this.add.text(0, 0, `${this.speedMultiplier}x`, {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#ffffff',
    });
    buttonText.setOrigin(0.5);
    buttonText.setDepth(2);
    Phaser.Display.Align.In.Center(buttonText, button);
    button.setInteractive({ cursor: 'pointer' });
    button.on('pointerdown', () => {
      this.changeSpeedMultiplier(buttonText);
    });
  }

  private changeSpeedMultiplier(buttonText: Phaser.GameObjects.Text): void {
    this.speedMultiplier += 0.5;
    if (this.speedMultiplier > 2) {
      this.speedMultiplier = 1;
    }
    buttonText.text = `${this.speedMultiplier}x`;
    this.player.updateAnimationSpeed(this.speedMultiplier);
    this.enemy.updateAnimationSpeed(this.speedMultiplier);
  }

  private createSlots(): void {
    const slotWidth = 80;
    const slotHeight = 120;
    const slotPaddingX = 20;
    const slotPaddingY = 20;
    const { startXFront, startXBack, startY } = this.calculateSlotPositions(
      slotWidth,
      slotPaddingX,
      slotHeight,
      slotPaddingY
    );
    this.renderPlayerSlots(startXFront, startXBack, startY, slotWidth, slotHeight, slotPaddingY);
    this.renderEnemySlots(startXFront, startXBack, startY, slotWidth, slotHeight, slotPaddingY);
  }

  private calculateSlotPositions(
    slotWidth: number,
    slotPaddingX: number,
    slotHeight: number,
    slotPaddingY: number
  ): { startXFront: number; startXBack: number; startY: number } {
    const offsetX = 80;
    const startXFront = offsetX + slotWidth / 2;
    const startXBack = offsetX + slotWidth / 2 + slotWidth + slotPaddingX + 40;
    const offsetY = 170;
    const startY = offsetY + slotHeight / 2 + slotPaddingY;
    return { startXFront, startXBack, startY };
  }

  private renderPlayerSlots(
    startXFront: number,
    startXBack: number,
    startY: number,
    slotWidth: number,
    slotHeight: number,
    slotPaddingY: number
  ): void {
    for (let i = 1; i <= 6; i++) {
      let x: number, y: number;
      if (i <= 3) {
        x = startXBack;
        y = startY + (i - 1) * (slotHeight + slotPaddingY);
      } else {
        x = startXFront;
        y = startY + (i - 4) * (slotHeight + slotPaddingY);
      }
      const slot = this.add.rectangle(x, y, slotWidth, slotHeight, 0xffffff);
      slot.setOrigin(0.5, 1);
      slot.setStrokeStyle(2, 0x000000);
      slot.setAlpha(1);
      this.players.forEach(player => {
        if (i === player.slot) {
          player.setPosition(x, y);
          player.sprite.setPosition(x, y);
        }
      });
    }
  }

  private renderEnemySlots(
    startXFront: number,
    startXBack: number,
    startY: number,
    slotWidth: number,
    slotHeight: number,
    slotPaddingY: number
  ): void {
    for (let i = 1; i <= 6; i++) {
      let x: number, y: number;
      if (i <= 3) {
        x = this.cameras.main.width - startXBack;
        y = startY + (i - 1) * (slotHeight + slotPaddingY);
      } else {
        x = this.cameras.main.width - startXFront;
        y = startY + (i - 4) * (slotHeight + slotPaddingY);
      }
      const slot = this.add.rectangle(x, y, slotWidth, slotHeight, 0xffffff);
      slot.setOrigin(0.5, 1);
      slot.setStrokeStyle(2, 0x000000);
      slot.setAlpha(1);
      this.enemies.forEach(enemy => {
        if (i === enemy.slot) {
          enemy.setPosition(x, y);
          enemy.sprite.setPosition(x, y);
        }
      });
    }
  }
}
