<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
    exit;
}  
    $db = new mysqli("8.129.34.59","sql_8_129_34_59","pangxixiha","sql_8_129_34_59");
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

  $data = array();

    $query = "
    select * from student
    ";
    $result = $db->query($query);
    while($row = $result->fetch_assoc()) {
    $count=count($row);//不能在循环语句中，由于每次删除row数组长度都减小
    for($i=0;$i<$count;$i++){
        unset($row[$i]);//删除冗余数据
    }
    array_push($data,$row);
 
}
//print_r($arr);
echo json_encode($data,JSON_UNESCAPED_UNICODE);//json编码
$db->close();

   
 
  
    ?>