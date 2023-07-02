# Работа с Feature Flags

Работа с feature flags осуществляется с помощью компонента **ToggleFeatures** и функции **toggleFeatures**.

Примеры использования компонента **ToggleFeatures**:

``` js
<ToggleFeatures
  feature='isAppRedesigned'
  on={<Text title={title} className={cls.title} />}
  off={<TextDeprecated title={title} className={cls.title} />}
/>  
```

``` js
<ToggleFeatures
  feature='isAppRedesigned'
  on={<ListBox {...ListBoxProps} />}
  off={<ListBoxDeprecated {...ListBoxProps} />}
/>  
```

Примеры использования функции **toggleFeatures**:

``` js
const mainClass = toggleFeatures({
  name: 'isAppRedesigned',
  on: () => cls.NavbarRedesigned,
  off: () => cls.Navbar,
});   
```

``` js
const Skeleton = toggleFeatures({
  name: 'isAppRedesigned',
  on: () => SkeletonRedesigned,
  off: () => SkeletonDeprecated,
});
```

Фичи прилетают с сервера в поле **features** объекта данных пользователя.

Для автоматического выпиливания фичей был написан скрипт [remove-feature](/common/scripts/).