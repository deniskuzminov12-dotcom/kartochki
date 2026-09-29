# Артефакты — коллекционная игра

Игра работает как мобильное веб-приложение и открывается на iPhone через Safari. В ней 24 карточки четырёх редкостей:

- обычные — 58%;
- редкие — 27%;
- эпические — 12%;
- легендарные — 3%.

Игрок получает бесплатный кейс раз в день. Дополнительные кейсы стоят 20 кристаллов. Дубликаты отмечаются в коллекции и возвращают 5 кристаллов. Карты, кристаллы, количество открытий и дубликаты сохраняются в браузере автоматически.

## Как обновить GitHub Pages

В репозитории выбери **Add file → Upload files**, загрузи `index.html`, `style.css`, `app.js`, `manifest.json`, `sw.js`, `README.md`, затем нажми **Commit changes**. Через несколько минут обнови страницу игры. Если iPhone показывает старую версию, закрой вкладку и открой ссылку заново; при установленной версии на экран «Домой» иногда помогает удалить ярлык и добавить его снова.

## Google-вход и синхронизация

Локальное сохранение работает без настройки. Для синхронизации коллекции между устройствами:

1. В [Firebase Console](https://console.firebase.google.com/) создай проект и Web-приложение (`</>`).
2. В **Build → Authentication → Sign-in method** включи **Google**.
3. В **Authentication → Settings → Authorized domains** добавь домен GitHub Pages, например `deniskuzminov12-dotcom.github.io`.
4. В **Build → Firestore Database** создай базу данных.
5. Вкладка **Rules**:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

6. Скопируй Web-конфигурацию Firebase в объект `FIREBASE_CONFIG` в начале `app.js` и загрузи `app.js` на GitHub ещё раз.

Web-конфигурация (`apiKey`, `authDomain`, `projectId` и другие поля) предназначена для браузера. Секретный ключ сервисного аккаунта в сайт добавлять нельзя.
