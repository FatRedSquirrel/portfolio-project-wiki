# CI
На гитхабе проекта настроен **CI**, который работает на пуши и мердж реквесты в **main** ветку.

Выполняются 2 jobs:
* **build-and-testing** - здесь устанавливаются пакеты, собирается приложение, [Storybook](https://fatredsquirrel.github.io/production-project/), а также прогоняются все unit-тесты
* **checks-linting** - здесь выполняется линтиг всех файлов с помощью **Eslint** и **Stylelint**

Файл с конфигурацией выглядит так:
```yml
name: linting, testing, building
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
permissions:
  contents: write
  id-token: write
jobs:
  build-and-testing:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [ 17.x ]
    steps:
      - uses: actions/checkout@v2
      - name: Staring Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: install modules
        run: npm ci --force
      - name: build production project
        run: npm run build:prod
        if: always()
      - name: build storybook
        run: npm run storybook:build
        if: always()
      - name: unit testing
        if: always()
        run: npm run test:unit

  checks-linting:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [ 17.x ]
    steps:
      - uses: actions/checkout@v2
      - name: Staring Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: install modules
        run: npm ci --force
      - name: linting typescript
        run: npm run lint:ts
        if: always()
      - name: linting css
        run: npm run lint:scss
```

