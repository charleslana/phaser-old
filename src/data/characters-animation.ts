import { aokijiIdle, pirateIdle } from './asset-keys';
import { ICharacterAnimation } from '../interface/ICharacterAnimation';

export const characterAokiji: ICharacterAnimation = {
  scaleX: 2,
  idle: {
    key: aokijiIdle,
    frames: [
      { key: aokijiIdle, frame: 'aokiji_0-0.png' },
      { key: aokijiIdle, frame: 'aokiji_0-1.png' },
      { key: aokijiIdle, frame: 'aokiji_0-2.png' },
    ],
    frameRate: 7,
    frameRateStart: 7,
    repeat: -1,
    yoyo: true,
  },
};

export const characterPirate: ICharacterAnimation = {
  scaleX: 2,
  idle: {
    key: pirateIdle,
    frames: [
      { key: pirateIdle, frame: '1.png' },
      { key: pirateIdle, frame: '2.png' },
      { key: pirateIdle, frame: '3.png' },
    ],
    frameRate: 7,
    frameRateStart: 7,
    repeat: -1,
    yoyo: true,
  },
};
