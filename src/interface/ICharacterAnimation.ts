import * as Phaser from 'phaser';

interface AnimationFrame {
  key?: string;
  frames?: string | Phaser.Types.Animations.AnimationFrame[];
  frameRate?: number;
  frameRateStart?: number;
  repeat?: number;
  yoyo?: boolean;
}

export interface ICharacterAnimation {
  scaleX?: number;
  idle?: AnimationFrame;
}
