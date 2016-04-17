/*
[
 { "CO": "1.94",
  "County": "新北市",
  "FPMI": "4",
  "MajorPollutant": "懸浮微粒",
  "NO": "81.6",
  "NO2": "24",
  "NOx": "105.34",
  "O3": "0",
  "PM10": "67",
  "PM2.5": "38",
  "PSI": "58",
  "PublishTime": "2016-04-16 23:00",
  "SiteName": "汐止",
  "SO2": "4.4",
  "Status": "普通",
  "WindDirec": "181",
  "WindSpeed": "0.6" }
]
測站名稱(SiteName)、縣市(County)、空氣污染指標(PSI)、指標污染物(MajorPollutant)、狀態(Status)、二氧化硫濃度(SO2)、一氧化碳濃度(CO)、臭氧濃度(O3)、懸浮微粒濃度(PM10)、細懸浮微粒濃度(PM2.5)、二氧化氮濃度(NO2)、風速(WindSpeed)、風向(WindDirec)、發布時間(PublishTime)
*/
var request = require("request");
var xml2js = require('xml2js')
var fs = require('fs');

    request({
        url: "http://opendata.epa.gov.tw/ws/Data/AQX/?format=json&ndctype=JSON&ndcnid=6074",
        method: "GET"
    }, function(err, r, b) { /* Callback 函式 */
        if (err)
            return console.log(err);
        var data = JSON.parse(b);
          console.log(data);
        
        
    });
function x() {

var cwb = require('./CWB.json');
console.log(JSON.stringify(cwb.cwbopendata.dataset));//);

request({
    url: "http://opendata.cwb.gov.tw/opendataapi?dataid=F-C0032-001&authorizationkey=CWB-4DC4DC31-5B7E-46BC-8718-D633D8D1A981",
    method: "GET"
}, function(err, r, data) { /* Callback 函式 */
    if (err)
        return console.log(err);

    var parser = new xml2js.Parser();
    /* e: 錯誤代碼 */
    /* b: 傳回的資料內容 */
    parser.parseString(data, function(err, result) {
        if (err)
            return console.log(err);
        fs.writeFile("CWB.json",JSON.stringify(result), function(err) {
            if (err) {
                return console.log(err);
            }
        });


    });
});
}