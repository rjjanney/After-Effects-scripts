xWidth = thisComp.layer("Second Day Precomp").sourceRectAtTime(time,false).width;
compWidth = thisComp.width;
anchorXPosition = toComp(anchorPoint)[0];


myY=0;
if(thisComp.layer("Time 02").active)
{myY=+50}
[xWidth,value[1]]+[0,myY];


///////////////////////

L = thisComp.layer("Second Day Precomp");;
top = bottom = left = right = 0;

gotOne = false;
for (i = 0; i < height; i++){
  if (L.sampleImage([width/2, i], [width/2, 0.5], true)[3] > 0){
    bottom = i;
    if (! gotOne) {
      top = i;
      gotOne = true;
    }
  }
}

gotOne = false;
for (i = 0; i < width; i++){
  if (L.sampleImage([i, height/2], [0.5, height/2], true)[3] > 0){
    right = i;
    if (! gotOne) {
      left = i;
      gotOne = true;
    }
  }
}

"UL = [" + left + "," + top + "]   LR = [" + right + "," + bottom + "]";


////////////////////////////

function getParams(area)
{
    var pointX = (area[0][0] + area[1][0]) / 2;
    var pointY = (area[0][1] + area[1][1]) / 2;        
    var radiusX = (area[1][0] - area[0][0]) / 2;
    var radiusY = (area[1][1] - area[0][1]) / 2;
    return [ [pointX,pointY], [radiusX,radiusY] ];   
}
function isAreaEmpty(area)
{
    var params = getParams(area);        
    if (params[1][0] < 0.5 || params[1][1] < 0.5) 
        return true;
    return L.sampleImage(params[0], params[1], true)[3] > 0 ? false : true;
}
function sampleRow(area)
{
    var params = getParams(area);           
    if (L.sampleImage(params[0], params[1], true)[3] > 0)
    {
        if (params[0][1] < top)
            top = params[0][1];
        if (params[0][1] > bottom)
            bottom = params[0][1];
    }
}
function sampleCol(area)
{
    var params = getParams(area);           
    if (L.sampleImage(params[0], params[1], true)[3] > 0)
    {
        if (params[0][0] < left)
            left = params[0][0];
        if (params[0][0] > right)
            right = params[0][0];
    }
}
function sampleAreaHorizontally(area)
{    
    if (isAreaEmpty(area)) 
        return;

    if (area[1][1] - area[0][1] < 1.5)
        sampleRow(area);
        
    var UpperArea = [ area[0], [area[1][0],(area[0][1]+area[1][1])/2] ];
    var LowerArea = [ [area[0][0],(area[0][1]+area[1][1])/2], area[1] ];
    sampleAreaHorizontally(UpperArea);
    sampleAreaHorizontally(LowerArea);    
}
function sampleAreaVertically(area)
{    
    if (isAreaEmpty(area)) 
        return;

    if (area[1][0] - area[0][0] < 1.5)
        sampleCol(area);    
    
    var LeftArea  = [ area[0], [(area[0][0]+area[1][0])/2, area[1][1]] ];
    var RightArea = [ [(area[0][0]+area[1][0])/2, area[0][1]], area[1] ];
    sampleAreaVertically(LeftArea);
    sampleAreaVertically(RightArea);    
}  
var L = thisComp.layer("Text");
var top = L.height, bottom = 0, left = L.width, right = 0;
var halfW = L.width / 2;
var halfH = L.height / 2;
var area = [[0,0], [L.width,L.height]];
sampleAreaHorizontally(area);
sampleAreaVertically(area);
"" + left + "," + top + "," + right + "," + bottom;