console.log("test popup");

// need to make this flag get stored in the chrome cash :(.
var createAdFlag = false;

document.getElementById("create-ad").addEventListener('click',function(){
    chrome.tabs.query({active:true ,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{todo:"create-ad-flip"});
    });
    document.getElementById("finish-ad").style = "visibility: visible;";
    createAdFlag = true;
});

document.getElementById("finish-ad").addEventListener('click', function(){
    chrome.tabs.query({active:true ,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{todo:"create-ad-flip"});
    });
    this.style = "visibility: hidden;";
    createAdFlag = false;
});

(function(){
    if(createAdFlag){
        document.getElementById("finish-ad").style = "visibility: visible;";
    }
    chrome.tabs.query({active:true ,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{todo:"test"});
    });
})();