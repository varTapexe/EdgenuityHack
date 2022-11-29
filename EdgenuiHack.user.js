// ==UserScript==
// @name         EdgenuiHack
// @version      1.2.9
// @description  Adds tweaks to edgenuity [IMPORTANT NOTE: EdgenuiHack is not created by, sponsored by, affiliated with, endorsed by, or otherwise assosiated with Edgenuity Inc]
// @author       Aiden Cannon
// @match        *://*.core.learn.edgenuity.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.configElements = []
    //==BEGIN UI BUILDING==
    window.overlay = document.createElement("div")
    window.overlay.style.width = "100vw"
    window.overlay.style.height = "100vh"
    window.overlay.style.zIndex = "1"
    window.overlay.style.position = "fixed"
    window.overlay.style.visibility = "hidden"
    window.overlay.id = "overlay"
    document.body.prepend(window.overlay)
    function BuildMenuEntry (name, info, id, configpane) {
        window.entry = document.createElement("div")
        window.tickbox = document.createElement("input")
        window.tickbox.type = "checkbox"
        window.tickbox.id = id
        window.configElements.push(id)
        window.entry.appendChild(window.tickbox)
        window.window.label = document.createElement("label")
        window.label.innerText = name
        window.entry.appendChild(window.label)
        if (configpane != undefined) {
            window.configbutton = document.createElement("button")
            window.configbutton.innerText = "Configure"
            window.configbutton.style.marginLeft = "7px"
            window.configbutton.style.border = "1px solid #5f5f5f"
            window.configbutton.style.boxShadow = "inset 0 0 5px rgba(0, 0, 0, 0.6)"
            window.configbutton.style.backgroundColor = "rgb(39, 39, 39)"
            window.configbutton.style.color = "#f9a619"
            window.configbutton.style.borderRadius = "3px"
            window.configbutton.onclick = function () {
                if (document.getElementById(configpane).style.visibility == "unset") {
                    document.getElementById(configpane).style.visibility = "hidden"
                } else {
                    document.getElementById(configpane).style.visibility = "unset"
                }
            }
            window.entry.appendChild(window.configbutton)
        }
        window.desc = document.createElement("p")
        window.desc.innerHTML = info;
        window.entry.appendChild(window.desc)
        return window.entry
    }
    function RenderPane(name, id, width, height, margintop, marginleft) {
        window.pane = document.createElement("div")
        window.pane.style.width = width
        window.pane.style.height = height
        window.pane.style.position = "absolute"
        window.pane.style.marginTop = margintop
        window.pane.style.marginLeft = marginleft
        window.pane.style.border = "1px solid rgb(95, 95, 95)"
        window.pane.style.borderRadius = "3px"
        window.pane.style.backgroundColor = "rgb(39, 39, 39)"
        window.pane.style.overflow = "hidden"
        window.pane.style.color = "rgb(249, 166, 25)"
        window.pane.style.textAlign = "center"
        window.pane.style.overflowY = "scroll"
        window.pane.id = id
        window.panetitle = document.createElement("h1")
        window.panetitle.innerText = name
        window.pane.appendChild(window.panetitle)
        window.pane.appendChild(document.createElement("hr"))
        document.getElementById("overlay").appendChild(window.pane)
    }
    // Add the button
    window.tweaksbutton = document.createElement("button")
    window.tweaksbutton.innerText = "Tweaks"
    window.tweaksbutton.id = "tweaksbutton"
    window.tweaksbutton.style.border = "1px solid #5f5f5f"
    window.tweaksbutton.style.boxShadow = "inset 0 0 5px rgba(0, 0, 0, 0.6)"
    window.tweaksbutton.style.backgroundColor = "rgb(39, 39, 39)"
    window.tweaksbutton.style.color = "#f9a619"
    window.tweaksbutton.style.borderRadius = "3px"
    window.tweaksbutton.style.marginLeft = "40%"
    window.tweaksbutton.style.zIndex = "2"

    document.getElementsByClassName("mainfoot")[0].appendChild(window.tweaksbutton)
    // Build main menu
    RenderPane("EdgenuiHack", "tweaksmenu", "50%", "50%", "20vh", "25%")
    // Menu Entrys
    document.getElementById("tweaksmenu").appendChild(BuildMenuEntry("Auto Advance", "Advance to the next portion of the course automatically when it becomes available", "AutoAdvance.tickbox"))
    document.getElementById("tweaksmenu").appendChild(BuildMenuEntry("Auto Complete Vocab","Automatically completes vocab assignments","AutoCompleteVocabTickbox"))
    document.getElementById("tweaksmenu").appendChild(BuildMenuEntry("Skip Videos", "Skips videos. <span style='color: red'>THIS IS HIGHLY EXPERIMENTAL AND WILL BREAK THINGS</span>", "SkipVideosTickbox")) 
    document.getElementById("tweaksmenu").appendChild(BuildMenuEntry("Skip intro", "Lets you interact with practices while the intro audio is playing", "SkipIntro.tickbox"))
    document.getElementById("tweaksmenu").appendChild(BuildMenuEntry("Guess Practice", "Most teachers don't count practices twords your final grade, so you can guess your way thru them. This automatically guesses thru practices.", "GuessPractice.tickbox", "practiceconfig"))
    document.getElementById("tweaksmenu").appendChild(BuildMenuEntry("Show Columns","On practices where you have to write a text response to a prompt, there is an example response to the prompt. However, it is hidden until you submit your response. This forces it to show even if you haven't submitted a response yet", "ShowColumn.tickbox"))
    // Config Menus
    RenderPane("Guess Practice Config", "practiceconfig", "15%", "15%", "0", "0")
    document.getElementById("practiceconfig").style.visibility = "hidden"
    document.getElementById("practiceconfig").appendChild(BuildMenuEntry("Guess thru Assignments", "Guesses thru assignments. This is highly discouraged", "guessassignments"))
    // window.copyright
    window.copyright = document.createElement("p")
    window.copyright.innerHTML = "EdgenuiHack Version 1.2.9 by Aiden Cannon - Add me on Discord for support: tap#0002"
    window.copyright.style.color = "gray"
    window.copyright.style.width = "100%"
    document.getElementById("tweaksmenu").append(window.copyright)
    // Activate the button
    document.getElementById("tweaksbutton").addEventListener("click", function () {
        if (document.getElementById("overlay").style.visibility == "hidden") {
            document.getElementById("overlay").style.visibility = "visible"
        } else {
            document.getElementById("overlay").style.visibility = "hidden"
        }
    })


    //==BEGIN TWEAKS==
    // Auto Advance
    function autoadvance () {
        if (document.getElementById("AutoAdvance.tickbox").checked) {
            if (document.getElementById("activity-title").innerText == "Quiz") {
            } else {
                try {document.getElementsByClassName("footnav goRight")[0].click()} catch (TypeError) {}
                try {window.frames[0].API.FrameChain.nextFrame()} catch (TypeError) {}
            }
        }
    }
    // Skip intro
    function skipIntro() {
        if (document.getElementById("SkipIntro.tickbox").checked) {
            try {window.frames[0].document.getElementById("invis-o-div").remove()} catch (TypeError) {}
        }
    }
    // Guess Practice
    function GuessPractice() {
        if (document.getElementById("GuessPractice.tickbox").checked) {
            try { // document.getElementById("activity-title") may error
                if (document.getElementById("activity-title").innerText == "Assignment") {
                    if (!document.getElementById("guessassignments").checked) {
                        return // End the method call so we dont guess
                    }
                }
                if (["Instruction", "Assignment", "Warm-Up"].includes(document.getElementById("activity-title").innerText)) {
                    try {window.options = window.frames[0].frames[0].document.getElementsByClassName("answer-choice-button");
                    window.options[Math.floor(Math.random() * window.options.length)].click();} catch (TypeError) {}
                    try {window.frames[0].API.Frame.check()} catch (TypeError) {} // This has to be seporate from the option clicker in case it's a text only practice
                }
            }
            catch (TypeError) {}
        }
    }
    // Unhide Right Column
    function showColumn() {
        if (document.getElementById("ShowColumn.tickbox").checked) {
            try {window.frames[0].frames[0].document.getElementsByClassName("right-column")[0].children[0].style.display = "block"} catch (TypeError) {}
            try {window.frames[0].frames[0].document.getElementsByClassName("left-column")[0].children[0].style.display = "block"} catch (TypeError) {}
        }
    }
    // Skip videos (PATCHED)
    function skipVideo() {
        if (document.getElementById("SkipVideosTickbox").checked) {
            if (document.getElementById("activity-title").innerText != "Assignment") { // Appearantly this causes problems with assignments, disable it for now
                if (frames[0].document.getElementById("home_video_container").parentNode.style.opacity == 1) {
                    try {window.frames[0].API.FrameChain.framesStatus[window.frames[0].API.FrameChain.currentFrame - 1] = "complete"} catch(TypeError) {}
                }
            }
        }
    }
    // Auto complete vocab
    function vocabCompleter() {
        if (document.getElementById("AutoCompleteVocabTickbox").checked) {
            if (document.getElementById("activity-title").innerText == "Vocabulary"){
                try {window.frames[0].document.getElementsByClassName("word-textbox")[0].value = window.frames[0].document.getElementsByClassName("word-background")[0].value} catch(TypeError) {}
                try {for (var x of window.frames[0].document.getElementsByClassName("playbutton vocab-play")) {
                    x.click()
                }} catch (TypeError) {}
                try {window.frames[0].document.getElementsByClassName("uibtn uibtn-blue uibtn-arrow-next")[0].click()} catch(TypeError) {}
            }
        }
    }

    //==BEGIN CONFIG==
    function loaditem (item, id) {
        if (localStorage.getItem(item) != null) {
            if (localStorage.getItem(item) == "true") { //Because LocalStorage only stores strings
                document.getElementById(id).checked = true
            } else {
                document.getElementById(id).checked = false
            }
        }
    }
    // Load config
    for (var x of configElements) {
        loaditem(x, x)
    }
    // Sync Config
    function syncConfig() {
        for (var x of configElements) {
            localStorage.setItem(x, document.getElementById(x).checked.toString())
        }
    }
    // Easter Egg
    window.menutitleclicks = 0
    function easteregg() {
        if (window.menutitleclicks < 10) {
            window.menutitleclicks++
            if (window.menutitleclicks == 10) {
                console.log("Easter egg activated")
                var easteregg = document.createElement("img")
                easteregg.src = "https://i.gifer.com/zYw.gif"
                easteregg.style.position = "fixed"
                easteregg.style.bottom = "40px";
                easteregg.style.marginLeft = "80%"
                document.body.appendChild(easteregg)
            }
        }
    }
    document.getElementById("tweaksmenu").firstChild.onclick = easteregg
    // Master loop
    function loop () {
        vocabCompleter()
        autoadvance()
        skipIntro()
        GuessPractice()
        syncConfig()
        showColumn()
        skipVideo()
    }
    window.masterloop = setInterval(loop, 1000);
})();



