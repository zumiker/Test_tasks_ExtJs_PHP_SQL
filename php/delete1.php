<?php

$mysqli = new mysqli('127.0.0.1',"root","","test_zad");
if ($mysqli->connect_errno)
{printf("Connectfailed: %s\n", $conn->connect_error);
exit();}

$manid = $_REQUEST['manid'];

$sql = "delete from contact where manid = '$manid'";
echo $sql;
$result = $mysqli->query($sql);

if($result)
	echo json_encode(array('success'=>true));
else
	echo json_encode(array('failure'=>false));

$mysqli->close();
?>