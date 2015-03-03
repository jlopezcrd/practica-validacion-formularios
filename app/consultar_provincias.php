<?php
header("Access-Control-Allow-Origin: *");

@$userv = new mysqli("localhost", "jorgelopez_usr", "validacion", "jorgelopez_validacion");
$errorbd = $userv -> connect_errno;
if ($errorbd==null) {
    $userv->set_charset("utf8");
    $sql = "SELECT id_provincia, provincia FROM provincias";
    $resultado = $userv->query($sql);
    $datos="<option value='0'>Elige provincia...</option>";
    while ($row = $resultado->fetch_assoc()) {
        $datos .="<option value='".$row['id_provincia']."'>".$row['provincia']."</option>";
    }
}
else {     // si la conexión da error
    print "Imposible conectar con la bbdd de provincias";
}
$userv->close();
echo $datos;
unset($userv);
?>