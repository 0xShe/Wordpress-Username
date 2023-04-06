/*
* @Author: 98sucai.com
* @Date:   2020-05-01 23:27:56
* @Last Modified by:   98sucai
* @Last Modified time: 2020-05-09 22:17:49
*/

layui.use(['form','layer','element','util','carousel'], function(){
    var form = layui.form
    ,layer = layui.layer
    ,carousel = layui.carousel
    ,element = layui.element
    ,util = layui.util;

    util.fixbar();

    //图片轮播
    carousel.render({
      elem: '#hd'
      ,width: '630px'
      ,height: '205px'
      ,interval: 5000
    });

     //首页tab切换
    element.tab({
        headerElem: '#hot_tabs ul>li'
        ,bodyElem: '#hot_content>div'
    });


    element.on('tab(layui-tab)', function(){
        $(window).trigger('scroll');
    });

    form.on('submit(user-btn)', function(data){     
        var url = data.elem.form.action;
        $.post(url,data.field,function(res){
            if(res.code==1){
                layer.msg(res.msg,{icon:6,time:2000},function(){
                    window.location.href=res.url
                });
            }else{
                layer.msg(res.msg,{icon:5,time:2000});return false;                
            }
        },'json');
        return false;
    });

    $(function(){
        $("img.lazy").lazyload({effect:"fadeIn",threshold:180});
    });

    $('.signin').on('click',function(){
        $.post("/user-signin.html",function(res){
            if(res.code == 0){
                showWindowBox();return false;
            }else{
                if(res.code==1){
                    var str = window.location.href;
                    if(str.indexOf("sign") != -1){
                        layer.msg(res.msg,{icon:6,time:2000},function(){
                            window.location.reload();
                        });return false;
                    }else{
                        layer.msg(res.msg,{icon:6,time:2000});return false;
                    }
                }else{
                    layer.msg(res.msg,{icon:5,time:2000});return false;                
                }
            }       
        })
    });

    //加入收藏
    $('.show-btn').on('click',function(){   
        var url = $(this).attr('for');
        $.post(url,function(res){
            if(res!=0){
                layer.msg(res.msg,{icon:6,time:2000});
                return false;
            }else{
                showWindowBox();return false;               
            }
        },'json');
    });

    $('.is-del').on('click',function(){ 
        var url = $(this).attr('for');      
        layer.confirm('确定删除这条记录？',{icon:3,title:false,closeBtn:0}, function(){
            $.post(url,function(res){
                if(res.code==1){
                    layer.msg(res.msg,{icon:6,time:2000},function(){
                        window.location.reload();
                    });                    
                }else{
                    layer.msg(res.msg,{icon:5,time:2000});return false;                
                }
            },'json');
        });
    }); 

    form.on('submit(pay-btn)', function(data){      
        if (data.field.money >= 10) {
            $("#form_pay").submit();
        } else {
            layer.msg("最低充值10元！",{icon:5,time:2000});
            return false;
        }
        return false;
    });

   

    $(".user-pay ul li.custom").on('click',function(){
        var pay_money = 60;
        $('.pay-input').show(5,function(){
            $("#money").val(pay_money).attr('type','number');
            $(".money").find('ins').html(180);
            $("#money_text").find('cite').html(pay_money);
            $('input[name=type]').val(1);
        });  

        $("#money").bind('input propertychange',function(){
            var int_money = $(this).val();
            if(int_money < 0){
                $(this).val('0');
                int_money = 0;
            }
            if(int_money >= 100){
                score = int_money * 5;
            }else if(int_money >= 60){
                score = int_money * 3;
            }else if(int_money >= 30){
                score = int_money * 2.5;
            }else{
                score = int_money;
            }
            $('input[name=type]').val(1);
            $(".money").find('ins').html(Math.floor(score));
            $("#money_text").find('cite').html(Math.ceil(int_money));
        });
    })

    $(".user-pay ul li").on('click',function(){
        $('#money_text span').show();
        $(this).addClass('on').siblings().removeClass('on');
        var money = $(this).find('cite').html();
        switch(money){
            case '30':
                $('.pay-input').hide();
                var score = 30 * bei * 2.5;
                break;            
            case '60':
                $('.pay-input').hide();
                var score = 60 * bei * 3;
                break;
            case '100':
                $('.pay-input').hide();
                var score = 100 * bei * 5;
                break;
            default:
                $('.pay-input').show();
                var score = 60 * bei * 3;
                money = 60;
                break;
        }
        $('input[name=type]').val(1);
        $(".money").find('ins').html(Math.floor(score));
        $("#money").val(Math.ceil(money));
        $("#money_text").find('cite').html(Math.ceil(money));
    });

     $("#vip").on('click',function(){
        $('.pay-input').hide();
        $('#money_text span').hide();
        $('input[name=type]').val(2);
        $(".money").find('ins').html(0);
        $("#money_text").find('cite').html(vip);
        $("#money").val(vip);
    });

    form.on('submit(oauth-btn)', function(data){        
        var url = data.form.action;
        $.post(url,data.field,function(res){
            if (res.error != '') {
                layer.msg(res.error,{icon:5,time:2000});return false;
            } else {
                layer.msg(res.tip,{icon:6,time:2000},function(){
                    window.location.href=res.url
                });
            }
        },'json');
        return false;
    });

    $(".login-box").on('click',function(){
        showWindowBox();
    });

    $(".comment-btn").on('click',function(){
        var comment_text = $(".comment-text").val();
        if (!comment_text) {
            layer.msg("请输入评论内容",{icon:5,time:2000});
            return false;
        }
        var aid = $(".comment-text").attr('data-aid');
        var cid = $(".comment-text").attr('data-cid');
        $.post('/ajax-comment.html',{content:comment_text,aid:aid,cid:cid},function(res){
            if (res == 0) {
                layer.msg('请重试',{icon:5,time:2000});return false;
            } else if (res == -1) {
                showWindowBox();
            } else {
                $.post('/ajax-commentid-'+res+'.html',function(data){
                    $(".comment-text").val('');
                    $('#comment-show ul').prepend(reply(data));
                });
            }
        },'json');
        return false;
    });

    // 提示页面底部波浪
    var marqueeScroll = function (id1, id2, id3, timer) {
        var $parent = $("#" + id1);
        var $goal = $("#" + id2);
        var $closegoal = $("#" + id3);
        $closegoal.html($goal.html());
        function Marquee() {
            if (parseInt($parent.scrollLeft()) - $closegoal.width() >= 0) {
                $parent.scrollLeft(parseInt($parent.scrollLeft()) - $goal.width());
            } else {
                $parent.scrollLeft($parent.scrollLeft() + 1);
            }
        }
        setInterval(Marquee, timer);
    }
    var marqueeScroll1 = new marqueeScroll("marquee-box", "wave-list-box1", "wave-list-box2", 20);
    var marqueeScroll2 = new marqueeScroll("marquee-box3", "wave-list-box4", "wave-list-box5", 40);
});

function reply(data){
    var comment_html;
    comment_html  = '<li>';
    comment_html += '<div class="head-face">';
    comment_html += '<img src="'+ data.user_avatar +'" />';
    comment_html += '</div>';
    comment_html += '<div class="reply-cont">';
    comment_html += '<div class="username">'+ data.user_nickname +' / <span>[ '+ data.user_ip +' ]</span></div>';
    comment_html += '<div class="comment-body">'+ data.content +'</div>';
    comment_html += '<div class="comment-footer">'+ data.add_time +'</div>';
    comment_html += '</div>';
    comment_html += '</li>';
    return comment_html;
}

//演示页面
if($("#previewNav").length){
    var iframeCon = $("#iframeCon"),previewNav = $("#previewNav"),item = $("span",previewNav);
    item.on("click",function(){
        var $this = $(this);
        iframeCon.width($this.data("width"));
        item.removeClass("active");
        $this.addClass("active");
    });
}

//登录浮窗
function showWindowBox(){
    layer.open({
        type: 1, //加上边框
        title: false,
        skin: 'layui-layer-molv',
        area: ['440px', '280px'], //宽高
        content: '<div class="layui-login-window">'+
        '<a href="/login-qq.html"><i class="icon-qq"></i><p>腾讯QQ登录</p></a>'+
        '<a href="/login-weibo.html"><i class="icon-weibo"></i><p>新浪微博登录</p></a>'+
        '</div>'
    });
}

function shake(ele,cls,times){
    var i = 0, t = false, o = ele.attr("class")+" ", c = "", times = times||2;
    if(t) return;
    t= setInterval(function(){
        i++;
        c = i%2 ? o+cls : o;
        ele.attr("class",c);
        if(i==2*times){
            clearInterval(t);
            ele.removeClass(cls);
        }
    },200);
};

function searchSub(){
    var keywords=$("#search_input").val();
    if(keywords==''){
        shake($('#search_input'),"tips",3);
        return false;
    }
    $("input[name=keyword]").val(keywords);
    $("#form_search").submit();
}

function downloadZip(id){
    $.ajaxSetup({async:false});
    $.post("/ajax-download.html",{id:id,at:0},function(data){
        // console.log(data);return false;
        if(data=='0'){
            layer.msg("文件不存在！",{icon:5,time:2000});
        }else if(data=='-1'){
            showWindowBox();            
        }else if(data=='-3'){
            layer.msg("用户被锁定！",{icon:5,time:2000});
        }else if(data=='50'){
            layer.msg("今日下载已达上限，明日再来！",{icon:5,time:2000});
        }else{
             if(data=='-2'){
                layer.msg("积分不足，即将前往积分获取页面……",{icon:5,time:2000,shade:.2,anim:5},function(){
                    window.open('/user-pay.html');
                });                
            }else{
                window.open(data);
            }
        }
    })
}