 <?php
	ob_implicit_flush();
	
	 workaround();
	
	$s = connect();
	writeAction($s);
	readAction($s);
	disconnect($s);
	
	function workaround() {
	  if (!defined('MSG_DONTWAIT')) {
	   define('MSG_DONTWAIT', 0x40);
	   return 1;
	  }
	}

	
	function connect() {
		$address = '127.0.0.1';
		$port = 9876;
		
		$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
		$result = socket_connect($socket, $address, $port) or die("socket_connect() failed.\nReason: ($result) " . socket_strerror(socket_last_error($socket)) . "\n");
		
		return $socket;
	}
	
	function disconnect($socket) {
		socket_close($socket); 
	}
	
	function writeAction($socket) {
		if ($_GET['action'] == "led1_on") {
			socket_write($socket, "1", strlen("2"));
		} else if ($_GET['action'] == "led2_on") {
			socket_write($socket, "2", strlen("2"));
		} else if ($_GET['action'] == "led3_on") {
			socket_write($socket, "3", strlen("3"));
		} else if ($_GET['action'] == "led_off") {
			socket_write($socket, "0", strlen("0"));
		} else if ($_GET['action'] == "ledFx_on") {
			socket_write($socket, "4", strlen("4"));
		} else if ($_GET['action'] == "ledFx_off") {
			socket_write($socket, "5", strlen("5"));
		}
	}
	
	function readAction($socket) {
		if ($_GET['action'] == 'read_effect') {
			$buf = socket_read($socket, 2048, PHP_NORMAL_READ);
			echo "$buf";
			sleep(1);
		}
	}
	
 ?>