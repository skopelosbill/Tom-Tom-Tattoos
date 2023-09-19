let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;
alert(windowWidth)
let folderName = document.getElementById("foldername").innerHTML;
let nextWidth = 0;
if (windowWidth < 820) {
    nextWidth += 28; 
} else if (windowWidth <= 1200) {
    nextWidth += 38;
} else {
    nextWidth += 48;
}


if (galleryImages) {
    galleryImages.forEach(function(image, index) {
        image.onclick = function() {
            let getElementCss = window.getComputedStyle(image);
            let getFullImgUrl = getElementCss.getPropertyValue("background-image");
            let getImgUrlPos = getFullImgUrl.split("/assets/" + folderName + "/thumbs/");//Careful
            let setNewImgUrl = getImgUrlPos[1].replace('")', '');
            getLatestOpenedImg = index + 1;

            let fullImgContainer = document.body;
            let newImgWindow = document.createElement("div");
            fullImgContainer.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");
            newImgWindow.setAttribute("onclick", "closeImg()");

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "assets/" + folderName + "/" + setNewImgUrl);//careful
            newImg.setAttribute("id", "current-img");
           
            newImg.onload = function() {
                let imgWidth = this.width;
                let calcImgToLeftEdge = ((windowWidth - imgWidth) / 2) - 38;
                let calcImgToRightEdge = ((windowWidth - imgWidth) / 2 ) - nextWidth;
                
                let newNextBtn = document.createElement("a");
                let btnNextText = document.createTextNode(">");
                newNextBtn.appendChild(btnNextText);
                fullImgContainer.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)");
                newNextBtn.style.cssText = "right: " + calcImgToRightEdge + "px;";
                
                let newPrevBtn = document.createElement("a");
                let btnPrevText = document.createTextNode("<");
                newPrevBtn.appendChild(btnPrevText);
                fullImgContainer.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)");
                newPrevBtn.style.cssText = "left: " + calcImgToLeftEdge + "px;";

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

function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
    document.querySelector(".img-closer").remove();
}

function changeImg(changeDir) {
    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);
  
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
    
    newImg.setAttribute("src", "assets/" + folderName + "/img" + calcNewImg + ".jpg");//careful
    newImg.setAttribute("id", "current-img");
    
    getLatestOpenedImg = calcNewImg;

    newImg.onload = function() {
        let imgWidth = this.width;
        let calcImgToLeftEdge = ((windowWidth - imgWidth) / 2) - 38;
        let calcImgToRightEdge = ((windowWidth - imgWidth) / 2) - nextWidth;

        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.setAttribute("class", "img-btn-next");
        nextBtn.style.cssText = "right: " + calcImgToRightEdge + "px;";

        let prevBtn = document.querySelector(".img-btn-prev");
        prevBtn.setAttribute("class", "img-btn-prev");
        prevBtn.style.cssText = "left: " + calcImgToLeftEdge + "px;"; 
    }
}