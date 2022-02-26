let optionCont = document.querySelector(".options-cont");
let toolsCont = document.querySelector(".tools-cont");
let pencilToolCont = document.querySelector(".pencil-tool");
let eraserToolCont = document.querySelector(".eraser-tool");

let StickYNotes = document.querySelector(".StickYNotes");

let upload = document.querySelector(".upload");

let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
//intial tools are closed
pencilToolCont.style.display = "none";
eraserToolCont.style.display = "none";


let optionFlag = true;
let pencilFlag = false;
let eraserFlag = false;

optionCont.addEventListener("click", (e) => {
    optionFlag = !optionFlag;
    if (optionFlag) {
        openTools();
    } else {
        closeTools();
    }
})

function openTools() {
    let iconElem = optionCont.children[0];
    iconElem.classList.remove("fa-times");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "flex";

}

function closeTools() {
    let iconElem = optionCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-times");
    toolsCont.style.display = "none";
    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}

pencil.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag;
    if (pencilFlag) {
        pencilToolCont.style.display = "block";
    } else {
        pencilToolCont.style.display = "none";
    }
})

eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;
    if (eraserFlag) {
        eraserToolCont.style.display = "flex";
    } else {
        eraserToolCont.style.display = "none";
    }
})

//For Upload functionalities
upload.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyElem = document.createElement("div");
        stickyElem.setAttribute("class", "sticky");
        stickyElem.innerHTML = `<div class="header-cont">
                                <div class="minimize"></div>
                                <div class="remove"></div>
                            </div>
                            <div class="note-cont">
                                <img src ="${url}"/>
                            </div>`;
        document.body.appendChild(stickyElem);
        let minimize = document.querySelector(".minimize");
        let remove = document.querySelector(".remove");
        noteAction(stickyElem, minimize, remove);

        //For DragAndDrop Functionlity 
        stickyElem.onmousedown = function (event) {

            let shiftX = event.clientX - stickyElem.getBoundingClientRect().left;
            let shiftY = event.clientY - stickyElem.getBoundingClientRect().top;

            stickyElem.style.position = 'absolute';
            stickyElem.style.zIndex = 1000;
            document.body.append(stickyElem);

            moveAt(event.pageX, event.pageY);

            // moves the stickyElem at (pageX, pageY) coordinates
            // taking initial shifts into account
            function moveAt(pageX, pageY) {
                stickyElem.style.left = pageX - shiftX + 'px';
                stickyElem.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // move the stickyElem on mousemove
            document.addEventListener('mousemove', onMouseMove);

            // drop the stickyElem, remove unneeded handlers
            stickyElem.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                stickyElem.onmouseup = null;
            };

        };

        stickyElem.ondragstart = function () {
            return false;
        };
    })
    //For other stickynotes functionalities
    function noteAction(stickyElem, minimize, remove) {
        remove.addEventListener("click", (e) => {
            stickyElem.remove();
        })
        minimize.addEventListener("click", (e) => {
            let noteCont = stickyElem.querySelector(".note-cont");
            let display = getComputedStyle(noteCont).getPropertyValue("display");
            if (display == "none") {
                noteCont.style.display = "block";
            } else {
                noteCont.style.display = "none";
            }
        })
    }

})



//Sticky Functionalites

StickYNotes.addEventListener("click", (e) => {
    let stickyElem = document.createElement("div");
    stickyElem.setAttribute("class", "sticky");
    stickyElem.innerHTML = `<div class="header-cont">
                                <div class="minimize"></div>
                                <div class="remove"></div>
                            </div>
                            <div class="note-cont">
                                <textarea></textarea>
                            </div>`;
    document.body.appendChild(stickyElem);
    let minimize = document.querySelector(".minimize");
    let remove = document.querySelector(".remove");
    noteAction(stickyElem, minimize, remove);

    //For DragAndDrop Functionlity 
    stickyElem.onmousedown = function (event) {

        let shiftX = event.clientX - stickyElem.getBoundingClientRect().left;
        let shiftY = event.clientY - stickyElem.getBoundingClientRect().top;

        stickyElem.style.position = 'absolute';
        stickyElem.style.zIndex = 1000;
        document.body.append(stickyElem);

        moveAt(event.pageX, event.pageY);

        // moves the stickyElem at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
            stickyElem.style.left = pageX - shiftX + 'px';
            stickyElem.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // move the stickyElem on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // drop the stickyElem, remove unneeded handlers
        stickyElem.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            stickyElem.onmouseup = null;
        };

    };

    stickyElem.ondragstart = function () {
        return false;
    };
})
//For other stickynotes functionalities
function noteAction(stickyElem, minimize, remove) {
    remove.addEventListener("click", (e) => {
        stickyElem.remove();
    })
    minimize.addEventListener("click", (e) => {
        let noteCont = stickyElem.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display == "none") {
            noteCont.style.display = "block";
        } else {
            noteCont.style.display = "none";
        }
    })
}


