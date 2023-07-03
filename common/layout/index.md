# Лэйаут

В новом варианте дизайна приложения используется компонент **MainLayout**, в который пропсами передаются основные элементы приложения.

Код компонента:
``` js
export const MainLayout = memo((props: MainLayoutProps) => {
  const {
    className, content, toolbar, header, sidebar,
  } = props;

  return (
    <div className={classNames(cls.MainLayout, {}, [className])}>
      <div className={cls.content}>{content}</div>
      <div className={cls.sidebar}>{sidebar}</div>
      <div className={cls.rightbar}>
        <div className={cls.header}>{header}</div>
        <div className={cls.toolbar}>{toolbar}</div>
      </div>
    </div>
  );
});
```

Итого, страница формируется следующим образом:
* Слева - **Sidebar**
* По центру - **Content**
* Справа - **Header** и **Toolbar**

## Toolbar
Тулбар реализован в приложении лишь в одном виде - он содержит кнопку скролла наверх. Однако она нужна не на всех страницах, на некоторых из них тулбар в перспективе мог бы быть другим. Для управления контентом тулбара на разных страницах написан хук 
**useAppToolbar**, о котором подробнее [здесь](/functions/#useapptoolbar).