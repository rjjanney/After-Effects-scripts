select = comp("01 Single Day").layer("Day").effect("End Pages")("daypart").value


switch(select) {

	case 1:
	value = "MONDAY";
	break;

	case 2:
	value="TUESDAY";
	break;

	case 3:
	value="WEDNESDAY";
	break;

	case 4:
	value="THURSDAY";
	break;

	case 5:
	value="FRIDAY";
	break;

	case 6:
	value="SATURDAY";
	break;
	
	case 7:
	value="SUNDAY";
	break;

	case 8:
	value="TONIGHT";
	break;

	case 9:
	value="TODAY";
	break;

	case 10:
	value="TOMORROW";
	break;

	case 11:
	value="NEXT";
	break;

	default:
	value="TONIGHT"

}