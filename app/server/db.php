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