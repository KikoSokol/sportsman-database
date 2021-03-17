<?php

require_once "repository/Repository.php";
require_once "model/Osoba.php";
require_once "model/Vysledok.php";

header('Content-type: application/json');

$repository = new Repository();


$operation = "";

if(isset($_GET["operation"]))
    $operation = $_GET["operation"];

switch ($operation)
{
    case "goldPerson":
        echo json_encode($repository->getMainTable());
        break;
    case "goldPersonSortBySurname":
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        echo json_encode($repository->getMainTableSortBySurname($data->sort));
        break;
    case "goldPersonSortByType":
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        echo json_encode($repository->getMainTableSortByType($data->sort));
        break;
    case "goldPersonSortByYear":
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        echo json_encode($repository->getMainTableSortByYear($data->sort));
        break;
    case "goldPersonSortTypeAndYear":
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        echo json_encode($repository->getMainTableSortByTypeAndYear($data->sortType,$data->sortYear));
        break;
    case "bestPerson":
        echo json_encode($repository->getBestPerson());
        break;
    case "getPersonDetail":
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $personId = $data->id;
        echo json_encode($repository->getPersonById($personId));
        break;
    case "updatePerson":
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $result = $repository->updatePerson($data);
        echo json_encode($result);
        break;
    case "insertPerson":
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $result = $repository->addPerson($data);
        echo json_encode($result);
        break;
    case "deletePerson":
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $personId = $data->id;
        $result = $repository->deletePersonById($personId);
        echo json_encode($result);
        break;
    case "placingOfPerson":
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $personId = $data->id;
        echo json_encode($repository->getPlacingOfPerson($personId));
        break;
    case "getAllPerson":
        echo json_encode($repository->getAllPersons());
        break;
    case "getAllOh":
        echo json_encode($repository->getAllOh());
        break;
    case "insertPlacing":
        $json = file_get_contents('php://input');
        $data = json_decode($json);
        $result = $repository->addPlacing($data);
        echo json_encode($result);
        break;




}




