// Horizontal Align Null: Position property.
myY=0;
if(thisComp.layer("Extra Info").active)
{myY=-29}

// Slider control value is: thisComp.layer("R Word").sourceRectAtTime(time,false).width
widthDaypart = comp("01Day").layer("Null_For_Text_Width").effect("Slider Control")("Slider");

// If 30 is on, add it's width
if(comp("_COMPARE").layer("01 Single Day").effect("End Pages")("Add 30-T1?") == 1){
    width30 = comp("01_Time").layer("30").sourceRectAtTime(time,false).width;
}else{
    width30 = 0;
}

// if A or P, add width of layer "A"
if (comp("_COMPARE").layer("01 Single Day").effect("End Pages")("AM-PM1")  < 3){
widthText = comp("01_Time").layer("8A").sourceRectAtTime(time,false).width + comp("01_Time").layer("A").sourceRectAtTime(time,false).width + width30;
}else if (comp("_COMPARE").layer("01 Single Day").effect("End Pages")("AM-PM1")  >= 3) {
// if noon or midnight, add width of layer "Noon"
widthText = comp("01_Time").layer("NOON").sourceRectAtTime(time,false).width;
}
// deleted unnecessary else widthText = 0

dayLineCenter = widthDaypart + widthText;
dayCenter = dayLineCenter / 2 - widthText;

value+[dayCenter,myY];

// ##############################
// Horizontal Align Null: Position property for 01: Single Day.
ampm1_state = comp("_COMPARE").layer("01 Single Day").effect("End Pages")("AM-PM1");
t_8a1 = comp("01_Time").layer("8A").sourceRectAtTime(time,false).width;
ap1 = comp("01_Time").layer("A").sourceRectAtTime(time,false).width;
add_30_1 = comp("_COMPARE").layer("01 Single Day").effect("End Pages")("Add 30-T1?");
noon1_w = comp("01_Time").layer("NOON").sourceRectAtTime(time,false).width;
widthDaypart = comp("01Day").layer("Null_For_Text_Width").effect("Slider Control")("Slider");
wide_30 = comp("01_Time").layer("30").sourceRectAtTime(time,false).width;

myY=0;

if(thisComp.layer("Extra Info").active){
    myY=-29
}

if(add_30_1 == 1){
    width30 = wide_30;
}else{
    width30 = 0;
}

if (ampm1_state < 3){
widthText = t_8a1 + ap1 + width30;
}else if (ampm1_state >= 3) {
widthText = noon1_w;
}else{
widthText = 0;
}
dayLineCenter = widthDaypart + widthText;
dayCenter = (widthDaypart + widthText) / 2 - widthText;

value+[dayCenter,myY];

// ##############################


// #############################
// Horizontal Align Null: Position property for 06: Double.
// Takes into account the width of the network logo on the daypart line.
ampm1_state = comp("_COMPARE").layer("01 Single Day").effect("End Pages")("AM-PM1");
t_8a1 = comp("01_Time").layer("8A").sourceRectAtTime(time,false).width;
ap1 = comp("01_Time").layer("A").sourceRectAtTime(time,false).width;
add_30_1 = comp("_COMPARE").layer("01 Single Day").effect("End Pages")("Add 30-T1?");
noon1_w = comp("01_Time").layer("NOON").sourceRectAtTime(time,false).width;
// Slider control value is: thisComp.layer("R Word").sourceRectAtTime(time,false).width
widthDaypart = comp("01Day").layer("Null_For_Text_Width").effect("Slider Control")("Slider");
wide_30 = comp("01_Time").layer("30").sourceRectAtTime(time,false).width;
// Width of the GOLFlogo layer
singleLogoWidth = 258

myY=0;


// If 30 is on, add it's width
if(add_30_1 == 1){
    width30 = wide_30;
}else{
    width30 = 0;
}

// if A or P, add width of layer "A"
if (ampm1_state < 3){
widthText = t_8a1 + ap1 + width30;
}else if (ampm1_state >= 3) {
// if noon or midnight, add width of layer "Noon"
widthText = noon1_w;
}
// deleted unnecessary else widthText = 0





dayLineCenter = widthDaypart + widthText + singleLogoWidth;
dayCenter = dayLineCenter / 2; // - widthText + singleLogoWidth;

value+[dayCenter,myY];

// #########################


// Vertical Align Position property (from Eric)

myY=0;
if(thisComp.layer("Extra Info").active)
{myY=-29}
value+[0,myY];

// Alignment?

[thisComp.width - thisComp.layer("Null_For_Text_Width").effect("Slider Control")("Slider") / 2, value[1]]

//##############################

select = comp("_COMPARE").layer("01 Single Day").effect("End Pages")("daypart").value


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

    case 12:
    value = thisComp.layer("CUSTOM").name;
    break;

    default:
    value="TONIGHT"

}


// ##########################################

// #Noon

select = comp("_COMPARE").layer("01 Single Day").effect("End Pages")("AM-PM1").value;

switch(select){
    case1: 
    value = "";

    case 2:
    value = "";
    break;
    
    case 3:
    value = "NOON";
    break;

    case 4:
    value = "MIDNIGHT";
    break;

    default:
    value = "";

}



// ##################################

// # get hour value

slider_value = Math.round(comp("_COMPARE").layer("01 Single Day").effect("End Pages")("Hour 1: "));

// ###############################

// # Hour opacity

if (comp("_COMPARE").layer("01 Single Day").effect("End Pages")("AM-PM1").value > 2 ) 0 else transform.opacity

// #####################################
// 
// # Get AM / PM

select = comp("_COMPARE").layer("01 Single Day").effect("End Pages")("AM-PM1").value;

switch(select) {

    case 1:
    value = "A";
    break;

    case 2:
    value="P";
    break;

    case 3:
    value="";
    break;

    default:
    value=""

}

// ###################
// 
// # am/pm position

gap = 10;
gap_30 = 10;
w_30 = thisComp.layer("30");
w_rect = w_30.sourceRectAtTime(time, false);
width_30 = w_rect.width;
L = thisComp.layer("8A");
rect = L.sourceRectAtTime(time,false);
x = L.toComp([rect.left,0])[0] + rect.width;
if (comp("_COMPARE").layer("01 Single Day").effect("End Pages")("Add 30-T1?").value) gap += (width_30 + gap_30) ;
[x+gap,value[1]]


// ###################
// # 30 Position

offset = 8;
L = thisComp.layer("8A");
rect = L.sourceRectAtTime(time,false);
x = L.toComp([rect.left,0])[0] + rect.width;
[x + offset, value[1]]


// #################
// 
// #30 opacity

if (comp("_COMPARE").layer("01 Single Day").effect("End Pages")("Add 30-T1?").value) transform.opacity else 0;
if (comp("_COMPARE").layer("01 Single Day").effect("End Pages")("AM-PM1").value > 2 ) 0;

// ##################
// # network logo choose

select = comp("_COMPARE").layer("01 Single Day").effect("End Pages")("Network1").value

// # magic numbers are time remap values for the comp = where the logos are static

switch(select) {
    // GOLF
    case 1:
    value = "0";
    break;
    // NBC
    case 2:
    value="1.9";
    break;
    // Peacock
    case 3:
    value="2.15";
    break;
    // GOLF and NBC
    case 4:
    value="2.5"
    break;
    // GOLF LIVE EXTRA
    case 5:
    value="3"
    break;
    // CUSTOM logo in "Insert Cutsom Network Logo Here" Comp
    case 6:
    value="3.5"
    break;
    // Blank
    case 7:
    value="4"
    break;

    default:
        value="0"

}
