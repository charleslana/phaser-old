import * as Phaser from 'phaser';
import { BattleScene } from './scene/BattleScene';
import { battleSceneKey, homeSceneKey, preloadSceneKey } from './data/scene-keys';
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
  audio: {
    disableWebAudio: true,
  },
});

game.scene.add(preloadSceneKey, PreloadScene);
game.scene.add(homeSceneKey, HomeScene);
game.scene.add(battleSceneKey, BattleScene);
game.scene.start(preloadSceneKey);
