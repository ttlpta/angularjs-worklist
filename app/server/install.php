<?php
include('db.php');
$db = new dbConnecttion();
$connected = $db->connected();
$sql = "
	CREATE TABLE IF NOT EXISTS `angular_work` (
		`id` INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
		`title` VARCHAR(150),
		`detail` VARCHAR(150),
		`prioty` smallint(5) NOT NULL DEFAULT '3'
		
	) ENGINE=InnoDB DEFAULT CHARSET=utf8;
";

$install = mysqli_query($connected, $sql);
if ($install){
	die('Create table success');
} else {
	die('Create table fail');
}



