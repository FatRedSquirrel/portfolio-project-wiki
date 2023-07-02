# Storybook

В проекте написаны [Stories][storybook-link] для большинства UI компонентов как redesigned, так и deprecated.

Конфиг можно найти по пути *config/storybook*.

Добавлены, помимо прочих, следуюшие декораторы (все декораторы лежат в *src/shared/config/storybook*):

* **StyleDecorator** - дает историям доступ к глобальным переменным и стилям
``` js
import '../../../../app/styles/index.scss';

export const StyleDecorator = (Story: StoryFn) => <Story />;
```

* **ThemeDecorator** - дает возможность присваивать компонентам одну из тем
``` js
export const ThemeDecorator = (theme: Theme) => (Story: StoryFn) => (
  <ThemeProvider initialTheme={theme}>
    <div className={`app ${theme}`}>
      <Story />
    </div>
  </ThemeProvider>
);
```

* **FeatureFlagsDecorator** - дает возможность присвоить желаемое значение фичам в компоненте
``` js
export const FeatureFlagsDecorator = (features: FeatureFlags) => 
  (Story: StoryFn) => {
    setFeatureFlags(features);

    return <Story />;
};
```

* **StoreDecorator** - дает историям доступ к redux хранилищу
``` js
export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList,
) => (StoryComponent: StoryFn) => (
  <StoreProvider 
    initialState={state} 
    asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
  >
    <StoryComponent />
  </StoreProvider>
);
```

* **ContainerDecorator** - для дополнительных стилей отдельных историй
``` js
export const ContainerDecorator = (style: CSSProperties) => (Story: StoryFn) => (
  <div style={style}>
    <Story />
  </div>
);
```

[storybook-link]: https://fatredsquirrel.github.io/production-project/