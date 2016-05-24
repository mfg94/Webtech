window.onload = walkDOM;
var tree = document.createElement("p"); //paragraph for the created tree
var tabulationWhite = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";// '/t' as unicode for html presentation
var tabulationLine = "──────"; // '/t' as line for tree-visualization
var branch = "└"; // identifys a child branch in the html-tree

function walkDOM() { // root-function for walking through the dom
    walk(document.body.childNodes, 0); //body as root node. 0 because its root level
    document.body.appendChild(tree); //adding the dom-tree to the html-document
}

function walk(nod, depth) { //'recursive' function for wallking through the nodes of the html document
    var tabs = "";

    for (var i = 0; i < depth; i++)
        tabs += tabulationLine;

    for (var i = 0; i < nod.length; i++) {

        if (ignorable(nod[i]) == false) { //check if node is ignorable

            if (nod[i].hasChildNodes() == true) {//if the node has children add it to the tree and then go recursive
                linebreak();
                printNode(nod[i], depth);
                walk(nod[i].childNodes, depth + 1);
            } else { // if the node has no children just add it to the tree
                linebreak();
                printNode(nod[i], depth);
            }
        }
    }
}


function printNode(nod, level) {
    var tabs = "";
    //do tabulation for childnodes
    for (var i = 0; i < level - 1; i++)
        tabs += tabulationWhite;
      //if its a childnode it needs to have a branch with a line in the visualization
    if (level > 0) {
        tabs += branch;
        tabs += tabulationLine;
    }
    //check if the actual nodeType is an element and if it has attributes
    if (nod.nodeType == 1 && nod.hasAttributes() == true) { //add the actual node and its attributes to the tree
        addTextToTree(tabs + nod.nodeName + " (" + node_Type(nod) + ") : " + nod.nodeValue);
        printAttributes(nod, level);
    } else //just adding the actual node to the tree
        addTextToTree(tabs + nod.nodeName + " (" + node_Type(nod) + ") : " + nod.nodeValue);
}

function printAttributes(nod, level) { //waling through all the attributes of the node and add them to the tree
    var tabs = "";
    var attributes = nod.attributes;

    for (var i = 0; i < level; i++)
        tabs += tabulationWhite;

    for (var i = 0; i < attributes.length; i++) {
        if (ignorable(attributes[i]) == false) {
            linebreak();
            addTextToTree(tabs + branch + "Attr " + attributes[i].nodeName + " = " + attributes[i].value);
        }
    }
}

//returns the nodename given by the specific number
function node_Type(nod) {
    if (nod.nodeType == 1)
        return "Element_Node";
    else if (nod.nodeType == 2)
        return "Attr_Node";
    else if (nod.nodeType == 3)
        return "Text_Node";
    else
        return "undefined";
}

//Is nod ignorable for the tree?
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

function addTextToTree(text) { //function for adding a text-element to the tree
    tree.appendChild(document.createTextNode(text));
}

function linebreak() { //function for adding a linebreak-element to the tree in html
    tree.appendChild(document.createElement("br"));
}
