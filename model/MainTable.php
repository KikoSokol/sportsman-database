<?php


class MainTable
{
    public int $id;
    public string $meno;
    public string $priezvisko;
    public string $rok;
    public string $mesto;
    public string $typ;
    public string $disciplina;

    /**
     * @return mixed
     */
    public function getMeno()
    {
        return $this->meno;
    }

    /**
     * @param mixed $meno
     */
    public function setMeno($meno)
    {
        $this->meno = $meno;
    }

    /**
     * @return mixed
     */
    public function getRok()
    {
        return $this->rok;
    }

    /**
     * @param mixed $rok
     */
    public function setRok($rok)
    {
        $this->rok = $rok;
    }

    /**
     * @return mixed
     */
    public function getMesto()
    {
        return $this->mesto;
    }

    /**
     * @param mixed $mesto
     */
    public function setMesto($mesto)
    {
        $this->mesto = $mesto;
    }

    /**
     * @return mixed
     */
    public function getTyp()
    {
        return $this->typ;
    }

    /**
     * @param mixed $typ
     */
    public function setTyp($typ)
    {
        $this->typ = $typ;
    }

    /**
     * @return mixed
     */
    public function getDisciplina()
    {
        return $this->disciplina;
    }

    /**
     * @param mixed $disciplina
     */
    public function setDisciplina($disciplina)
    {
        $this->disciplina = $disciplina;
    }

    /**
     * @return string
     */
    public function getPriezvisko(): string
    {
        return $this->priezvisko;
    }

    /**
     * @param string $priezvisko
     */
    public function setPriezvisko(string $priezvisko): void
    {
        $this->priezvisko = $priezvisko;
    }







}