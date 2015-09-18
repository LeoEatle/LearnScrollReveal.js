$(document).ready(function() {


	// 隐藏左边联系人列表的按钮功能（已删除）
	//	$("#hide").mousedown(function()
	//	{
	//		$("#left_panel").toggle('slow', function()
	//			{
	//				alert("the div has been hiden");
	//			});
	//	});

	//实现左边联系人的变色
	var color1 = "#3A3F45";//浅灰色，用于选中联系人
	var color2 = "#2E3238";//深灰色, 初始值
	
	var contact_user = document.querySelectorAll(".contact_user");
	
	for (var i = 0;i<contact_user.length;i ++) 
	{
		contact_user[i].addEventListener("click", changeColor);//这里函数名不用加()！！！！！！
	}
	
	//选中联系人函数声明，改色，改消息记录
	function changeColor()
	{
		// alert(this);
		for (var i = 0 ; i < contact_user.length; i ++) { //初始化背景颜色
			contact_user[i].style.background = color2;
		}
		this.style.background = color1;
	}

	//发送信息函数
	function send_message()
	{
		var message = $("#input").val();
		var modol = $("#send").clone() ;
		modol.children('p').text(message);
		modol.children('img').val("img/webwxgeticon.jpg");
		$("#chat_record").append(modol);
		$('#input').val('');

		//让滚动条自动滚到底部
		$('#chat_record').scrollTop($('#chat_record')[0].scrollHeight);

	}
    //$(".btn").mousedown(send_message);用下面这个jquery语句代替后面好解绑
    $('.btn').bind('mousedown', send_message);
    
    //实现回车发送信息
    function enter_send (event)
    {
    	if(event.which == 13)
    	{
    		send_message();
    		//$('#input').val('');
    		//return false;
    	}
    }

	$(document).bind('keydown', enter_send(event));


	//怎么实现点联系人转换相应的聊天记录

	$(".contact_user").click(function() {
		/* Act on the event */
		var name = $(this).children('.user_name').text(); //获得联系人的名字
		$("#right_panel").find('#chat_name').text(name);  //改变右面板联系人名字


	});


	//确认窗口关闭退出
	window.onbeforeunload = onbeforeunload_handler;
	function onbeforeunload_handler()
	{
		var warning = "确认退出？";
		return warning;
	}

	//对于textarea里面字符的检查和删减
	function limit_textarea()
	{
		var max_value = 10;
		var value_num = $('#input').val().length;

		if (value_num > max_value) {
			$('#limitation').show('fast', function()
				{
					//限制输入信息为140个字符
					var short_message = $('#input').val().substring(0, max_value);
					$('#input').val(short_message);
					//给发送信息事件解绑
					$(document).off('keydown' , enter_send);
					$('.btn').off('mousedown', send_message);
					//return false;
				});
		};
		if (value_num <= max_value) {
			$('#limitation').hide('fast', function() 
				{
					//这里需要先用off解除绑定不然会重复绑定，导致事件执行多次
					$(document).off('keydown' , enter_send);
					$('.btn').off('mousedown' , send_message);
					$(document).bind('keydown' , enter_send);
					$('.btn').bind('mousedown' , send_message);
				});
		};
	}


	$('#input').bind('input propertychange' , function()
	{

		limit_textarea();
		
	});
	
});