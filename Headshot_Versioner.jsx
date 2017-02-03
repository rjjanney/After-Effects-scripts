// AE Project optimized by removing separate Long, Medium and Short name comps, and just 
// using layers firstname and lastname in the main Player Names comp. This eliminates
// a lot of unnecessary comp duplicating, hopefully speeding up script preformance
// and freeing some working memory.

var proj = app.project;
var renderCompName_L = "DCP_Headshot_L";
var renderCompName_M = "DCP_Headshot_M";
var renderCompName_S = "DCP_Headshot_S";
var workCompName = "Headshot";
var playerImage = "PlayerImage";
var compItemSelect, renderItemSelect_L, renderItemSelect_M, renderItemSelect_S, imageItem;
var workingComp;
var renderingComp_L, renderingComp_M, renderingComp_S;
var boysFolder, girlsFolder;
var boys = "BOYS";
var girls = "GIRLS";


// create undo group

app.beginUndoGroup("Text File Versioning");


// step through all project items to find the comps we're interested in duplicating, and 
// assign them to variables

for(var i = 1; i <= proj.numItems; i++){
   
    switch(proj.item(i).name){
        case renderCompName_L:
            renderItemSelect_L = proj.item(i);
            break;
        case renderCompName_M:
            renderItemSelect_M = proj.item(i);
            break;
        case renderCompName_S:
            renderItemSelect_S = proj.item(i);
            break;
        case workCompName:
            compItemSelect = proj.item(i);
            break;
        case playerImage:
            imageItem = proj.item(i);
            break;
        case boys:
            boysFolder = proj.item(i);
            break;
        case girls:
            girlsFolder = proj.item(i)
            break;
    }  
}

// Here we load all the keyable targas into an array --------------------

var headsArray = []
// AE project item indexes start at 1
for(var i = 1; i <= boysFolder.numItems; i++) {
        for(var x = 1; x<= boysFolder.item(i).numItems; x++){
                headsArray.push(boysFolder.item(i).item(x));
            } 
    }
for(var i = 1; i <= girlsFolder.numItems; i++) {
        for(var x = 1; x<= girlsFolder.item(i).numItems; x++){
                headsArray.push(girlsFolder.item(i).item(x));
            } 
    }
// -----------------------------------------------------------------------

// Make project folders to hold the versions and millions of precomps
var newFolder = proj.items.addFolder("Versions");
var headshotsAdjust = proj.items.addFolder("Adjust Positioning Here")


    // duplicate the necessary comps and assign the objects to variables
    // javascript arrays start at 0
for(g=0; g<headsArray.length; g++){
    
    renderingComp_L = renderItemSelect_L.duplicate();
    renderingComp_M = renderItemSelect_M.duplicate();
    renderingComp_S = renderItemSelect_S.duplicate();
    workingComp = compItemSelect.duplicate();
            


    // put the duplicate comp in the "Versions" folder
    renderingComp_L.parentFolder = newFolder;
    renderingComp_M.parentFolder = newFolder;
    renderingComp_S.parentFolder = newFolder;
    // put the master shots in the "Adjust positioning here" folder
    workingComp.parentFolder = headshotsAdjust;
    // replace "Headshot" with "Name_Headshot" (like option_drag)
    renderingComp_L.layer(workCompName).replaceSource(workingComp, true);
    renderingComp_M.layer(workCompName).replaceSource(workingComp, true);
    renderingComp_S.layer(workCompName).replaceSource(workingComp, true);
    // replace default image with specific version image from headsArray
    workingComp.layer(playerImage).replaceSource(headsArray[g], true);
    
    // This assumes the targa headshots are saved as "Last_First_xxxxx.tga"
    // Gets just the "Last_First" part of that filename, using split()
    var name = headsArray[g].name.split("_", 2);
    // Then puts them back together again with join()
    renderingComp_L.name = name.join("_")+"_L";
    renderingComp_M.name = name.join("_")+"_M";
    renderingComp_S.name = name.join("_")+"_S";
    workingComp.name = name.join("_")+"_Headshot";
    app.project.renderQueue.items.add(renderingComp_L);
    app.project.renderQueue.items.add(renderingComp_M);
    app.project.renderQueue.items.add(renderingComp_S);
    
}

//------------------------------------------------------

app.endUndoGroup();
