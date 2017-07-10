import { UnitType } from './unit-type.type';

export interface Unit {
  unitType: UnitType;
}

export function instanceOfUnit(obj: any): obj is Unit {
  return 'unitType' in obj;
}
