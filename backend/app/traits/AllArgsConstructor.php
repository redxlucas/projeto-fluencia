<?php
    trait AllArgsConstructor {
        
        public function __construct(...$args) {
            $properties = array_keys(get_object_vars($this));

            foreach ($properties as $index => $name) {
                if (array_key_exists($index, $args)) {
                    $this->$name = $args[$index];
                }
            }
        }
    }
?>