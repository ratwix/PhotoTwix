<?php
    //progress.php
    session_start();
	$arr = array(	'copyprogress' => $_SESSION["copyprogress"],
					'copystatus' => $_SESSION["copystatus"],
					'nbBig' => $_SESSION["nbBig"],
					'nbSolo' => $_SESSION["nbSolo"],
					'current' => $_SESSION["current"]);
					
	echo json_encode($arr);
?>