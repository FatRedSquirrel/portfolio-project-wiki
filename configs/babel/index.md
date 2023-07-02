# Babel

## babelRemovePropsPlugin
Самостоятельно написанный плагин для бабеля, который умеет удалять выбранные пропсы из компонентов.
В проекте используется для удаления пропса **data-testid**, который использовался в тестах.

Использование в babel loader:
``` js
isTsx && isProd && [
  babelRemovePropsPlugin,
  {
    props: ['data-testid'],
  },    
]    
```

Код плагина:
``` js
export default function (): PluginItem {
  return {
    visitor: {
      Program(path, state) {
        const forbidden = state.opts.props || [];

        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name;

            if (forbidden.includes(nodeName)) {
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}
```