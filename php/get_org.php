<?php

$mysqli = new mysqli('127.0.0.1',"root","","test_zad");
if ($mysqli->connect_errno)
{printf("Connectfailed: %s\n", $conn->connect_error);
exit();}

$sql = "select * from Organization";

$result = $mysqli->query($sql);

$cur = "";
$i = 0;

while ($row = $result->fetch_row())
{
	$cur[$i]['ORG_ID'] = $row[0];
	$cur[$i]['ORGNAME'] = $row[1];
	$i++;
}

echo '{rows:'.json_encode($cur).'}';

$mysqli->close();
?>