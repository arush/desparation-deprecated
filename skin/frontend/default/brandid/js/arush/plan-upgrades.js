
function configurePlan(el) {

	var selection = el.options[el.selectedIndex].value;

	switch (selection) {
		
		//when user upgrades, set the cookie to true
		case "Polo":
		  $j.cookie('upgrade_tees', true);
		  break;
		case "Saturday Night":
		  $j.cookie('upgrade_shirts', true);
		  break;

		//when user downgrades, delete the cookie
		case "crew-vneck":
		  $j.cookie('upgrade_tees', null);
		  break;
		case "Monday Morning":
		  $j.cookie('upgrade_shirts', null);
		  break;
	}

}
