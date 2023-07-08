# Асинхронное подключение страниц и редьюсеров

Асинхронное подключение страниц реализовано средствами React'а:
``` js
export const ArticlesPageAsync = lazy(() => import('./ArticlesPage'));
```

Асинхронное подключение редьюсеров реализовано при помощи **reducerManger** и кастомного компонента **DynamicModuleLoader**.

## reducerManager
Описание этой концепции есть в [официальной документации Redux Toolkit](https://redux.js.org/usage/code-splitting).
**reducerManager** возвращает объект, который умеет добавлять и удалять редьюсеры. 

Код функции:
``` js
export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
  const reducers = { ...initialReducers };

  let combinedReducer = combineReducers(reducers);

  let keysToRemove: Array<StateSchemaKey> = [];

  return {
    getReducerMap: () => reducers,
    reduce: (state: StateSchema, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        keysToRemove.forEach((key) => {
          delete state[key];
        });
        keysToRemove = [];
      }
      return combinedReducer(state, action);
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;

      combinedReducer = combineReducers(reducers);
    },
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}
```

## DynamicModuleLoader
Кастомный компонент-обертка, в который мы оборачиваем те страницы и компоненты, где используются асинхронные редьюсеры.
На вход принимает пропсы **removeAfterUnmount** (*true/false*) и список редьюсеров, которыми нужно управлять **reducers**.
При маунте компонента переданные редьюсеры добавляются в redux store, при анмаунте, если передан пропс **removeAfterUnmount** со значением *true* - удаляются.

Код компонента:
``` js
export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const {
    children,
    reducers,
    removeAfterUnmount = true,
  } = props;

  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const mountedReducers = store.reducerManager.getReducerMap();
    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];

      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line
    }, []);

  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};
```

Здесь использован именно **useLayoutEffect**, потому что в некоторых случаях от подгрузки редьюсера зависело отображение элементов, например, состояния загрузки. **useLayoutEffect** гарантирует подключение необходимого редьюсера до того, как компонент начнент рендериться, а значит, компонент точно сможет получать актуальные данные из redux. 