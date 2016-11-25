/**
 * Created by mac on 16/9/16.
 */

getData();
function getData() {
    var xhr=new XMLHttpRequest();
    xhr.open('get','/gethotdis');
    xhr.responseType='json';
    xhr.send();
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4&&xhr.status==200)
        {
            console.log(xhr.response);
            doResult(xhr.response);
        }
    }

}
var temp=document.getElementById('template').innerHTML;
function doResult(date) {
    var html='';
    date.forEach(function (item) {
        html+=render(temp,item);
    })
    document.getElementById('replace').innerHTML=html;
}
function render(temp,obj) {
    if(!obj)
        return temp;
    for(var p in obj){
        var reg=new RegExp('\{'+p+'\}','g');
        temp=temp.replace(reg,obj[p]);
    }
    return temp;
}