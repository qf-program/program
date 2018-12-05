<?php
	
	include("../public.php");
	
	$uname = $_POST["uname"];
	$upwd = $_POST["upwd"];
	
	$db = getConnect("phonesys");
	
	$sql = "insert into phone (uname,upwd) values ('$uname','$upwd')";
	
	$row = mysqli_query($db,$sql);
	
	if($row){
		//注册成功，跳转到登录页
		echo "<script>alert('注册成功！');location.href='../login/login.html';</script>";
	}else{
		echo "<script>alert('注册失败！请重新注册！');location.href='register.html';</script>";
	}
?>
