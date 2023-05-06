# Grad-Work-Alpha
## Сайт для парсинга расписания с изображения, просмотра календаря пар и экспорта расписания

![image](https://user-images.githubusercontent.com/82185066/236590158-5b02fef2-01f6-47c0-bae9-a9d4b859a3b9.png)  
![image](https://user-images.githubusercontent.com/82185066/236590166-a1664079-0829-4a44-8b3a-9ecc9908f7fd.png)  
![image](https://user-images.githubusercontent.com/82185066/236590180-34b09ac3-4a14-4761-adaf-edf242b9b30f.png)  

## Основные шаги в парсинге расписания с фото:
### 1. Загрузка фото  
![image](https://user-images.githubusercontent.com/82185066/236590277-b19a946b-3601-48d6-8447-a74f58a6839e.png)

### 2. Бинаризация локальным методом Вульфа  
![image](https://user-images.githubusercontent.com/82185066/236590298-1913bbcc-5f53-4353-a674-c50ab3115b71.png)

### 3. Поиск замкнутых контуров  
![image](https://user-images.githubusercontent.com/82185066/236590314-2dbe26a4-ac4e-465f-b308-f0155ff07702.png)

### 4. Выравнивание перспективы  
![image](https://user-images.githubusercontent.com/82185066/236590324-7bdefbc8-67a0-49f4-9306-877f2c61fdef.png)

### 5. Сегментация
### 6. OCR
### 7. Корректировка ошибок считывания
### 8. Парсинг данных

## Зависимости
[opencv.js](https://www.npmjs.com/package/@techstark/opencv-js)  
[tesseract.js](https://www.npmjs.com/package/tesseract.js/v/2.1.0)  
[v-calendar](https://www.npmjs.com/package/v-calendar)  

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
