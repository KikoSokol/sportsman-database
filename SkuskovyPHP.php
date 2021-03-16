<?php

require_once "Database.php";

$database = new Database();
$conn = $database->getConn();

$stmt = $conn->prepare("SELECT * FROM osoby");

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);
