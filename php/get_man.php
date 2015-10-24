<?
$mysqli = new mysqli('127.0.0.1',"root","","test_zad");
if ($mysqli->connect_errno)
{printf("Connectfailed: %s\n", $conn->connect_error);
exit();}

$org_id = $_REQUEST['org_id'];

$sql = "select  c.manid,
                c.org_id, 
                c.name,
                c.phone,
                o.org_name
        from contact c, organization o
        where o.org_id = c.org_id
        and   c.org_id = '$org_id'";

$result = $mysqli->query($sql);

$cur = "";
$i = 0;

while ($row = $result->fetch_row())
{
    $cur[$i]['MANID'] = $row[0];
    $cur[$i]['ORG_ID'] = $row[1];
    $cur[$i]['NAME'] = $row[2];
    $cur[$i]['PHONE'] = $row[3];
    $cur[$i]['ORG_NAME'] = $row[4];
    $i++;
}

echo '{rows:'.json_encode($cur).'}';

$mysqli->close();
?>