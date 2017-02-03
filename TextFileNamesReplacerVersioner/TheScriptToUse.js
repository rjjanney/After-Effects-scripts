var proj = app.project;
var compName = "NameComp";
var compItemSelect, renderItemSelect, searchItemSelect;
var namesList = [];
var name, namePair, workingComp;

// create undo group

app.beginUndoGroup("Text File Versioning");


//step through all project items to find comp named --compName-- and assign that object to  --compItemSelect---
for(var i = 1; i <= proj.numItems; i++){
   
    if(proj.item(i).name == compName){
          compItemSelect = proj.item(i);
     }
    
}
// Prompt user to select text file
var myFile = File.openDialog("Please select input text file.");
if(myFile != null){

    // open file
    var fileOK = myFile.open("r");

        while(!myFile.eof){

            name = myFile.readln();
            namePair = name.split(", "); // the delimiter between First and Last names in the text file
            namesList.push([namePair[0], namePair[1]]);

        }

        myFile.close();
}

var newFolder = proj.items.addFolder("Versions");

// loop through the list of names "namesList"
for(var i = 0; i< namesList.length; i++){

    // duplicate NameComp and assign the object to  a variable
    
    // ------------ note: if this is a big complex comp, import true comp duplicator code or include it with include statement
    // ------------------ or something
    
    workingComp = compItemSelect.duplicate();

    // put the duplicate comp in the "Versions" folder
    workingComp.parentFolder = newFolder;
      
    //Replace values in firstname and lastname layers
    workingComp.layer("firstname").property("Source Text").setValue(namesList[i][0]);
    workingComp.layer("lastname").property("Source Text").setValue(namesList[i][1]);
    
    // rename comp to "lastname_firstname"
    workingComp.name = (namesList[i][1] + "_" + namesList[i][0]);
    
}

app.endUndoGroup();
