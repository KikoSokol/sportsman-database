<?php
require_once "Database.php";
require_once "model/MainTable.php";
require_once "model/Osoba.php";
require_once "model/UmiestnenieInf.php";
require_once "model/Oh.php";

class Repository
{
    private $conn;

    /**
     * Repository constructor.
     * @param $conn
     */
    public function __construct()
    {
        $database = new Database();
        $this->conn = $database->getConn();
    }


    public function getMainTable()
    {
        $poz = 1;
        $stmt = $this->conn->prepare("SELECT osoby.id as id, osoby.name as meno, osoby.surname AS priezvisko, oh.year as rok, oh.city as mesto, oh.type as typ, umiestnenia.discipline as disciplina  from osoby INNER JOIN umiestnenia ON umiestnenia.person_id = osoby.id INNER JOIN oh ON umiestnenia.oh_id = oh.id where umiestnenia.placing = :pozicia;");
        $stmt->bindParam("pozicia",$poz,PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS,"MainTable");
    }

    public function getBestPerson()
    {
        $stmt = $this->conn->prepare("SELECT osoby.* FROM umiestnenia INNER JOIN osoby ON osoby.id = umiestnenia.person_id WHERE umiestnenia.placing = 1 GROUP BY umiestnenia.person_id ORDER BY COUNT(umiestnenia.placing) DESC LIMIT 10;");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS,"Osoba");
    }

    public function getAllPersons()
    {
        $stmt = $this->conn->prepare("SELECT osoby.* FROM osoby");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS,"Osoba");
    }

    public function getPlacingOfPerson($id)
    {
        $stmt = $this->conn->prepare("SELECT umiestnenia.placing as miesto, umiestnenia.discipline as disciplina, oh.year as rok, oh.type as typ ,oh.city as mesto, oh.country as krajina, oh.order as poradie FROM umiestnenia INNER JOIN oh ON umiestnenia.oh_id = oh.id WHERE umiestnenia.person_id =:id;");
        $stmt->bindParam("id",$id,PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS,"UmiestnenieInf");
    }

    public function getPersonById($id)
    {
        $stmt = $this->conn->prepare("SELECT * FROM osoby WHERE osoby.id =". $id);
        $stmt->execute();
        $osoba = $stmt->fetchObject("Osoba");

        return  $osoba;
    }

    public function addPerson($person)
    {
        try{
            $sql = "INSERT INTO `osoby` (`name`, `surname`, `birth_day`, `birth_place`, `birth_country`, `death_day`, `death_place`, `death_country`) VALUES (:namePerson,:surname,:birth_day,:birth_place,:birth_country,:death_day,:death_place,:death_country)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam("namePerson",$person->name,PDO::PARAM_STR);
            $stmt->bindParam("surname",$person->surname,PDO::PARAM_STR);
            $stmt->bindParam("birth_day",$person->birth_day,PDO::PARAM_STR);
            $stmt->bindParam("birth_place",$person->birth_place,PDO::PARAM_STR);
            $stmt->bindParam("birth_country",$person->birth_country,PDO::PARAM_STR);
            $stmt->bindParam("death_day",$person->death_day,PDO::PARAM_STR);
            $stmt->bindParam("death_place",$person->death_place,PDO::PARAM_STR);
            $stmt->bindParam("death_country",$person->death_country,PDO::PARAM_STR);
            $stmt->execute();
            return true;
        }
        catch (PDOException $e)
        {
//            echo $sql . "<br>" . $e->getMessage();
            return false;
        }
    }

    public function updatePerson($person)
    {
        try{
            $sql = "UPDATE `osoby` SET `name`=:namePerson,`surname`=:surname,`birth_day`=:birth_day,`birth_place`=:birth_place,`birth_country`=:birth_country,`death_day`=:death_day,`death_place`=:death_place,`death_country`=:death_country WHERE osoby.id =:id;";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam("namePerson",$person->name,PDO::PARAM_STR);
            $stmt->bindParam("surname",$person->surname,PDO::PARAM_STR);
            $stmt->bindParam("birth_day",$person->birth_day,PDO::PARAM_STR);
            $stmt->bindParam("birth_place",$person->birth_place,PDO::PARAM_STR);
            $stmt->bindParam("birth_country",$person->birth_country,PDO::PARAM_STR);
            $stmt->bindParam("death_day",$person->death_day,PDO::PARAM_STR);
            $stmt->bindParam("death_place",$person->death_place,PDO::PARAM_STR);
            $stmt->bindParam("death_country",$person->death_country,PDO::PARAM_STR);
            $stmt->bindParam("id",$person->id,PDO::PARAM_INT);
            $stmt->execute();
            return true;
        }
        catch (PDOException $e)
        {
//            echo $sql . "<br>" . $e->getMessage();
            return false;
        }
    }

    public function deletePersonById($personId)
    {
        try {
            $sql = "DELETE FROM `osoby` WHERE osoby.id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam("id",$personId,PDO::PARAM_INT);
            $stmt->execute();
            return true;
        }
        catch (PDOException $e)
        {
//            echo $sql . "<br>" . $e->getMessage();
            return false;
        }

    }

    public function getAllOh()
    {
        $stmt = $this->conn->prepare("SELECT oh.* FROM oh");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_CLASS,"Oh");
    }

    public function addPlacing($placing)
    {

        try{
            $sql = "INSERT INTO `umiestnenia`(`person_id`, `oh_id`, `placing`, `discipline`) VALUES (:personId,:ohId,:placing,:discipline)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam("personId",$placing->personId,PDO::PARAM_INT);
            $stmt->bindParam("ohId", $placing->ohId,PDO::PARAM_INT);
            $stmt->bindParam("placing",$placing->placing,PDO::PARAM_INT);
            $stmt->bindParam("discipline",$placing->discipline,PDO::PARAM_STR);
            $stmt->execute();
            return true;
        }
        catch (PDOException $e)
        {
//            echo $sql . "<br>" . $e->getMessage();
            return false;
        }
    }



}