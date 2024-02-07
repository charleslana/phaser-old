import * as Phaser from 'phaser';
import { BattleScene } from './scene/BattleScene';
import { HomeScene } from './scene/HomeScene';
import { PreloadScene } from './scene/PreloadScene';

const game = new Phaser.Game({
  type: Phaser.CANVAS,
  pixelArt: true,
  backgroundColor: '#000000',
  scale: {
    width: 1024,
    height: 576,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  banner: false,
});

game.scene.add(PreloadScene.key, PreloadScene);
game.scene.add(HomeScene.key, HomeScene);
game.scene.add(BattleScene.key, BattleScene);
game.scene.start(PreloadScene.key);
