import { Action } from './action.type';
import { AppState } from './app-state.type';
import { rootReducer } from './root.reducer';

const defaultEqualityChecker = (a, b) => a === b;

type ReducerFn<T> = (state: T, action: Action<any>) => T;

export class Store<T> {
  static ACTION_EVENT = 'actionEvent';
  static COMPLETED_EVENT = 'completedEvent';

  private store = new p2.EventEmitter();
  private state: T;
  private listeners: Function[] = [];
  private reducerFn: Function;

  constructor(rootReducerFn: ReducerFn<T>) {
    this.state = rootReducerFn(undefined, { type: '' });

    this.reducerFn = ({ action }: { action: Action }) => {
      this.state = rootReducerFn(this.state, action);
      this.store.emit({ type: Store.COMPLETED_EVENT, state: this.state });
    };

    this.start();
  }

  start(): void {
    this.store.on(Store.ACTION_EVENT, this.reducerFn, this);
  }

  dispatch(action: Action<any>): void {
    this.store.emit({ type: Store.ACTION_EVENT, action });
  }

  synchronize<V>(
    obj: any,
    prop: string,
    selectorFn: (state: T) => V,
    equalityChecker: (a: V, b: V) => boolean = defaultEqualityChecker,
  ): () => void {
    let oldValue = selectorFn(this.state);

    function synchronizeFn(state: T) {
      const newValue = selectorFn(state);

      if (equalityChecker(oldValue, newValue)) {
        obj[prop] = newValue;
      }

      oldValue = newValue;
    }

    return this.subscribe(synchronizeFn);
  }

  select<V>(selectorFn: (state: T) => V, callback: Function): () => void {
    const fn = (state: T) => {
      const value = selectorFn(state);
      callback(value);
    };

    return this.subscribe(fn);
  }

  subscribe(fn: Function): () => void {
    const listenerFn = ({ state }: { state: T }) => {
      fn(state);
    };

    this.listeners.push(listenerFn);
    this.store.on(Store.COMPLETED_EVENT, listenerFn, undefined);

    // unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listenerFn);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
      this.store.off(Store.COMPLETED_EVENT, listenerFn);
    };
  }

  destroy(): void {
    this.store.off(Store.ACTION_EVENT, this.reducerFn);
    this.listeners.forEach(listener =>
      this.store.off(Store.COMPLETED_EVENT, listener),
    );
  }

  getState(): T {
    return this.state;
  }

  setState(state: T): void {
    this.state = state;
    this.store.emit({ type: Store.COMPLETED_EVENT, state });
  }
}

export const store = new Store<AppState>(rootReducer);
