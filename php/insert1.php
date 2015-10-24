<?php

$mysqli = new mysqli('127.0.0.1',"root","","test_zad");
if ($mysqli->connect_errno)
{printf("Connectfailed: %s\n", $conn->connect_error);
exit();}

$fiofield = $_REQUEST['fiofield'];
$org_id = $_REQUEST['org_id'];
$phonefield = $_REQUEST['phonefield'];
$manid = $_REQUEST['manid'];

//echo $org_id.$field ;

if($manid == ""){
	$sql = "insert into contact (org_id, name, phone) 
			values('$org_id','$fiofield', '$phonefield') ";
	//echo $sql;
}
else{
	$sql = "update contact set org_id = '$org_id',
								name = '$fiofield',
								phone = '$phonefield'
								 where manid = '$manid'";
	echo $sql;
}
$result = $mysqli->query($sql);

if($result)
	echo json_encode(array('success'=>true));
else
	echo json_encode(array('failure'=>false));

$mysqli->close();
?>