<?php
   header("Content-type: text/html; charset=UTF-8");
   $username = $_POST["username"];

   $password = $_POST["password"];
   $repassword = $_POST["repassword"];
   $tel = $_POST["tel"];
   $coon = new mysqli('localhost', 'root','','person_info',3306); 
   $insert_sql = "INSERT INTO person_info (username, password,repassword, tel) VALUES ('$username', '$password','$repassword', '$tel' )";

   $coon->query("SET CHARACTER SET 'utf8'");//读库
   $coon->query("SET NAMES 'utf8'");//写库 
   $row = $coon -> query($insert_sql);
   
   if($row){
   	  echo  "<script>";
   	  echo 	"alert('注册成功')";
   	 echo  "</script>";
   }
       else{
       	 echo  "<script> alert('注册失败') </script>";
       	
       }

   var_dump($row);

?>                               