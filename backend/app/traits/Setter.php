<?php

trait Setter {
    public function __set($name, $value) {
        $method = 'set' . ucfirst($name);
        if (method_exists($this, $method)) {
            $this->$method($value);
        } else if (property_exists($this, $name)) {
            $this->$name = $value;
        }
    }

    public function __call($method, $args) {
        if (strpos($method, 'set') === 0) {
            $prop = lcfirst(substr($method, 3));
            if (property_exists($this, $prop) && $prop[0] !== '_') {
                $this->$prop = $args[0];
                return $this;
            }
        }
    }
}
