console.log("test popup");

(function(){
    chrome.tabs.query({active:true ,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{todo:"test"});
    });
})();