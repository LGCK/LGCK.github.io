/**
 * Created by mac on 16/9/13.
 */
(function () {
    //点击加载数据
    var btn=document.querySelector('#btn-more');
    var loadText='正在加载...';
    //主页左边的数据
    var temp1=document.getElementById('template1').innerHTML;
    var news_list=document.getElementById('news-list');
    //主页右边的短趣
    var temp2=document.getElementById('template2').innerHTML;
    var duanqu_content=document.getElementById('duanqu-content');
    //主页右边的创业
    var temp3=document.getElementById('template3').innerHTML;
    var chuangye_content=document.getElementById('chuangye-content');
    //主页右边的赞助
    var temp4=document.getElementById('template4').innerHTML;
    var zanzhu_content=document.getElementById('zanzhu-content');
    //主页右边的热文
    var temp5=document.getElementById('template5').innerHTML;
    var rewen_content=document.getElementById('rewen-content');
    //点击加载更多;
getData();
    btn.onclick=function () {
        if(this.innerText==loadText)
            return;
        getData();
    }
    //点击短趣颜色变为白色
    duanqu_content.addEventListener('click',function (e) {
        var e=e||event;
        if(e.target.tagName=='A'){
            var parent=e.target.parentNode.parentNode.parentNode;
            for(var i=0;i<this.children.length;i++){
                if(parent!=this.children[i])
                    this.children[i].classList.remove('open');
            }
            parent.classList.toggle('open');
        }
    })


    function getData() {
        var text=btn.innerText;
        btn.innerText=loadText;
        var xml=new XMLHttpRequest();
        xml.open('get','/getmain');
        xml.responseType='json';
        xml.send();
        xml.onreadystatechange=function () {
            if(xml.readyState==4&&xml.status==200)
            {
                var data=xml.response;
                var data1=data.leftdata;
                var data2=data.duanqu;
                var data3=data.chuangye;
                var data4=data.zanzhu;
                var data5=data.rewen;

                doResult(data1,news_list,temp1,function () {
                    console.log('a');
                    btn.innerText=text;

                });
                doResult(data2,duanqu_content,temp2);
                doResult(data3,chuangye_content,temp3);
                doResult(data4,zanzhu_content,temp4);
                doResult(data5,rewen_content,temp5);

            }
        };
    }

    function doResult(data,ele,temp,fn){
        var html='';
        data.forEach(function (item) {
            var str=render(temp,item);
            var value=item.type?'big-media':'';
            html+=str.replace(/\{typeclass\}/,value);
        });
        //判断一下 如果是元素是news-list 那么就再加载一次所有news_list中的数据
        if(ele==news_list)
        {
            setTimeout(function () {
                news_list.innerHTML+=html;
                typeof fn=='function'&&fn();
            },1000)


        }
        ele.innerHTML=html;

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
    //滚动的时候 到一定位置的时候让 li显示
    window.onscroll=function () {
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollTop>window.innerHeight)
        {
            // document.getElementsByClassName('')
            $('#scroll').css('display','block')

        }
        else {
            $('#scroll').css('display','none')

        }

    }

})()

//点击返回顶部
document.getElementById('scroll').onclick=function() {
    clearInterval(timer);
    var  target=0;
    var timer=setInterval(function(){
        var top=getTop();
        if(top<=target)
        {
            clearInterval(timer);
        }
        else{
            setTop(Math.floor(top-top/30));
        }
    },10)
}
function getTop(){
    return document.body.scrollTop||document.documentElement.scrollTop;
}
function setTop(top){
    document.body.scrollTop=document.documentElement.scrollTop=top;
}