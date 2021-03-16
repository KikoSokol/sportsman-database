<?php


class Osoba
{
    public int $id;
    public string $name;
    public string $surname;
    public string $birth_day;
    public string $birth_place;
    public string $birth_country;
    public ?string $death_day;
    public ?string $death_place;
    public ?string $death_country;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getSurname()
    {
        return $this->surname;
    }

    /**
     * @param mixed $surname
     */
    public function setSurname($surname)
    {
        $this->surname = $surname;
    }

    /**
     * @return mixed
     */
    public function getBirthDay()
    {
        return $this->birth_day;
    }

    /**
     * @param mixed $birth_day
     */
    public function setBirthDay($birth_day)
    {
        $this->birth_day = $birth_day;
    }

    /**
     * @return mixed
     */
    public function getBirthPlace()
    {
        return $this->birth_place;
    }

    /**
     * @param mixed $birth_place
     */
    public function setBirthPlace($birth_place)
    {
        $this->birth_place = $birth_place;
    }

    /**
     * @return mixed
     */
    public function getBirthCountry()
    {
        return $this->birth_country;
    }

    /**
     * @param mixed $birth_country
     */
    public function setBirthCountry($birth_country)
    {
        $this->birth_country = $birth_country;
    }

    /**
     * @return mixed
     */
    public function getDeathDay()
    {
        return $this->death_day;
    }

    /**
     * @param mixed $death_day
     */
    public function setDeathDay($death_day)
    {
        $this->death_day = $death_day;
    }

    /**
     * @return mixed
     */
    public function getDeathPlace()
    {
        return $this->death_place;
    }

    /**
     * @param mixed $death_place
     */
    public function setDeathPlace($death_place)
    {
        $this->death_place = $death_place;
    }

    /**
     * @return mixed
     */
    public function getDeathCountry()
    {
        return $this->death_country;
    }

    /**
     * @param mixed $death_country
     */
    public function setDeathCountry($death_country)
    {
        $this->death_country = $death_country;
    }










}