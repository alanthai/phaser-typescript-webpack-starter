import { Unit } from '../units/unit.type';

export interface UnitActions<T extends Unit> {
  [action: number]: (unit: T, ...args: any[]) => void;
}
