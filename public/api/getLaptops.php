<?php
header('Content-Type: application/json');

// Database configuration
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

$sql = "SELECT * FROM laptops ORDER BY id DESC";
$result = $conn->query($sql);

$laptops = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $laptops[] = $row;
    }
}

echo json_encode($laptops);
$conn->close();
?>