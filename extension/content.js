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

(async function run(){
    //console.log("run test");
    var video = document.getElementsByClassName("video-stream")[0];
    // console.log(video);
    //console.log(video.currentTime);
    // var response = await makePostRequest({user: "matt", pass:"password", url:"bnMMYJKZvnU", adTimes: [109,213]}, 'timestamp-create/');
    //console.log(response);
    // await makePostRequest({}, 'print/');
    // adTimes will be formatted differently later.
    var times = (await makePostRequest({user: "matt", pass:"password", url:"bnMMYJKZvnU"}, 'timestamp-get/')).adTimes[0];
    var progressList = document.getElementsByClassName("ytp-progress-list")[0];
    var adStampDiv = document.createElement("div");
    adStampDiv.className = "ytp-play-progress ytp-swatch-background-color";
    adStampDiv.style = "background-color: blue; left: " + 100*(times[0]/video.duration) + "%; transform: scaleX(" + (times[1]-times[0])/video.duration + ");";
    progressList.appendChild(adStampDiv);
    while(true){
        console.log("current time: " + video.currentTime);
        console.log(times[0]);
        console.log(times[1]);
        console.log(video.currentTime >= times[0]);
        console.log(video.currentTime < times[1]);
        if(video.currentTime >= times[0] && video.currentTime < times[1]){
            video.currentTime = times[1];
        }
        await sleep(500);
    }
})();

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.todo == "test"){
        console.log("test message");
        var video = document.getElementsByClassName("video-stream")[0];
        video.currentTime = 50;
    }
});