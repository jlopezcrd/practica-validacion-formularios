<?php
header('Access-Control-Allow-Origin: *');
/* check if email is already registered */

$mysqli = new mysqli("infenlaces.com", "jorgelopez_usr", "validacion", "jorgelopez_validacion");

if (!empty($_GET['nif']))
{
    $nif = $mysqli->real_escape_string($_GET['nif']);
    $query = "SELECT email FROM usuarios WHERE nif = '".$nif."' LIMIT 1;";
    $results = $mysqli->query($query);
    if($results->num_rows == 0)
    {
    echo "true";  //good to register
}
else
{
    echo "false"; //already registered
}
}
else
{
    echo "false"; //invalid post var
}

?>
