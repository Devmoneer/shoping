<?php
header('Content-Type: application/json');

// Get the posted data
$data = json_decode(file_get_contents('php://input'), true);

// Validate data
if (empty($data['name']) || empty($data['brand']) || empty($data['price'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}


$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO laptops (name, brand, price, description, specs, image_url, added_by) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssdssss", 
    $data['name'],
    $data['brand'],
    $data['price'],
    $data['description'],
    $data['specs'],
    $data['imageUrl'],
    $data['addedBy']
);

// Execute and respond
if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Laptop added successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>

<script>
// Example: Get all laptops from PHP API
fetch('../api/getLaptops.php')
  .then(response => response.json())
  .then(laptops => {
    // Use the laptops data to update your HTML
    console.log(laptops);
    // Example: displayLaptops(laptops);
  });

// Example: Add a new laptop
fetch('../api/addLaptop.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Laptop Name',
    brand: 'Brand',
    price: 999.99,
    description: 'Description',
    specs: 'Specs',
    imageUrl: 'base64_or_url',
    addedBy: 'user@email.com'
  })
})
.then(response => response.json())
.then(result => {
  if (result.success) {
    // Refresh the list or show success
  }
});
</script>