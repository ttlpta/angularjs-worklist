<?php

interface connectedInterface
{
    public function connected();
}

class dbConnecttion implements connectedInterface
{
    private $_servername;
    private $_username;
    private $_password;
    private $_dbname ;

    public function __construct()
    {
        $this->_servername = 'localhost';
        $this->_username = 'root';
        $this->_password = '';
        $this->_dbname = 'angularjs';
    }

    public function connected()
    {
        $conn = mysqli_connect($this->_servername, $this->_username, $this->_password, $this->_dbname);

        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }

        return $conn;
    }
}

class workList
{
    public function __construct(connectedInterface $conn, $param)
    {
        if (!empty($param['action'])) {
            $connected = $conn->connected();
            switch ($param['action']) {
                case 'save':
                    $title = $param['title'];
                    $detail = (isset($param['detail'])) ? $param['detail'] : '';

                    if(!empty($param['id']) && $id = $param['id']){
                        $sql = "UPDATE work SET `title` = '$title', `detail` = '$detail' WHERE id = $id";
                    }else{
                        $sql = 'INSERT INTO work ( `title`, `detail` ) ' . "VALUES ( '$title', '$detail' )";
                    }
                    $retval = mysqli_query($connected, $sql);
                    $last_id = mysqli_insert_id($connected);
                    if (!$retval) {
                        die('Could not enter data: ' . mysqli_error());
                    }

                    echo json_encode(array('id' => $last_id));
                    die;
                    break;
                case 'list':
                    $sql = 'SELECT * FROM `work`';
                    $retval = mysqli_query($connected, $sql);
					$work = array();
                    while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
                        $work[] = $row;
                    }
					
                    echo json_encode($work);
                    die;
                    break;
                case 'edit':
                    $id = $param['id'];
                    $sql = "SELECT * FROM `work` WHERE id=$id";
                    $retval = mysqli_query($connected, $sql);
                    if (!$retval) {
                        die('Could not get data: ' . mysql_error());
                    }

                    $work = mysqli_fetch_array($retval, MYSQL_ASSOC);
                    echo json_encode($work);
                    die;
                    break;
            }
        }
    }
}

$conn = new dbConnecttion();
$param = $_GET;
if (!$param) {
    $request_body = file_get_contents('php://input');
    $param = (array)json_decode($request_body);
}

$workList = new workList($conn, $param);
