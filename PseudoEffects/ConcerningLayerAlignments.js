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


// Center date line in 02 Single Date comp 
// Applied to Horizontal Align Date null parented to Vertical Align null,
// center point at right end of month part of the comp
widthMonth = comp("Month_02").layer("MONTHWidthNull").effect("Slider Control")("Slider").value;
widthDate = comp("Date_02").layer("DateWidthNull").effect("Slider Control")("Slider").value;
subCenter = (widthMonth + widthDate) / 2;
specificCenter = widthMonth - subCenter;
[specificCenter, 0]

//This is for 01Day comp - expressions live in 01 Single Day so far - on Horizontal Align null
myY=0;
if(thisComp.layer("Extra Info").active)
{myY=-29}

widthDaypart = comp("01Day").layer("Null_For_Text_Width").effect("Slider Control")("Slider");

if(comp("_COMPARE").layer("01 Single Day").effect("End Pages")("Add 30-T1?") == 1){
	width30 = comp("01_Time").layer("30").sourceRectAtTime(time,false).width;
}else{
	width30 = 0;
}

if (comp("_COMPARE").layer("01 Single Day").effect("End Pages")("AM-PM1")  < 3){
widthText = comp("01_Time").layer("8A").sourceRectAtTime(time,false).width + comp("01_Time").layer("A").sourceRectAtTime(time,false).width + width30;
}else if (comp("_COMPARE").layer("01 Single Day").effect("End Pages")("AM-PM1")  >= 3) {
widthText = comp("01_Time").layer("NOON").sourceRectAtTime(time,false).width;
}else{
widthText = 0;
}
dayLineCenter = widthDaypart + widthText;
dayCenter = (widthDaypart + widthText) / 2 - widthText;

value+[dayCenter,myY];

widthDate = comp("Date_02").layer("DateWidthNull").effect("Slider Control")("Slider").value;
subCenter = (widthMonth + widthDate) / 2;
specificCenter = widthMonth - subCenter;
[specificCenter, 0]


widthDaypart = comp("01Day").layer("Null_For_Text_Width").effect("Slider Control")("Slider");
center = widthDaypart / 2;
[center, value[1]];

thisComp.layer("R Word").sourceRectAtTime(time,false).width;