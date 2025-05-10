<?php
    trait DataAccess {

        public function __get($name) {
            if(property_exists($this, $name)) {
                return $this->$name;
            }
        }

        public function __set($name, $value) {
            if(method_exists($this, 'set' . ucfirst($name))) {
                $this->{'set' . ucfirst($name)}($value);
            } else if(property_exists($this, $name)) {
                $this->$name = $value;
            }
        }

        public function __call($method, $args) {
            if(strpos($method, 'set') === 0) {
                $prop = lcfirst(str_replace('set', '', $method));
                if (property_exists($this, $prop) && $prop[0] != '_') {
                    $this->{$prop} = $args[0];
                    return $this;
                }
            }

            if(strpos($method, 'get') === 0) {
                $prop = lcfirst(str_replace('get', '', $method));
                if(property_exists($this, $prop) && $prop[0] != '_') {
                    return $this->{$prop};
                }
            }
        }
    }
?>