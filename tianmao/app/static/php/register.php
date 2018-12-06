<?php
   header("Content-type: text/html; charset=UTF-8");
   $username = $_GET["username"];

   $password = $_GET["password"];
   $repassword = $_GET["repassword"];
   $tel = $_GET["tel"];
   $coon = new mysqli('localhost', 'root','','person_info',3306); 
   $insert_sql = "INSERT INTO person_info (username, password, tel) VALUES('$username', '$password', '$tel')";
   var_dump($insert_sql);
   $coon->query("SET CHARACTER SET 'utf8'");//读库
   $coon->query("SET NAMES 'utf8'");//写库 
   $row = $coon -> query($insert_sql);
   var_dump($row);
   var_dump( '$username');
   var_dump( '$tel');
   var_dump('$password');
   if($row){
   	  echo  "<script>";
   	  echo 	"alert('注册成功')";
   	 echo  "</script>";
   }
       else{
       	 echo  "<script> alert('注册失败') </script>";
       	
       }

  

?>                               