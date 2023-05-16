# Grad-Work-Alpha
## Веб-приложение для парсинга расписания учебных занятий с изображения или PDF, редактирования, просмотра и экспорта расписания
![image](https://github.com/ebolblga/Grad-Work-Alpha/assets/82185066/07eab8ef-faea-41f8-8bdf-c53fc289c616)
![image](https://github.com/ebolblga/Grad-Work-Alpha/assets/82185066/16b85982-b477-4b5e-804f-8ea415fc2c78)
![image](https://github.com/ebolblga/Grad-Work-Alpha/assets/82185066/7566594a-2844-41af-8a15-672b9ba6041e)
![image](https://github.com/ebolblga/Grad-Work-Alpha/assets/82185066/6dba8c6a-398c-4f92-9fee-1b8b81bfd66a)

## Основные шаги в парсинге расписания с изображения:
### 1. Загрузка фото  
![image](https://user-images.githubusercontent.com/82185066/236590277-b19a946b-3601-48d6-8447-a74f58a6839e.png)

### 2. Бинаризация локальным методом Вульфа  
![image](https://user-images.githubusercontent.com/82185066/236590298-1913bbcc-5f53-4353-a674-c50ab3115b71.png)

### 3. Поиск замкнутых контуров  
![image](https://github.com/ebolblga/Grad-Work-Alpha/assets/82185066/0b456d3e-3447-4816-adbd-d0cc5ad101a1)

![image](https://user-images.githubusercontent.com/82185066/236590314-2dbe26a4-ac4e-465f-b308-f0155ff07702.png)

### 4. Выравнивание перспективы  
![image](https://user-images.githubusercontent.com/82185066/236590324-7bdefbc8-67a0-49f4-9306-877f2c61fdef.png)

### 5. Сегментация изображения
### 6. Оптическое распознавание текста
### 7. Корректировка ошибок считывания
### 8. Синтаксический анализ

## Зависимости
[opencv.js](https://www.npmjs.com/package/@techstark/opencv-js)  
[tesseract.js](https://tesseract.projectnaptha.com/)  
[v-calendar](https://www.npmjs.com/package/v-calendar)  
[pdfjs-dist](https://www.npmjs.com/package/pdfjs-dist)  
[kevinmarrec/nuxt-pwa](https://github.com/kevinmarrec/nuxt-pwa-module)  

## Как запустить проект используя [Node.js](https://nodejs.org/en/) and [Visual Studio Code](https://code.visualstudio.com/download)

```bash
# установите yarn
npm install --global yarn

# теперь установите все модули
yarn

# запустите проект
yarn dev
```

## Лицензия
Эта программа распространяется под лицензией MIT License. Пожалуйста, прочтите файл лицензии, чтобы узнать об условиях использования.
