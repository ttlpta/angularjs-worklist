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
	 
                    if (!empty($param['id']) && $id = $param['id']){
                        $sql = 'UPDATE angular_work SET `title` = ?, `detail` = ?, `prioty` = ? WHERE id = ?';
						$stmt = $connected->prepare($sql);
						$stmt->bind_param('ssii', $title, $detail, $prioty, $id);
                    } else{
                        $sql = 'INSERT INTO angular_work ( `title`, `detail`, `prioty` ) VALUES (?, ?, ?)';
						$stmt = $connected->prepare($sql);
						$stmt->bind_param('ssi', $title, $detail, $prioty);
					}
					$stmt->execute();
					$retval = $stmt->get_result();
                    $last_id = mysqli_insert_id($connected);
					
                    die(json_encode(array('id' => $last_id)));
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
					$sql = 'SELECT * FROM `angular_work` WHERE id=?';
					$stmt = $connected->prepare($sql);
					$stmt->bind_param('i', $id);
					$stmt->execute();
					$retval = $stmt->get_result();
                    if (!$retval) {
                        die('Could not get data: ' . mysql_error());
                    }

                    $work = mysqli_fetch_array($retval, MYSQL_ASSOC);
					$work['priotyTitle'] = $priotyTitle($work['prioty']);
                    die(json_encode($work));
                    break;
					
				case 'delete':
                    $id = $param['id'];
					$sql = 'DELETE FROM `angular_work` WHERE id=?';
					$stmt = $connected->prepare($sql);
					$stmt->bind_param('i', $id);
					$stmt->execute();
                    die;
                    break;
            }
			
			$connected->close();
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
