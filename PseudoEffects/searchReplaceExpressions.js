{
app.beginUndoGroup("Search/Replace Expressions");



      win = new Window('dialog', "Search and Replace Expressions", "x:300,y:300,width:400,height:200");
      win.grp1 = win.add('group', "x:0,y:0,width:500,height:500", 'Title of Comp');
      
      win.grp1.add('statictext', "x:15,y:50,width:90,height:20", 'Search Text:');
      win.grp1.searchText = win.grp1.add('edittext', "x:100,y:50,width:250,height:20", '<search text>');
      
      win.grp1.add('statictext', "x:15,y:75,width:90,height:20", 'Replace Text:');
      win.grp1.replaceText = win.grp1.add('edittext', "x:100,y:75,width:250,height:20", '<replace text>');
      
      win.grp1.changeAllText = win.grp1.add('statictext', "x:15,y:110,width:225,height:20", 'Check to change all expressions:');
      win.grp1.changeAllExprCB = win.grp1.add('checkbox', "x:200,y:110,width:20,height:20");
      
      win.grp1.buildBtn = win.grp1.add('button', "x:15,y:150,width:200,height:30",   'Replace Text', {name:'ok'});
      win.grp1.buildBtn.onClick = searchProperties;
      win.grp1.cancelBtn = win.grp1.add('button', "x:240,y:150,width:100,height:30", 'Close', {name:'cancel'});

      win.show();
      
app.endUndoGroup();
}
      
      
function searchProperties()
{
   
   var changeAllCB = win.grp1.changeAllExprCB.value;
      
   clearOutput();

   var myComp = app.project.activeItem;

   // Gather data
   var myLayers = myComp.selectedLayers;
   var myCompName = myComp.name;
   
   // Walk layers
   if (myLayers.length > 0)
   {
      for (var l=0; l<myLayers.length; l++) {
         var myLayer = myLayers[l];
      
         if (changeAllCB)      
            findProperties(myLayer);
         else
         {
            selProps = myLayer.selectedProperties;
            if (selProps.length > 0)
            {
               for(var p=0; p<selProps.length; p++)
               {
                  var prop = selProps[p];
                  searchReplaceExpr(prop);
               }
            }
            else
               alert("No properties were selected");
         }
      }
   } else
      alert("You must select at least 1 layer");
}

function searchReplaceExpr(prop)
{
   var search_text = win.grp1.searchText.text;
   var replace_text = win.grp1.replaceText.text;
   
   if (prop.canSetExpression == true) {

      var search_text = eval("/" + search_text + "/g");   
      prop.expression = prop.expression.replace(search_text, replace_text);
   }
}

function findProperties(object)
{
   var numProps = 0;
   numProps = object.numProperties;

   // if there are undefined properties, we are at the bottom of the hierarchy of properties
   if (numProps == undefined)
   {
      if (object.expressionEnabled)
         searchReplaceExpr(object);
      return 1;
   } else if (numProps == 0)
      return 1;
   
   //recursively search all properties
   for (i=1; i<=numProps; i++)
   {
      findProperties(object.property(i));
   }
   return 0;
}