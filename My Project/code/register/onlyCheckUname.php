<?php
	include("../public.php");
	
	$uname = $_GET["uname"];
	
	$db = getConnect("phonesys");
	
	$sql = "select * from phone where uname='$uname'";
	//返回一个结果集(对象)；
	$result = mysqli_query($db,$sql);
	//循环对象；
	$row = mysqli_fetch_array($result);
	
	if($row){
		//1表示数据库有这个数据
		echo 1;
	}else{
		//0表示数据不存在
		echo 0;
	}
	
?>