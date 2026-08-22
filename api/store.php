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

error_reporting(E_ALL);
ini_set('display_errors', 1);

error_log("Received POST data: " . file_get_contents("php://input"));

$input_json = file_get_contents("php://input");
if ($input_json === false) {
    error_log("Error reading request body");
} else {
    $input_data = json_decode($input_json, true);
    if ($input_data === null) {
        error_log("Error decoding JSON: " . json_last_error_msg());
    } else {
        // Check if the required keys are present in the received JSON
        if (isset($input_data['username']) && isset($input_data['gift']) && isset($input_data['quantityReserved'])) {
            $username = $input_data['username'];
            $gift = $input_data['gift'];
            $quantityReserved = intval($input_data['quantityReserved']);
            
            // Query the current quantity available
            $sqlSelectQuantityAvailable = 'SELECT quantityavailable FROM reservation WHERE gift = ? ORDER BY id DESC LIMIT 1';
            $stmtSelectQuantityAvailable = $mysqli->prepare($sqlSelectQuantityAvailable);
            $stmtSelectQuantityAvailable->bind_param('s', $gift);
            $stmtSelectQuantityAvailable->execute();

            if ($stmtSelectQuantityAvailable->errno) {
                error_log("SQL Error in SELECT quantity available: " . $stmtSelectQuantityAvailable->error);
                echo json_encode(['error' => 'Error retrieving quantity available']);
                exit();
            }

            $stmtSelectQuantityAvailable->store_result();

            if ($stmtSelectQuantityAvailable->num_rows > 0) {
                $stmtSelectQuantityAvailable->bind_result($currentQuantityAvailable);
                $stmtSelectQuantityAvailable->fetch();

                // Calculate the new quantity available
                $newQuantityAvailable = $currentQuantityAvailable - $quantityReserved;

                // Insert a new record into the database
                $sqlInsert = 'INSERT INTO reservation (name, gift, reserved_at, quantity, quantityavailable) VALUES (?, ?, NOW(), ?, ?)';
                $stmtInsert = $mysqli->prepare($sqlInsert);
                $stmtInsert->bind_param('ssii', $username, $gift, $quantityReserved, $newQuantityAvailable);
                $stmtInsert->execute();

                if ($stmtInsert->errno) {
                    error_log("SQL Error in INSERT: " . $stmtInsert->error);
                    echo json_encode(['error' => 'Error inserting reservation']);
                } else {
                    echo json_encode(['message' => 'Reservation successful']);
                    error_log("Inserted new reservation for gift $gift with quantity reserved: $quantityReserved and quantity available: $newQuantityAvailable");
                }

                $stmtInsert->close();
            } else {
                // Log an error if no rows found
                error_log("No rows found for gift $gift or error occurred while retrieving quantity available");
                echo json_encode(['error' => 'No rows found or error occurred while retrieving quantity available']);
                exit();
            }

            $stmtSelectQuantityAvailable->close();
        } else {
            // Log an error if required keys are missing
            error_log("Error: Required keys are missing in the received JSON data.");
            echo json_encode(['error' => 'Required keys are missing in the received JSON data']);
        }
    }
}
?>


