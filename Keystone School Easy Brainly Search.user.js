// ==UserScript==
// @name         Keystone School Easy Brainly Search
// @namespace    reddit.com/u/subatomicmc
// @version      1
// @description  adds some easy searching
// @author       Aiden Cannon
// @match        https://learnx-svc.k12.com/*
// @match        https://student.edgenuity.com/enrollment/*/coursemap
// @match        https://*.core.learn.edgenuity.com/Player/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var button = document.createElement("button")
    button.id = "searchButton"
    button.innerText = "Search on Brainly"
    button.style.position = "absolute"
    button.style.visibility = "visible"
    button.onmouseclick
    document.body.append(button)
    document.getElementById("searchButton").onclick = onButtonClick
    document.onmouseup = mouseup
            var copy
    function getClip () {
        navigator.clipboard.readText().then((copied) => {
        console.log(`Found "${copied}" from clipboard`);
            copy = copied
            console.log(copy)
        })
        return copy
    }
    console.log(getClip());
    var buttonpressed = false;
    function mouseup(e){
        getClip();
        if(buttonpressed == false){
            document.getElementById("searchButton").style.visibility = "visible"
            document.getElementById("searchButton").style.top = e.clientY + 10 + "px"
            document.getElementById("searchButton").style.left = e.clientX + "px"
        }
        else
        {
            //document.getElementById("searchButton").style.visibility = "hidden"
            buttonpressed = false
        }
    }
    function onButtonClick(){
        buttonpressed = true
        var url = 'https://brainly.com/app/ask?entry=top&q=' + getClip();
        window.open(url , '_blank')
    }
    setInterval(() => {getClip();},500)
})();
