<?php


class Vysledok
{
    private bool $uspech;

    /**
     * @return bool
     */
    public function isUspech(): bool
    {
        return $this->uspech;
    }

    /**
     * @param bool $uspech
     */
    public function setUspech(bool $uspech): void
    {
        $this->uspech = $uspech;
    }

}