﻿/*     "Replace Footage Items With Files From Disk"    AfterEffects script to replace a folder full of     footage items in the project panel with files     from a folder on disk        In this case it's replacing everything from    project item(2) with files in a folder chosen    via popup dialog, with "jpg" in the name    via the RegExp and .getfiles(regthis) methods        */app.beginUndoGroup("ReplaceThoseFiles");var proj = app.project;var replaceList = [];var myFolder = Folder.selectDialog("Import Files From Folder");var regthis = RegExp('(jpg)');var myFiles = myFolder.getFiles(regthis);for (var x = 0; x < myFiles.length; x++){            replaceList.push(myFiles[x]);        }    var folder = proj.item(2);for(var i = 1; i<= folder.numItems; i++){     folder.item(i).replace(replaceList[i-1]);}app.endUndoGroup();