<?php
    trait Getter {
        public function __get($name) {
            if (property_exists($this, $name)) {
                return $this->$name;
            }
        }

        public function __call($method, $args) {
            if (strpos($method, 'get') === 0) {
                $prop = lcfirst(substr($method, 3)); // remove 'get'
                if (property_exists($this, $prop) && $prop[0] !== '_') {
                    return $this->$prop;
                }
            }
        }
}
