import { defineConfig } from 'vitepress';
import { readFileSync, readdirSync, writeFileSync } from 'fs';

export default defineConfig({
  title: 'Portfolio Project Wiki',
  description: 'Документация Portfolio Project',
  head: [['link', { rel: 'icon', type: 'image/webp', href: '/favicon.webp' }]],
  themeConfig: {
    nav: [
      { text: 'Главная', link: '/' },
      {
        text: 'Документация',
        link: '/general/',
        // @ts-ignore
        activeMatch: /\/.+/,
      }
    ],
    sidebar: [
      {
        text: 'Основная информация',
        link: '/general/'
      },
      {
        text: 'Описание скриптов из package.json',
        link: '/scripts/'
      },
      {
        text: 'Хуки и функции',
        link: '/functions/'
      },
      {
        text: 'CI',
        link: '/CI/'
      },
      {
        text: 'Конфигурация',
        items: [
          {
            text: 'Webpack',
            link: '/configs/webpack/',
          },
          {
            text: 'Storybook',
            link: '/configs/storybook/',
          },
          {
            text: 'Babel',
            link: '/configs/babel/',
          },
        ],
      },
      {
        text: 'Общее',
        items: [
          {
            text: 'Авторизация',
            link: '/common/auth/'
          },
          {
            text: 'Лэйаут',
            link: '/common/layout/'
          },
          {
            text: 'Роутинг',
            link: '/common/routing/',
          },
          {
            text: 'Асинхронное подключение страниц и редьюсеров',
            link: '/common/async/',
          },
          {
            text: 'Темы',
            link: '/common/themes/',
          },
          {
            text: 'Поддержка мобильных девайсов',
            link: '/common/mobile/',
          },
          {
            text: 'Работа с изображениями',
            link: '/common/images/',
          },
          {
            text: 'Работа с Feature Flags',
            link: '/common/feature-flags/',
          },
          {
            text: 'Вспомогательные скрипты',
            link: '/common/scripts/',
          },
        ],
      },
      {
        text: 'Страницы',
        items: [
          {
            text: 'Страница статей',
            link: '/pages/articles/',
          },
          {
            text: 'Страница одной статьи',
            link: '/pages/article-details/',
          },
          {
            text: 'Страница профиля',
            link: '/pages/profile/',
          },
          {
            text: 'Страница настроек пользователя',
            link: '/pages/settings/',
          },
          {
            text: 'Прочие страницы',
            link: '/pages/other/',
          }
        ],
      },
    ],

    socialLinks: [
      {
        icon: {
          svg: readFileSync('assets/website-link.svg', {
            encoding: 'utf-8',
          }),
        },
        link: 'https://frolicking-treacle-5b669c.netlify.app',
      },
    ],
  },
});