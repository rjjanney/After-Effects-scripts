// AE Project optimized by removing separate Long, Medium and Short name comps, and just 
// using layers firstname and lastname in the main Player Names comp. This eliminates
// a lot of unnecessary comp duplicating, hopefully speeding up script preformance
// and freeing some working memory.

var proj = app.project;
var renderCompName = "__DCP_NAME_INTERSTITIAL___PreRENDER";
var workCompName = "PLAYER NAME";
var compItemSelect, renderItemSelect, searchItemSelect, nameCopyComp, playerNames, fullName;
var namesList = [];
var outlineItem, nameLong, nameMed, nameShort, panel05, changedPanel;
var name, namePair, workingComp;
var renderingComp;
var lNamePx; // Size of font for player Last Name, based on length of name
var lNameAnchor; // Y position of player Last Name, based on length of name


// create undo group

app.beginUndoGroup("Text File Versioning");


// step through all project items to find the comps we're interested in duplicating, and 
// assign them to variables

for(var i = 1; i <= proj.numItems; i++){
   
    switch(proj.item(i).name){
        case renderCompName:
            renderItemSelect = proj.item(i);
            break;
        case workCompName:
            compItemSelect = proj.item(i);
            break;
    }  
}


// Prompt user to select text file
var myFile = File.openDialog("Please select input text file.");
if(myFile != null){

    // open file
    var fileOK = myFile.open("r");

        while(!myFile.eof){

            name = myFile.readln();
            fullName = name.split(",", 1);
            // because split returns am array, must use toString(), even though it's a 1 element array
            namePair = fullName.toString().split(" "); // the delimiter between First and Last names in the text file
            namesList.push([namePair[0], namePair[1]]);
    }
        myFile.close();
}

// Make project folders to hold the versions and millions of precomps
var newFolder = proj.items.addFolder("Versions");
var hidePrecomps = proj.items.addFolder("zz_DupPrecomps");
// loop through the list of names "namesList"
for(var i = 0; i< namesList.length; i++){

    // duplicate the necessary comps and assign the objects to variables

    
    renderingComp = renderItemSelect.duplicate();    
    workingComp = compItemSelect.duplicate();
    workingComp.parentFolder = hidePrecomps;
    
   
// DECIDE WHETHER TO USE SHORT, MEDIUM, OR LONG NAME COMP
// and set font size for the outline font at the same time

    if (namesList[i][1].length < 5){
        
        lNamePx = 143;
        lNameAnchor = [77,0];
    }else if (namesList[i][1].length < 8) {
        

        lNamePx = 140;
        lNameAnchor = [202,3];
    }else{ar
        
        lNamePx = 126;
        lNameAnchor = [202,10];
}

    
    // put the duplicate comp in the "Versions" folder
    renderingComp.parentFolder = newFolder;
    // replace "Work_comp" with "Work_Comp 2" (like option_drag)
    renderingComp.layer(workCompName).replaceSource(workingComp, true);


    //Replace values in firstname and lastname layers
    workingComp.layer("FIRST").property("Source Text").setValue(namesList[i][0]);
    workingComp.layer("LAST").property("Source Text").setValue(namesList[i][1]);

    // set variables to change name positions based on font size
    var firstNameAnchor = workingComp.layer("FIRST").anchorPoint;
    var lastNameAnchor = workingComp.layer("LAST").anchorPoint;
    
    

//------------------------------------------------------
    // all this is necessary to wrangle the syntax to set text properties


    // Last Name
    var textProp = workingComp.layer("LAST").property("Source Text");
    var textDocument = textProp.value;
    // myString = "Happy holidays!";
    // textDocument.resetCharStyle();
    textDocument.fontSize = lNamePx;
    // textDocument.fillColor = [1, 0, 0];
    // textDocument.strokeColor = [0, 1, 0];
    // textDocument.strokeWidth = 2;
    // textDocument.font = "TimesNewRomanPSMT";
    // textDocument.strokeOverFill = true;
    // textDocument.applyStroke = true;
    // textDocument.applyFill = true;
    // textDocument.text = myString;
    // textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
    // textDocument.tracking = 50;
    textProp.setValue(textDocument);
    lastNameAnchor.setValue(lNameAnchor);
    
    // WHEW...
    //------------------------------------------------------
    
    

    // rename comp to "lastname_firstname"
    renderingComp.name = (namesList[i][1] + "_" + namesList[i][0]);
    
}

app.endUndoGroup();
