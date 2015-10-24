<?php

$mysqli = new mysqli('127.0.0.1',"root","","test_zad");
if ($mysqli->connect_errno)
{printf("Connectfailed: %s\n", $conn->connect_error);
exit();}

$field = $_REQUEST['field'];
$org_id = $_REQUEST['org_id'];

//echo $org_id.$field ;

if($org_id == ""){
	$sql = "insert into organization (org_name) values('$field') ";
	//echo $sql;
}
else{
	$sql = "update organization set org_name = '$field' where org_id = '$org_id'";
	//echo $sql;
}
$result = $mysqli->query($sql);

if($result)
	echo json_encode(array('success'=>true));
else
	echo json_encode(array('failure'=>false));

$mysqli->close();
?>