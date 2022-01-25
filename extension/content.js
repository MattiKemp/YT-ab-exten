chrome.runtime.sendMessage({todo:"showPageAction"});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function makePostRequest(data, endPoint){
    const otherParam={
      //mode: 'cors',
      //credentials: 'same-origin',
      //headers:{
      //  "content-type":"application/json; charset=UTF-8"
      //},
      body: JSON.stringify(data),
      method: "POST"
    };
    const response = await fetch("https://www.workoutdev.org:9000/" + endPoint,otherParam)
    const content = await response.json();
    console.log(content);
    return content;
}

var createAdFlag = false;

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.todo == "create-ad-flip"){
        console.log("create ad flip recieved");
        createAdFlag = !createAdFlag;
    }
});

(async function run(){
    //console.log("run test");
    var video = document.getElementsByClassName("video-stream")[0];
    // console.log(video);
    //console.log(video.currentTime);
    var response = await makePostRequest({user: "matt", pass:"password", url:"bnMMYJKZvnU", adTimes: [109.5,213.5]}, 'timestamp-create/');
    //console.log(response);
    // await makePostRequest({}, 'print/');
    // adTimes will be formatted differently later.
    var times = (await makePostRequest({user: "matt", pass:"password", url:"bnMMYJKZvnU"}, 'timestamp-get/')).adTimes[0];
    var progressList = document.getElementsByClassName("ytp-progress-list")[0];
    var adStampDiv = document.createElement("div");
    adStampDiv.className = "ytp-play-progress ytp-swatch-background-color";
    adStampDiv.style = "background-color: Aqua; left: " + 100*(times[0]/video.duration) + "%; transform: scaleX(" + (times[1]-times[0])/video.duration + ");";
    progressList.appendChild(adStampDiv);
    document.getElementsByClassName("ytp-progress-bar-container")[0].addEventListener('mousedown', function(){
        console.log('clicked down');
    })
    var xCoordFirst = 0;
    var yCoordFirst = 0;
    var xCoordSecond = 0;
    var yCoordSecond = 0;
    var timeStampFlag = false;
    document.getElementsByClassName("ytp-progress-bar-container")[0].addEventListener('mouseup', function(event){
        if(createAdFlag == true){
            console.log('clicked up');
            if(timeStampFlag == false){
                var rect = document.getElementsByClassName("ytp-progress-bar-container")[0].getBoundingClientRect();
                xCoordFirst = event.pageX - 12;
                yCoordFirst = event.pageY;
                var adStampScrubberCont = document.createElement("div");
                adStampScrubberCont.className = "ytp-scrubber-container";
                adStampScrubberCont.style="transform: translateX(" + xCoordFirst + "px);";  
                var adStampScrubberButton = document.createElement("div");
                adStampScrubberButton.className = "ytp-scrubber-button ytp-swatch-background-color";
                adStampScrubberButton.style = "height: 13px; background-color: Aqua;";
                adStampScrubberCont.appendChild(adStampScrubberButton);
                document.getElementsByClassName("ytp-progress-bar-container")[0].appendChild(adStampScrubberCont);
                timeStampFlag = true;
            }
            else{
                var rect = document.getElementsByClassName("ytp-progress-bar-container")[0].getBoundingClientRect();
                xCoordSecond = event.pageX - 12;
                yCoordSecond = event.pageY;
                var adStampScrubberCont = document.createElement("div");
                adStampScrubberCont.className = "ytp-scrubber-container";
                adStampScrubberCont.style="transform: translateX(" + xCoordSecond + "px);";  
                var adStampScrubberButton = document.createElement("div");
                adStampScrubberButton.className = "ytp-scrubber-button ytp-swatch-background-color";
                adStampScrubberButton.style = "height: 13px; background-color: Aqua;";
                adStampScrubberCont.appendChild(adStampScrubberButton);
                document.getElementsByClassName("ytp-progress-bar-container")[0].appendChild(adStampScrubberCont);
                adStampDiv = document.createElement("div");
                adStampDiv.className = "ytp-play-progress ytp-swatch-background-color";
                adStampDiv.style = "background-color: Aqua; left: " + (xCoordFirst <= xCoordSecond ? xCoordFirst : xCoordSecond) + "px; transform: scaleX(" + (Math.abs(xCoordSecond - xCoordFirst)/(rect.right - rect.left)) + ");";
                progressList.appendChild(adStampDiv);
                timeStampFlag = false;
            }
        }
    })
    
    while(true){
        // console.log("current time: " + video.currentTime);
        // console.log(times[0]);
        // console.log(times[1]);
        // console.log(video.currentTime >= times[0]);
        // console.log(video.currentTime < times[1]);
        if(video.currentTime >= times[0] && video.currentTime < times[1]){
            video.currentTime = times[1];
        }
        await sleep(125);
    }
})();

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.todo == "test"){
        console.log("test message");
        var video = document.getElementsByClassName("video-stream")[0];
        video.currentTime = 50;
    }
});