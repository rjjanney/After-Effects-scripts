/*
    README:

    This script picks up the name of the file in the project folder "Player" and allows you to 
    replace that file through a floating panel.
    Renames render queue items using name from new file.
    Has panel "save" button that opens the save project as... dialog box.
    Has "Render" button that renders the render queue, then refreshes 
    them back to their pre-render state.

v0.7 adds save and render button. Render should then refresh the render queue with duplicates of rendered items.
v0.9 makes subfolders automatically on render, and refocuses the
    master image comp on return
v0.9.7 Creates destination folder if doesn't exist

v0.9.8 Keeps directories for target dir and new head between selections. Eliminates constantly having to 
    reset destination and source folders

    TODO:
    Take into account files with _L and _R in their names.

*/


var proj = app.project;
var myRQ = proj.renderQueue;
var vers = '0.9.8';
var win = new Window('palette', 'Headshot Worker (v' + vers + ')',[300,100,645,300]);
var startDirectory = new Folder (Folder.encode(myRQ.item(1).outputModule(1).getSettings()["Output File Info"]["Base Path"]));

// regex finds from front of string to just before "_candid" or "_closeup" or "_1080"
var regex = /^.*(?=_candid|_closeup|_1080)/gm;

// Finds the headshot to replace. In folder "Player" among Project panel items.
for(var i = 1; i <= proj.numItems; i++){

    if(proj.item(i).parentFolder.name == "Player"){
        var theHeadToReplace = proj.item(i);
        var playerName = theHeadToReplace.file.name.split(".", 1);
    }else if(proj.item(i).name == "Master_Image"){
        var masterImageComp = proj.item(i);  
    }
}

// Start the floating script UI panel
var w = buildUI();
if (w != null) {
    w.show();
}


function buildUI() {
    if (win != null) {
        win.nameSearchLabel = win.add('statictext', [14,15,322,37], 'Current Headshot:');
        win.nameSearchT = win.add('edittext', [25,40,225,62], playerName);
        win.nameSearchT.onChange = function () { playerName = win.nameSearchT.text; renameRenderQueueItems(playerName); };
        win.repHead = win.add('button', [230,40,335,62], 'New Head');
        // win.repHead.value = true;
        win.repHead.onClick = function () {
            getsNewHeadshot(theHeadToReplace.file);
            playerName = theHeadToReplace.file.name;
            doTextChange(win.nameSearchT, theHeadToReplace.name.split(".", 1));
            renameRenderQueueItems(playerName);
            };
        win.nameReplaceLabel = win.add('statictext', [14,65,322,87], 'Target Directory:');
        win.nameReplaceT = win.add('edittext', [25,90,225,112], startDirectory.fsName);
        win.nameReplaceT.onChange = function () { 
            startDirectory.changePath(win.nameReplaceT.text);
            doTextChange(win.nameReplaceT, startDirectory.fsName);
            doMakeDirIfNotExists();
            renameRenderQueueItems(playerName); };
        win.repDir = win.add('button', [230,90,335,112], 'New Target Dir');
        win.repDir.onClick = function () {
            getsNewTargetDirectory();
            doTextChange(win.nameReplaceT, startDirectory.fsName);
            renameRenderQueueItems(theHeadToReplace.file.name);
            };
        
        win.okBtn = win.add('button', [230,141,335,163], 'Save As');
        win.okBtn.onClick = function () { doSaving(); };
        
        win.cancBtn = win.add('button', [230,168,335,190], 'Render');
        win.cancBtn.onClick = function () { doRender(); };
    }
    return win;
}


function doMakeDirIfNotExists(){

    if(startDirectory.exists){
        return;
    }else{
        startDirectory.create();
        return;
    }

}


function getsNewHeadshot(myFile){

    // User selects new headshot file
    myFile = myFile.openDlg("Please select new keyable heasdshot.");
    if(myFile != null){
         
         // open file
        theHeadToReplace.replace(myFile);
    }
    return;
}


function getsNewTargetDirectory(){

    // User selects new Target Directory
    
    var tempDir = startDirectory
    startDirectory = startDirectory.selectDlg("Please select new destination.");
    if (startDirectory){return;}else{startDirectory = tempDir; return;}
}


function renameRenderQueueItems(newNameForRQ){
    
    var newName = newNameForRQ.split('.');
    newName = newName[0];
    if(newName.substr(-2,2) == "_L"| newName.substr(-2,2) == "_R" ){
        var subFolderName = newName.substr(0, newName.length - 2);
        }else{
        var subFolderName = newName};
    for(var i = 1; i <= myRQ.numItems; i++){ //steps through every output queue item. Assumes only one output module per item.
        for(var j = 1; j <= myRQ.item(i).numOutputModules; j++){
            var oldPath = myRQ.item(i).outputModule(j).file.path; 
            var oldName = myRQ.item(i).outputModule(j).file.name;
          
            // alert(oldPath + "\n" + oldName);
            var rqItem1_settable = app.project.renderQueue.item(i).outputModule(j).getSettings();
            var subPath = rqItem1_settable["Output File Info"]["Subfolder Path"];
            var basePath = rqItem1_settable["Output File Info"]["Base Path"];
            // alert(basePath);

            // The substituted value will be contained in the result variable
            var result = oldName.replace(regex, newName);

            //This is the line that changes the Output To: name
            var my_renderSettings = {
            "Output File Info":
            {
            "Base Path":startDirectory.fsName,
            "Subfolder Path":subFolderName,
            "File Name":result,
            }
            };
        
        app.project.renderQueue.item(i).outputModule(j).setSettings( my_renderSettings );
        //  myRQ.item(i).outputModule(j).file = new File(oldPath + "/" + amendedName)
        } 
          
    }
}


function doTextChange(target, newText) {
    // Updates contents of editText box after new file selection
    
    target.text = newText;
}


function doSaving() {
    //Save project with new name
    app.project.saveWithDialog();
}


function doRender(){
    // Render

    app.project.renderQueue.render();

    doRevive();

}


function doRevive(){
    
    /*  steps through render queue looking for rendered items (status 2619)
        duplicates the item, then assigns original path and file info
        deletes rendered items, leaving only queued items
    */

    var doneList = [];

    for(var i = 1; i <= myRQ.numItems; i++){
        if (app.project.renderQueue.item(i).status == RQItemStatus.DONE){
            var oldInfo = myRQ.item(i).outputModule(1).getSettings();
            var newItem = app.project.renderQueue.item(i).duplicate();
            doneList.push(app.project.renderQueue.item(i));
            var rqItemNew_settable = newItem.outputModule(1).getSettings();
            var my_renderSettings = {
                "Output File Info":
                    {
                    /*"Full Flat Path":oldInfo["Output File Info"]["Full Flat Path"],*/
                                
                "Base Path":oldInfo["Output File Info"]["Base Path"],
                "Subfolder Path":oldInfo["Output File Info"]["Subfolder Path"],
                "File Name":oldInfo["Output File Info"]["File Name"],
                     
                    }
                };
             newItem.outputModule(1).setSettings( my_renderSettings );

        }
    }


    // alert(doneList.length);
    var lengthCopy = doneList.slice();
    for(var j = 0; j < lengthCopy.length; j++){
        var deleteMe = doneList.shift();
        deleteMe.remove();
    }

    // Refocus Master_Image comp
    masterImageComp.openInViewer();
    
}
