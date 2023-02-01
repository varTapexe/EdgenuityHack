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
    button.classList.add("searchButton")
    button.innerText = "Search Brainly"
    button.id = "searchButton"
    button.style.marginLeft = "15px"
    button.style.position = "absolute"
    button.style.visibility = "visible"
    const style = document.createElement('style');
    style.innerHTML = `.searchButton {
	box-shadow: 0px 0px 0px 0px #3dc21b;
	background-color:#f78e26;
	border-radius:7px;
	border:2px solid #f78e26;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Trebuchet MS;
	font-size:10px;
	font-weight:bold;
	padding:2px 18px;
	text-decoration:none;
}
.searchButton:hover {
	background-color:#ff962f;
}
`;
    button.appendChild(style)
    document.querySelector("#lessonInfo").appendChild(button)
    button.onclick = onButtonClick
    document.getElementById("searchButton").onclick = onButtonClick
    document.onmouseup = mouseup
            var copy;
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
        }
        else
        {
            //document.getElementById("searchButton").style.visibility = "hidden"
            buttonpressed = false
        }
    }
    function onButtonClick(){
        buttonpressed = true
        let clip = getClip()
        var url = 'https://brainly.com/app/ask?entry=top&q=' + clip;
        if (clip !== "") {
            window.open(url , '_blank')
        } else {
            alert("Please copy some text first!")
        }
    }
    setInterval(() => {
        getClip()
        if (document.getElementById("searchButton") === null) {
                          document.querySelector("#lessonInfo").appendChild(button)}},500)
})();
