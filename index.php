<html lang="zh-CN"><head><meta charset="utf-8">
	<title>Wordpress管理员用户名在线查询</title>
	
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="css/material-design-iconic-font.min.css">
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
</head>

<body>

	<div class="limiter">
		<div class="container-login100" style="background-image: url('img/bg-01.jpeg');">
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
				<form class="login100-form validate-form">
					<span class="login100-form-title p-b-49">Wordpress管理员用户名在线查询</span>

					


	<form action="" method="post">
    <select class="test" name="geth">
        <option value="http://" >http://</option>
          <option value="https://">https://</option>
     </select>
    <input type="text" class="test1" name="url">
    <input type="submit" class="login100-form-btn" value="查询">
</form>
<div class="test2">
<?php
header("Content-type: text/html; charset=utf-8");
  $geth = $_REQUEST['geth'];
   $url = $_REQUEST['url'];
     $curl  =  curl_init ( ) ;
    
     curl_setopt ( $curl , CURLOPT_URL ,  $geth.$url.'/wp-json/wp/v2/users/?per_page=100&page=1' ) ;

     curl_setopt ( $curl , CURLOPT_RETURNTRANSFER ,  1 ) ;
     //执行命令
     $data  =  curl_exec ( $curl ) ;
     //$d = json_decode( str($data) , true);
     curl_close ( $curl ) ;
    //echo $data;
    $data = json_decode($data,TRUE);
    //var_dump($data);

    for($i=0;$i<$data[0]['id'];$i++){
		echo "用户名：";
     echo $data[$i]['slug']."<br/>";

     //判断
    
}
   
  
?>
					</div>


				</form>
			</div>
		</div>
	</div>

	<script src="js/jquery-3.2.1.min.js"></script>
	<script src="js/main.js"></script>


</body></html>

