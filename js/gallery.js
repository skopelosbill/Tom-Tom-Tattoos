
 /* Line 3 gets the gallery foldername from the div class="nodisplay" on each gallery html page, this is vitally important as it allows the gallery.js to support multiple gallery pages, in the case of Tom Tom Tattoos we have 5 gallery pages. Line 4 checks for the class "gallery-img" which is where an a tag holds the name of each image */
let folderName = document.getElementById("foldername").innerHTML;
let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;
let nextWidth = 0;

/* imageNames is an array which will hold the names of all the images covered by gallery-img.  This is important because it allows us to use real names for images rather than img1 etc */
let imageNames=[]
/* the if else if else statements set the position of the next an previous arrows in the display for responsive design.  It is planned to change this to js media queries in the fullness of time */
if (windowWidth < 450) {
    nextWidth += 32; 
} else if (windowWidth < 810) {
    nextWidth += 29;
} else if (windowWidth < 1050) {
    nextWidth += 37;
} else if (windowWidth < 1100) {
    nextWidth += 51;
} else if (windowWidth < 1160) {
    nextWidth += 42;
} else {
    nextWidth += 48;
}
/* the if statements in lines 26 - 34 allow the names to be collected to populate the array imageNames.  I don't think the second if statement is necessary and plan to take it out. thumbSrc is the name of the image in the gallery-img a tag and the new text variable uses string methods to globally replace spaces and replace them with - in the image names.  The names are then pushed into imageNames */
if (galleryImages) {
    galleryImages.forEach(function(image) {
        let thumbSrc = image.querySelector('a').innerHTML;
        if (thumbSrc) {
            let newText = thumbSrc.replace(/ /g, "-");
            imageNames.push(newText);
        }
    });
}      



/* lines 39 to 46 control the getting of the first image, onclick refers to the clicking on a thumbnail image.  This does not use the array imageNames, but I feel sure it could.  At the moment though, this uses the appropriate gallery.css file to extract the url of the clicked image.  The full url is obtained and then split to leave just name-thumb.jpg and then -thumb is stripped out to leave name.jpg which is the name of the full size image in the appropriate gallery */
if (galleryImages) {
    galleryImages.forEach(function(image, index) {
            image.onclick = function() {
            let getElementCss = window.getComputedStyle(image);
            let getFullImgUrl = getElementCss.getPropertyValue("background-image");
            let getImgUrlPos = getFullImgUrl.split("/assets/" + folderName + "/thumbs/");//Careful
            let setNewImgUrl = getImgUrlPos[1].replace('-thumb.jpg")', '.jpg');
            getLatestOpenedImg = index + 1;
/* Lines 48 to 52 control the opening of a new image window and set attributes for it */
            let fullImgContainer = document.body;
            let newImgWindow = document.createElement("div");
            fullImgContainer.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");
            newImgWindow.setAttribute("onclick", "closeImg()");
/* lines 54 to 57 give the source of the new image, setting it to assets/gallery-name/name.jpg */
            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "assets/" + folderName + "/" + setNewImgUrl);//careful
            newImg.setAttribute("id", "current-img");
/* remember that lines 39 to 57 control only the getting of the first image after a thumbnail has been clicked */           
           
/* Lines 61 - 64 use the if statements starting on line 12 to work out the distance to the left and right edges of the device screen */           
            newImg.onload = function() {
                let imgWidth = this.width;
                let calcImgToLeftEdge = ((windowWidth - imgWidth) / 2) - 38;
                let calcImgToRightEdge = ((windowWidth - imgWidth) / 2 ) - nextWidth;
/* lines 66 to 72 create an a tag to hold the next button, '>', give it attributes as set on the gallery css page, refer it to the function changeImg(1) when it is clicked and position it in the appropriate place */                
                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode(">");
                newNextBtn.appendChild(btnNextText);
                fullImgContainer.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)");
                newNextBtn.style.cssText = "right: " + calcImgToRightEdge + "px;";
/* Lines 74 to 80 do exactly the same for the previous '<' button */                
                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("<");
                newPrevBtn.appendChild(btnPrevText);
                fullImgContainer.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");
                newPrevBtn.style.cssText = "left: " + calcImgToLeftEdge + "px;";
                
/* Line 83 to 88 create the line of text advising the user to click to return to the website.  This has just been done as a p tag and in reality clicking anywhere except on the next or previous button will return the user to the website.  This group of lines does exactly the same as the lines for next and previous */
                let backToWebsite = document.createElement("p");
                let backToWebsiteText = document.createTextNode("click to return to the website");
                backToWebsite.appendChild(backToWebsiteText);
                fullImgContainer.appendChild(backToWebsite);
                backToWebsite.setAttribute("class", "img-closer");
                backToWebsite.setAttribute("onclick", "closeImg()");
            }
            
        }
    });
}
/* the brackets above finally close the if statement which started on line 39 and at this stage the full size image is on display and the next and previous arrows along with the closer text are all displayed and waiting for the user to click one of them. */

/* the function on lines 97 to 101 return the user to the website when the closer is clicked */ 
function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
    document.querySelector(".img-closer").remove();
}
/* the function on lines 104 to 142 concern the loading of a new image when next or previous are clicked, lines 105 to 111 control what happens when next is clicked, 112 to 117 when previous is clicked.  In both cases we go over the end of the gallery we circulate so the user can click on indefinitely */
function changeImg(changeDir) {
    let calcNewImg;
    if (changeDir === 1) {
        calcNewImg = getLatestOpenedImg + 1;
        if (calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    } 
    else if ((changeDir === 0)) {
        calcNewImg = getLatestOpenedImg - 1;
        if (calcNewImg < 1) {
            calcNewImg =  galleryImages.length;
        }
    }
/* lines 118 to 125 use the array imageNames to find the next image.  The next image is set as imageNames[calcNewImg-1] taking into account that the array is numbered from zero, the existing image is removed (but not the arrows or text) a new image window is created, the new image src is constructed and the new image is displayed */
    let nextImg = imageNames[calcNewImg-1];
    document.querySelector("#current-img").remove();
    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);
    newImg.setAttribute("src", "assets/" + folderName + "/" + nextImg + ".jpg");//careful
    newImg.setAttribute("id", "current-img");
/* I think I can get rid of line 127 but as it is doing no harm I am leaving it in place for the time being */    
    getLatestOpenedImg = calcNewImg;
/* Lines 128 to 132 calculate the correct placing of the arrows */
    newImg.onload = function() {
        let imgWidth = this.width;
        let calcImgToLeftEdge = ((windowWidth - imgWidth) / 2) - 38;
        let calcImgToRightEdge = ((windowWidth - imgWidth) / 2) - nextWidth;
/* lines 134 to 142 position the arrows correctly and close the function opened on line 104 */
        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.setAttribute("class", "img-btn-next");
        nextBtn.style.cssText = "right: " + calcImgToRightEdge + "px;";

        let prevBtn = document.querySelector(".img-btn-prev");
        prevBtn.setAttribute("class", "img-btn-prev");
        prevBtn.style.cssText = "left: " + calcImgToLeftEdge + "px;"; 
    }
}




