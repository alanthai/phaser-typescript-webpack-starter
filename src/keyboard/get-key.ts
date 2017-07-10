import { Key } from './key.type';
import { ENUM_KEY_MAP } from './enum-key-map';

function returnWithLocation(
  standard: Key,
  left: Key,
  right: Key,
  event: KeyboardEvent,
): Key {
  if (event.location === event.DOM_KEY_LOCATION_LEFT) {
    return left;
  } else if (event.location === event.DOM_KEY_LOCATION_RIGHT) {
    return right;
  } else {
    return standard;
  }
}

export function getKey(event: KeyboardEvent): Key {
  switch (event.key) {
    case 'Alt':
      return returnWithLocation(Key.Alt, Key.LeftAlt, Key.RightAlt, event);
    case 'Control':
      return returnWithLocation(
        Key.Control,
        Key.LeftControl,
        Key.RightControl,
        event,
      );
    case 'Shift':
      return returnWithLocation(
        Key.Shift,
        Key.LeftShift,
        Key.RightShift,
        event,
      );

    default:
      return ENUM_KEY_MAP[event.key];
  }
}
