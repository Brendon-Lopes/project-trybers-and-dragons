import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

class PVE extends Battle {
  constructor(player: Fighter, private _monsters: SimpleFighter[]) {
    super(player);
  }

  fight(): number {
    while (
      this.player.lifePoints > 0
      && this._monsters.every(({ lifePoints }) => lifePoints > 0)
    ) {
      this._monsters.forEach((monster) => this.player.attack(monster));
      this._monsters.forEach((monster) => monster.attack(this.player));
    }

    return this.player.lifePoints === -1 ? -1 : 1;
  }
}

export default PVE;
