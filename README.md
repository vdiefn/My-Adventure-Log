# My Adventure Log


## 使用Node.js、Express以及MongoDB打造電腦版的個人潛水日誌。


### 產品功能


1. 使用者須先完成註冊並登入後才能使用後續功能，註冊資料包含：名稱、Email、密碼。
2. 使用者進行註冊的帳戶和email不會與他人重複
3. 使用者登入後可以新增每一次的潛水日誌，日誌內容包含：潛水日期、主題、地點、方式、天氣、水面溫度、水下溫度、潛水時間、最大深度、殘壓、能見度、筆記內容以及照片一張。
4. 使用者可於潛水日誌頁面看到總潛水次數，以及每一潛的基本內容，包含：日期、地點以及潛水地點等資訊。
5. 使用者可於潛水日誌的主畫面選擇：
    - 內容：查看該次潛水日誌的詳細內容
    - 修改：修改之前新增的潛水內容
    - 刪除：刪除該筆潛水內容
6. 使用者可於潛水日誌的頁面使用搜尋功能來查找特定的潛水紀錄或者可以使用年份篩選的方式來尋找特定年份的潛水紀錄。
7. 使用者可點選左側欄的「動態」選項，則可改為使用瀏覽照片搭配簡易的潛水內容(時長、最大深度、水下溫度、日期)來呈現過往紀錄。
8. 使用者可以點選左側欄上方的大頭照或者下方的設定圖示進入設定頁面。
9. 設定頁面預設顯示註冊時提供的資訊，另可以點選右上角圖示：
    - 新增大頭照
    - 新增生日
    - 新增發照日期
    - 新增發照地點
    - 更改登入密碼

---
### 畫面

- 個人潛水日誌首頁
![image](https://github.com/vdiefn/My-Adventure-Log/blob/main/1691306939790.jpg)
- 潛水日誌內容
![image](https://github.com/vdiefn/My-Adventure-Log/blob/main/1691307157052.jpg)
- 個人資料顯示方式
![image](https://github.com/vdiefn/My-Adventure-Log/blob/main/1691307928777.jpg)

---
### 安裝流程
1. 開啟終端機將專案存至本機
2. 使用終端機指令，進入存放此專案的資料夾
```js
cd my-adventure-log
```
3. 安裝npm套件
```js
npm install
```
4. 安裝完成後接續安裝Express, Express-handlebars......等
5. 新增.env檔案設定環境變數，可於.env.example內看到更多環境變數的設定。
6. 執行npm腳本指令，啟動伺服器
  ```js
  npm run dev
  ```
7. 成功啟動後會於終端機看到：Express is running on http://localhost:3000 以及 mongodb connected!
10. 於瀏覽器輸入http://localhost:3000 後可開始使用

---
### 開發工具
- Node.js
- Bootstrap
- Express
- Express-handlebars
- connect-flash
- dayjs
- mongoose
- multer
- passport

---
### 聯絡作者
若對此專案有任何問題或建議都歡迎提交 Issue 或者 Pull Request來進行交流
