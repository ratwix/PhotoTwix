<?php
	include_once "common.php";

	//Analyse logs file
	$lines = file($log_file);
	
	$print = [];
	
	foreach ($lines as $line_num => $line) {
		$l = explode(':', $line);
		if ($l[0] == 'print') {
			$ld = explode(' ', $l[1]);
			if (isset($print[$ld[0]]["print"])) {
				$print[$ld[0]]["print"] = $print[$ld[0]]["print"] + 1;
			} else {
				$print[$ld[0]]["print"] = 1;
			}
		} else if ($l[0] == 'merge') {
			$ld = explode(' ', $l[1]);
			if (isset($print[$ld[0]]["merge"])) {
				$print[$ld[0]]["merge"] = $print[$ld[0]]["merge"] + 1;
			} else {
				$print[$ld[0]]["merge"] = 1;
			}
		}
	}
	
	ksort($print);
	$print = array_reverse($print);
	
	$print_result = "";
	
	foreach ($print as $date => $nb) {
		$print_result = $print_result."$date ";
		
		if (isset($nb["print"])) {
			 $print_result = $print_result."Impression: ".$nb["print"]."		";
		} else {
			$print_result = $print_result."Impression: 0		";
		}
		if (isset($nb["merge"])) {
			$print_result = $print_result."Photos: ".$nb["merge"]."<BR/>";
		} else {
			$print_result = $print_result."Photos: 0<BR/>";
		}
	}
	
	echo $print_result;
?>