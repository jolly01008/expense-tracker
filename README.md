# 我的餐廳清單

![image](https://github.com/jolly01008/expense-tracker/blob/main/public/readmeImage/image01.png)
![image](https://github.com/jolly01008/expense-tracker/blob/main/public/readmeImage/image02.png)
![image](https://github.com/jolly01008/expense-tracker/blob/main/public/readmeImage/image03.png)

## 介紹

紀錄屬於自己的支出清單，可以瀏覽、編輯支出、利用分類查詢花費。

### 功能

1. 使用者可註冊帳號或連結 Facebook 登入
2. 新增、編輯、瀏覽或刪除支出資訊
3. 依照支出類別搜尋特定花費

## 開始使用

1. 請先確認有安裝 node.js 與 npm

2. 將專案 clone 到本地

3. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd expense-tracker
```

4. 安裝所需套件

```
npm i [套件名稱]
```

5. 設置.env 檔

```
請修改 `.env.example` 成 .env
```

6. 匯入種子檔案

```
npm run seed
```

若看到 restaurantSeeder done! 表示種子載入完成。

7. 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

8. 當 terminal 出現以下字樣，表示伺服器已啟動

> Express is running on http://localhost:3000
>
> mongodb connected!

## 開發工具

- Node.js 14.16.0
- nodemon
- Express 4.16.4
- Express-Handlebars 4.0.3
- Bootstrap
- Font-awesome
- MongoDB
- mongoose 6.6.1
- dotenv 8.2.0
- method-override @3.0.0
- express-session @1.17.1
- passport @0.4.1
- passport-facebook @3.0.0
- passport-local @1.0.0
- bcryptjs @2.4.3
- connect-flash @0.1.1
