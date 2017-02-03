/*
Here is the example findLeftEdge expression, arranged for readability

function findEdge(){
    for(inc=[100,50,25,10,5,1,.5,.1],compHeight=1080,startX=0,layer=thisComp.layer("50,142,173,865"),i=0;i<inc.length;i++){
        count=0;
        do{
            var t=checkRegion(startX+inc[i]*(count+1),compHeight/2,inc[i],compHeight/2),n=t[0]+t[1]+t[2]+t[3];
            count++
        }while(count<=100&&0==n);
            
        if(0==n)break;
        
        startX+=(count-1)*inc[i]
        }
        return startX
    }

function checkRegion(i,t,n,c){
    return layer.sampleImage([i,t],[n,c])
    }

findEdge();
*/

// Find Left Edge

function findLeftEdge(){for(inc=[100,50,25,10,5,1,.5,.1],compHeight=1080,startX=0,layer=thisComp.layer("51,126,188,332"),i=0;i<inc.length;i++){count=0;do{var t=checkRegion(startX+inc[i]*(count+1),compHeight/2,inc[i],compHeight/2),n=t[0]+t[1]+t[2]+t[3];count++}while(count<=100&&0==n);if(0==n)break;startX+=(count-1)*inc[i]}return startX}function checkRegion(i,t,n,c){return layer.sampleImage([i,t],[n,c])}leftEdge = findLeftEdge();

// Find Right Edge

function findRightEdge(){for(inc=[100,50,25,10,5,1,.5,.1],compHeight=1080,startX=1920,layer=thisComp.layer("50,142,174,869"),i=0;i<inc.length;i++){count=0;do{var t=checkRegion(startX-inc[i]*(count+1),compHeight/2,inc[i],compHeight/2),n=t[0]+t[1]+t[2]+t[3];count++}while(count<=100&&0==n);if(0==n)break;startX-=(count-1)*inc[i]}return startX}function checkRegion(i,t,n,c){return layer.sampleImage([i,t],[n,c])}rightEdge = findRightEdge();

// Find Top Edge

function findTopEdge(){for(inc=[100,50,25,10,5,1,.5,.1],compWidth=1920,startY=0,layer=thisComp.layer("51,126,188,332"),i=0;i<inc.length;i++){count=0;do{var t=checkRegion(compWidth/2,startY+inc[i]*(count+1),compWidth/2,inc[i]),n=t[0]+t[1]+t[2]+t[3];count++}while(count<=100&&0==n);if(0==n)break;startY+=(count-1)*inc[i]}return startY}function checkRegion(i,t,n,c){return layer.sampleImage([i,t],[n,c])}topEdge = findTopEdge();

// Find Bottom Edge

function findBottomEdge(){for(inc=[100,50,25,10,5,1,.5,.1],compWidth=1920,startY=1080,layer=thisComp.layer("51,126,188,332"),i=0;i<inc.length;i++){count=0;do{var t=checkRegion(compWidth/2,startY-inc[i]*(count+1),compWidth/2,inc[i]),n=t[0]+t[1]+t[2]+t[3];count++}while(count<=100&&0==n);if(0==n)break;startY-=(count-1)*inc[i]}return startY}function checkRegion(i,t,n,c){return layer.sampleImage([i,t],[n,c])}bottomEdge = findBottomEdge();

// END