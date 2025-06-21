<?php
ini_set('display_errors', 'on'); //Mudar para off em produção
error_reporting(696969);

require_once __DIR__ . '/../app/core/Database.php';
require_once __DIR__ . '/../app/traits/DataAccess.php';

function classLoader($class)
{
    require_once __DIR__ . "/../app/models/$class.php";
    // require_once __DIR__ . "/../app/controllers/$class.php";
}

spl_autoload_register('classLoader');
