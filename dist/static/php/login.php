<?php
    $user = $_GET["username"];
    $pass = $_GET["password"];
    // 连接数据库与
    // sql语句， 用来查询
    $coon = new mysqli('localhost', 'root', '', 'person_info');
    $sql = "select * from person_info where username='$user' && password = '$pass'";
    // var_dump($sql);

    // 用户名称如果可以是中文,要设置字符集
    $coon -> query("SET NAMES 'utf8'");//写库 
    $result = $coon -> query($sql);
    // $row = 查询结果在执行fetch_assoc() , 返回第一条数据
    // var_dump($result);
    $row = $result -> fetch_assoc();
    // 如果查询到数据, 返回一个对象, 为关联数据
    // 查不到数据返回null
    if($row) {
        //  查到数据
        $arr = array("code" => "0", "data" => $row );
    } else {
        // 没有查询到
        $arr = array("code" => "-1", "msg" => "当前用户不存在");
    }
    echo json_encode($arr);

?>