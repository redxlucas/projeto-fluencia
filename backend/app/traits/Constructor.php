<?php
    trait Constructor {
        public function __construct($data = null) {
            if ($data && is_array($data)) {
                foreach ($data as $key => $value) {
                    if (property_exists($this, $key)) {
                        $this->$key = $value;
                    }
                }
            }
        }
    }
?>