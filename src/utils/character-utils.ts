import { characterAokiji, characterPirate } from '../data/characters-animation';
import { ICharacterAnimation } from '../interface/ICharacterAnimation';

export function getCharacterAnimation(characterId: number): ICharacterAnimation {
  switch (characterId) {
    case 1:
      return characterAokiji;
    case 2:
      return characterPirate;
    default:
      break;
  }
}
