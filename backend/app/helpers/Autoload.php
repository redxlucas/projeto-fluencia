<?php
ini_set('display_errors', 'on'); //Mudar para off em produção
error_reporting(696969);

require_once __DIR__ . '/../core/Database.php';
require_once __DIR__ . '/../traits/DataAccess.php';

function classLoader($class)
{
    require_once __DIR__ . "/../models/$class.php";
    // require_once __DIR__ . "/../app/controllers/$class.php";
}

spl_autoload_register('classLoader');
