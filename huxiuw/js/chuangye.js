/**
 * Created by mac on 16/9/16.
 */
(function () {
    var has_more=document.querySelectorAll('.has-more');
    var click_block=document.querySelectorAll('.click-block');
    for(var i=0;i<has_more.length;i++){

        (function (index) {
            has_more[index].onclick=function (ev) {
                var ev=ev||event;
                if(click_block[index].style.display=='none')
                {
                    click_block[index].style.display='block';
                    console.log('a')
                }
                else{
                    click_block[index].style.display='none';
                }
                ev.stopPropagation();
                ev.preventDefault();
            }

        })(i)
    }


})()