function autoCrop(curLayerIndex, workingOn) {
app.beginUndoGroup("Auto Crop");
var curComp = app.project.activeItem;
var cropComp = curComp.layer(curLayerIndex[workingOn]);
var cropCompSource = cropComp.source;
var originalHeight = cropComp.height;
var originalWidth = cropComp.width;
var fD = curComp.frameDuration;
try {
if (win.bg.chk2.value) {
alert("TOM");
turnOffMasks(cropComp);
}
} catch (err) {
alert(err);
}
curComp.time = curComp.time + fD;
var newNull = curComp.layers.addNull(fD * 2);
newNull.name = "AUTO CROP NULL";
newNull.source.name = "AUTO CROP NULL";
newNull.moveToEnd();
newNull.startTime = curComp.time - fD;
slider = addSlider(app.language, newNull);
try {
bounds = getBounds(cropComp, slider, originalWidth, originalHeight, curComp.time);
} catch (err) {
alert("Get Bounds Error: ");
alert(err);
}
bounds = addPadding(bounds);
try {
repositionLayers(cropCompSource, bounds);
} catch (err) {
alert("Reposition Layers Error: ");
alert(err);
}
try {
resizeComp(cropComp, cropCompSource, bounds, curComp);
} catch (err) {
alert("Resize Comp Error: ");
alert(err);
}
curComp.time = curComp.time - fD;
newNull.source.remove();
if (win.bg.chk2.value) {
turnOnMasks(cropComp);
}
app.endUndoGroup();
if (curComp.layer(curLayerIndex[++workingOn])) {
autoCrop(curLayerIndex, workingOn);
} else {
return [bounds, originalHeight, originalWidth];
}
}

function writeExpression(we_cropComp, we_dir) {
//composes expression to add to null layer to get dimensional result
var we_incs = "100,50,25,10,5,1,.5,.1";
var we_expression = "";
we_expression += "function findEdge(){for(inc=[" + we_incs + "],";
var we_sign = "+";
switch(we_dir) {
case "l":
we_expression += "compHeight=" + we_cropComp.height + ",startX=0,";
break ;
case "r":
we_expression += "compHeight=" + we_cropComp.height + ",startX=" + we_cropComp.width + ",";
we_sign = "-";
break ;
case "t":
we_expression += "compWidth=" + we_cropComp.width + ",startY=0,";
break ;
case "b":
we_expression += "compWidth=" + we_cropComp.width + ",startY=" + we_cropComp.height + ",";
we_sign = "-";
break ;
}
we_expression += "layer=thisComp.layer(\"" + we_cropComp.name + "\"),i=0;i<inc.length;i++){count=0;do{var t=checkRegion(";
if (we_dir == "l" || we_dir == "r") {
we_expression += "startX" + we_sign + "inc[i]*(count+1),compHeight/2,inc[i],compHeight/2),n=t[0]+t[1]+t[2]+t[3];count++}while(count<=100&&0==n);if(0==n)break;startX" + we_sign + "=(count-1)*inc[i]}return startX}function checkRegion(i,t,n,c){return layer.sampleImage([i,t],[n,c])}findEdge();";
} else {
we_expression += "compWidth/2,startY" + we_sign + "inc[i]*(count+1),compWidth/2,inc[i]),n=t[0]+t[1]+t[2]+t[3];count++}while(count<=100&&0==n);if(0==n)break;startY" + we_sign + "=(count-1)*inc[i]}return startY}function checkRegion(i,t,n,c){return layer.sampleImage([i,t],[n,c])}findEdge();";
}
return we_expression;
}

function addSlider(lang, newNull) {
return newNull.effect.addProperty("ADBE Slider Control");
}

function getBounds(cropComp, originalHeight, originalWidth, slider, theTime1) {
//Sets up slider and then sets up and runs expressions for all 4 dimensions locations

var fD = app.project.activeItem.frameDuration;
theTime1 = typeof theTime1 !== "undefined" ? theTime1 : curComp.time;
slider("Slider").expression = writeExpression(cropComp, "l");
slider("Slider").selected = true;
app.executeCommand(2639);
leftVal = Math.ceil(slider("Slider").valueAtTime(theTime1 - fD, false));
slider("Slider").expression = writeExpression(cropComp, "r");
slider("Slider").selected = true;
app.executeCommand(2639);
rightVal = Math.ceil(slider("Slider").valueAtTime(theTime1 - fD, false));
slider("Slider").expression = writeExpression(cropComp, "t");
slider("Slider").selected = true;
app.executeCommand(2639);
topVal = Math.ceil(slider("Slider").valueAtTime(theTime1 - fD, false));
slider("Slider").expression = writeExpression(cropComp, "b") + "// END";
//alert(slider("Slider").expression);
slider("Slider").selected = true;
app.executeCommand(2639);
bottomVal = Math.ceil(slider("Slider").valueAtTime(theTime1 - fD, false));
return [topVal, bottomVal, leftVal, rightVal];
}




//alert(writeExpression(app.project.activeItem, "l"))

var curComp = app.project.activeItem;
var cropComp = curComp.layer(1);
var cropCompSource = cropComp.source;
var originalHeight = cropComp.height;
var originalWidth = cropComp.width;
var fD = curComp.frameDuration;
curComp.time = curComp.time + fD;
var newNull = curComp.layers.addNull(fD * 2);
newNull.name = "AUTO CROP NULL";
newNull.source.name = "AUTO CROP NULL";
newNull.moveToEnd();
newNull.startTime = curComp.time - fD;
slider = addSlider(app.language, newNull);



bounds = getBounds(cropComp, originalHeight, originalWidth, slider, curComp.time);

curComp.layer(1).sourceText.setValue(bounds.toString());