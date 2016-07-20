<?php
include('db.php');
class workList
{
    public function __construct(connectedInterface $conn, $param)
    {
		$priotyTitle = function($prioty) {
			$title = '';
			switch($prioty){
				case 1:
					$title = 'Do after';
					break;
				case 2:
					$title = 'Should do';			
					break;
				case 3: 
					$title = 'Must do';
					break;
			}
			return $title;
		};
		
        if (!empty($param['action'])) {
            $connected = $conn->connected();
            switch ($param['action']) {
                case 'save':
                    $title = $param['title'];
                    $detail = (isset($param['detail'])) ? $param['detail'] : '';
                    $prioty = (isset($param['prioty'])) ? $param['prioty'] : 3;
	 
                    if(!empty($param['id']) && $id = $param['id']){
                        $sql = "UPDATE angular_work SET `title` = '$title', `detail` = '$detail', `prioty` = '$prioty' WHERE id = $id";
                    }else{
                        $sql = 'INSERT INTO angular_work ( `title`, `detail`, `prioty` ) ' . "VALUES ( '$title', '$detail', $prioty )";
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
                    $sql = 'SELECT * FROM `angular_work`';
                    $retval = mysqli_query($connected, $sql);
					$work = array();
					if ($retval){
						while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
							$row['priotyTitle'] = $priotyTitle($row['prioty']);
							$work[] = $row;
						}
					}
					
                    echo json_encode($work);
                    die;
                    break;
                case 'edit':
                    $id = $param['id'];
                    $sql = "SELECT * FROM `angular_work` WHERE id=$id";
                    $retval = mysqli_query($connected, $sql);
                    if (!$retval) {
                        die('Could not get data: ' . mysql_error());
                    }

                    $work = mysqli_fetch_array($retval, MYSQL_ASSOC);
					$work['priotyTitle'] = $priotyTitle($work['prioty']);
                    echo json_encode($work);
                    die;
                    break;
					
				case 'delete':
                    $id = $param['id'];
                    $sql = "DELETE FROM `angular_work` WHERE id=$id;";
                    $retval = mysqli_query($connected, $sql);
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
	$param['action'] = 'save';
}

$workList = new workList($conn, $param);
