# lineNET website
###RWD(Bootstrap)
###WebSocket(Socket.io)
###HTML(EJS)
###JavaScript(requirejs、jQuery)
###Node.js(Express4)
###Web Server(Nginx)
###noSQL(MongoDB)


##目錄架構說明
###<font color=blue>views目錄</font>
此為原Express4提供架構，選擇使用EJS模型開發
所有的html靜態內容都放在此處
####pages子目錄
各功能首頁存放位置
router慣性在此取得html頁面內容
參考/routes/index.js
####partials子目錄
相關共用版型及子分頁內容放置處
####status子目錄
存放html回應狀態顯示畫面
###<font color=blue>routes目錄</font>
此為原Express4提供架構，存放所有route設定
####API字目錄
所有REST API route存放處
此目錄的檔案會自動載入到/API/檔案名稱的接口中
###<font color=blue>public目錄</font>
####assest子目錄
存放共用第三方前端函式庫及相關檔案
####dist子目錄
存放共用自訂產出的共用相關資料
####javascripts子目錄
此為原Express4提供架構，存放前端javascript檔
####stylesheets子目錄
此為原Express4提供架構，存放各頁客製css檔
###<font color=blue>lib目錄</font>
相關函示庫
####models\obj子目錄
類別庫(未來會再進行調整)
此目錄的資料，會依檔名自動載入app.Model中
####storage\obj子目錄
資料物件
此目錄的資料，會依檔名並以mongoose.Schema的型態自動載入app.Storage中

config.json內容請依自行建立調整設定
因資料內容隱密，所以需自行保存，不要對外公開
```json
{
        "lang":"zh-Hant-TW",
        "secret":"網站cookies secret碼",
        "site" :{
        "title": "網站名稱",
        "description": "網站說明"
    },
        "author": {
        "name": "作者名稱",
        "contact": "連絡資訊"
    },
    "db":{
        "mongodb": {
                "server":"db ip or domain",
                "user":"db user name",
                "pass":"db password",
                "db":"db name"
        }
    },
        "oauth":
        {
                "facebook":
                {
                        "id":"fb app id",
                        "secret":"fb app secret",
                        "callbackURL":"facebook callback url",
                        "testID":"測試環境登入facebook user id"
                },
                "google":
                {
                        "id":"google app id",
                    	"secret": "google app secret",
                    	"callbackURL": "google callback url",
                        "testID":"測試環境登入google user id"
                    },
                "github":
                {
                        "id":"github app id",
                        "secret":"github app secret",
                        "callbackURL":"github callback url",
                        "testID":"測試環境登入github user id"
                },
                "twitter":
                {
                        "id":"twitter app id",
                        "secret":"twitter app secret",
                        "callbackURL":"twitter callback url",
                        "testID":"測試環境登入twitter user id"
                }
        }
}


```