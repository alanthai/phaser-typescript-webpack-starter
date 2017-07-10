import * as Phaser from 'phaser';

import { Unit } from '../units/unit.type';
import { Actor } from './actor';

export type ActorConstructor = new (game: Phaser.Game, unit: Unit) => Actor;
