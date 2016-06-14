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

    public function __construct()
    {
        $this->_servername = 'localhost';
        $this->_username = 'root';
        $this->_password = '';
    }

    public function connected()
    {
        $conn = mysql_connect($this->_servername, $this->_username, $this->_password);

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
            mysql_select_db('angularjs', $conn->connected());
            switch ($param['action']) {
                case 'save':
                    $title = $param['title'];
                    $detail = (isset($param['detail'])) ? $param['detail'] : '';
                    $sql = 'INSERT INTO work ( `title`, `detail` ) ' . "VALUES ( '$title', '$detail' )";
                    $retval = mysql_query($sql);
                    if (!$retval) {
                        die('Could not enter data: ' . mysql_error());
                    }

                    break;
                case 'list':
                    $sql = 'SELECT * FROM `work`';
                    $retval = mysql_query($sql);
                    if (!$retval) {
                        die('Could not get data: ' . mysql_error());
                    }

                    while ($row = mysql_fetch_array($retval, MYSQL_ASSOC)) {
                        $work[] = $row;
                    }

                    echo json_encode($work);
                    die;
                    break;
                case 'edit':
                    $id = $param['id'];
                    $sql = "SELECT * FROM `work` WHERE id=$id";
                    $retval = mysql_query($sql);
                    if (!$retval) {
                        die('Could not get data: ' . mysql_error());
                    }

                    $work = mysql_fetch_array($retval, MYSQL_ASSOC);
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
