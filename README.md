# Приложение Messanger

Ссылка на макет интерфейса в Figma: [Макет](https://www.figma.com/file/5Gq3kMKYL4bYdGCFv5cZ9v/Messanger?type=design&node-id=0%3A1&mode=design&t=YcjEqpvX1gQwcTtt-1)

## Адрес прилоежния на Netlify
[Ссылка](https://exquisite-sherbet-c8f147.netlify.app/)

## Используемые технологии
![image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![image](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![image](https://img.shields.io/badge/Handlebars%20js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)

## Установка проекта
Для запуска у вас должна быть уставновлн Nodejs версии >= 20.10.0

- Клонировать репозиторий:
```shell
git clone https://github.com/BorshevVladimir/messanger
cd messanger
```

- Установка зависимостей:
```shell
npm install
```


## Запуск проекта
Команда для запуска проекта:
```shell
npm run start
```
## Навигация
После запуска приложение будет доступно по адресу: http://localhost:3000/
Переход между страницами не вызывает перезагрузуку страницы.

Для неавторизованного пользователя доступы следующие роуты:
- **/** - страница авторизации;
- **/sign-up** - страница регистрации;

После авторизации пользователю будут доступны следующие роуты:
- **/settings** - страница настроек пользователя;
- **/messenger** - страница с чатами пользователя
- **/change-password** - страница смены пароля пользователя

При попытке получить доступ к несуществующей странице пользователь будет перенаправлен на роут **/404**

## Функциональность
У авторизованного пользователя имеются следующие возможности:
- создавать чаты;
- добавлять пользователей в чат по логину;
- удалять пользователей из чата;
- удалять чаты;
- отправлять текстовые сообщения пользователям в чате;
- изменять аватарку чата;
- изменять информацю о себе;
- изменять свою аватарку;
- сменить свой пароль на новый;

## Сборка проекта
Команда для сборки проекта:
```shell
npm run build
```
После выполнения команды сборка будет сохранена в папку dist.

## Запуск тестов
Команда для запуска тестов:
```shell
npm run test
```
