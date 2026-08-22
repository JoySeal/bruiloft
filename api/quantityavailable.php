<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$host = "localhost";
$user = "deb118539_jjadmin";
$password = "5jguhidsf8340329nnk";
$database = "deb118539_bruiloft";
$port = 3306;

$mysqli = new mysqli($host, $user, $password, $database, $port);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$gift = $_GET['gift'];
error_log("Received gift parameter: $gift");
$sqlSelectQuantity = 'SELECT quantityavailable FROM reservation WHERE gift = ? ORDER BY id DESC LIMIT 1';
error_log("Executing SQL query: $sqlSelectQuantity with gift = $gift");

$stmt = $mysqli->prepare($sqlSelectQuantity);
$stmt->bind_param('s', $gift);
$stmt->execute();

if ($stmt->errno) {
    echo json_encode(['error' => 'Error during query execution: ' . $stmt->error]);
    exit();
}

$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($currentQuantityAvailable);
    $stmt->fetch();
    echo json_encode(['quantityAvailable' => $currentQuantityAvailable]);
} else {
    echo json_encode(['error' => 'No rows found or error occurred', 'sql' => $sqlSelectQuantity]);
}

$stmt->close();
$mysqli->close();
?>


