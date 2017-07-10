import { moveLeft } from './move-left.sprite-actions';
import { moveRight } from './move-right.sprite-actions';

export const walk = {
  ...moveLeft,
  ...moveRight,
};
