# Webpack

Основной файл **webpack.config.ts** хранится в корне проекта. Конфигурация дуструктуризирована.
Основной ее код находится в папке **config/build**, которая тоже лежит в корне проекта. 
Выглядит это так:

![Import webpack-config screenshot](/assets/webpack-config.png)

Вебпак работает в двух режимах **dev** и **prod**, которые переключаются в зависимости от переменной окружения **isDev**.

В dev режиме, в отличие от prod:
* используются дополнительные плагины (**ReactRefreshWebpackPlugin**, **HotModuleReplacementPlugin**);
* используются другие лоадеры и т. д.