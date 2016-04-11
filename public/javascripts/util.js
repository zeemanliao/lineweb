
define(function(){
    return {
        TimeToString: function(tstamp){
            var t =  new Date(tstamp);
            d = [
               t.getFullYear(),
               t.getMonth()+1,
               t.getDate(),
               t.getHours(),
               t.getMinutes(),
               t.getSeconds(),
            ];
            return d[0]+'/'+d[1]+'/'+d[2]+' '+d[3]+':'+d[4]+':'+d[5];
        }
    };
});