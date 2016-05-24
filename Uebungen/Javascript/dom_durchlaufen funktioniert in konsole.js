
window.onload = domDurchlaufen;

var text = " ";
var treecorner = "──────";


   function domDurchlaufen(){
     walk(document.body.childNodes,0);

     var para = document.createElement("p");
     para.setAttribute("id","domBaum");
     var node = document.createTextNode(text);
     para.appendChild(node);

     document.body.appendChild(para);


     console.log(text);

}

  function walk(nod,level){
    var tab = "";

    for(var i=0; i<level;i++)
    tab += "──────";

    for(var i=0; i<nod.length; i++){

      if(ignorable(nod[i])==false){

        if(nod[i].hasChildNodes()==true){
          text += "\n" + ausgabeNode(nod[i],level);
          walk(nod[i].childNodes,level+1);
        }

        else
        text += "\n" +  ausgabeNode(nod[i], level);
        }
    }
  }


  function ausgabeNode(nod,level){


    var tab="";
    for(var i=0; i<level-1; i++)
    tab+="\t";

    if(level>0){
    tab+="└";
    tab+="───────";
    }

    if(nod.nodeType==1 && nod.hasAttributes()==true)
    return tab + nod.nodeName + " (" + node_Type(nod) + ") : " + nod.nodeValue + ausgabeAttribute(nod,level);
    else
    return tab + nod.nodeName + " (" + node_Type(nod) + ") : " + nod.nodeValue;
  }

  function ausgabeAttribute(nod,level){

    var tab="";
    for(var i=0; i<level; i++)
    tab+="\t"

    var at = nod.attributes;
    var attribute="";
    for(var i=0; i<at.length; i++){
        if(ignorable(at[i])==false){
          attribute+="\n" + tab + "└Attr " + at[i].nodeName + " = " + at[i].value;
        }
      }

      return attribute;
  }

   function node_Type(nod){
     if(nod.nodeType==1)
     return "Element_Node";
     else if (nod.nodeType==2)
     return "Attr_Node";
     else if(nod.nodeType==3)
     return "Text_Node";
     else
     return "undefined";

   }

   function ignorable(nod) {
                return (nod.nodeType == 8) || // Kommentar-Knoten
                (nod.nodeName == "SCRIPT") || // Skript-Knoten
                ((nod.nodeType == 3) && is_all_ws(nod)); // Text-Knoten, alles ws
                }

  // Pruefung, ob Knoten nur Whitespace (ws) beinhaltet
    function is_all_ws(nod) {
            // Use ECMA-262 Edition 3 String and RegExp features
            return !(/[^\t\n\r ]/.test(nod.textContent));
      }
