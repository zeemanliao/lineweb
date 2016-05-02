
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
        },
        getHeight: function(id) {
          if (id) {
            var obj = document.getElementById(id);
            if (obj) {
              return Math.max(
                document.getElementById(id).scrollHeight,
                document.getElementById(id).offsetHeight
                );
            } else{
              return 0
            }
          }
          var body = document.body,
              html = document.documentElement;

          return Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
        },
        getBodyHeight: function() {
          return this.getHeight() - this.getHeight('navbar') - this.getHeight('footer');
        }
    };
});