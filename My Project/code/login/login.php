<?php
	include("../public.php");
	
	$uname = $_POST["uname"];
	$upwd = $_POST["upwd"];
	
	$db = getConnect("phonesys");
	
	$sql = "select * from phone where uname='$uname'";
	
	
	$result = mysqli_query($db,$sql);
	
	$row = mysqli_fetch_array($result);
	
	if($row){//用户名存在
		if($row["upwd"] == $upwd){//密码正确
			//登录成功，跳转到学生信息页
			echo "<script>alert('登录成功');location.href='../html/index.html?uname = $uname';</script>";
		}else{//密码有误
			//登录失败，跳转到登录页
			echo  "<script>alert('密码有误，请重新登录');location.href='login.html';</script>";//2表示密码有误
		}
		//}
	}else{//用户名不存在
		//登录失败，跳转到登录页
		echo  "<script>alert('用户名不存在，请重新登录');location.href='login.html';</script>";//0表示用户名不存在 
	}
	
	
	
?>