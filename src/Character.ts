import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Dwarf, Elf, Halfling, Orc } from './Races';
import getRandomInt from './utils';

class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _dexterity: number;
  public lifePoints: number;
  public strength: number;
  public defense: number;
  public energy: Energy;
  
  constructor(name: string) {
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this.lifePoints = this._maxLifePoints;
    this.strength = getRandomInt(1, 10);
    this.defense = getRandomInt(1, 10);
    this.energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get race(): Race { return this._race; }
  get archetype(): Archetype { return this._archetype; }
  get maxLifePoints(): number { return this._maxLifePoints; }
  get dexterity(): number { return this._dexterity; }

  attack(enemy: Fighter): void {
    const damage = this.strength;
    enemy.receiveDamage(damage);
  }

  levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this.lifePoints = this._maxLifePoints;
    this.strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this.defense += getRandomInt(1, 10);
    this.energy.amount = 10;
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this.defense;
    if (damage > 0) this.lifePoints -= damage;
    if (this.lifePoints > 0) return this.lifePoints;
    if (this.lifePoints <= 0) this.lifePoints = -1;
    return this.lifePoints;
  }

  special(enemy: Fighter): void {
    let damage = this.strength + getRandomInt(1, 10);

    switch (true) {
      case this._race instanceof Dwarf:
        damage += this.defense;
        break;
      case this._race instanceof Elf:
        damage += (this._maxLifePoints / 2);
        break;
      case this._race instanceof Halfling:
        damage += this._dexterity;
        break;
      case this._race instanceof Orc:
        damage += (this._maxLifePoints - this.lifePoints);
        break;
      default:
        break;
    }

    enemy.receiveDamage(damage);
  }
}

export default Character;
