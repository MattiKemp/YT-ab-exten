//really need to clean up this code here, a lot of easy optimizations can
//be made
var checkboxs = [];
for(var i = 0; i < 5;i++){
    var div = document.createElement('div');
    div.appendChild(document.createElement('input'));
    div.children[0].type="checkbox";
    checkboxs.push(div);
}
// set ids
checkboxs[0].children[0].id="TopBar";
checkboxs[1].children[0].id="BottomBar";
checkboxs[2].children[0].id="Enlarge";
checkboxs[3].children[0].id="SideBar";
checkboxs[4].children[0].id="Title";
// set labels
checkboxs[0].innerHTML += "Remove Top Bar";
checkboxs[1].innerHTML += "Remove Bottom Bar";
checkboxs[2].innerHTML += "Enlarge Previews";
checkboxs[3].innerHTML += "Minimize Side Bar (WIP)";
checkboxs[4].innerHTML += "Remove Redundant Title";
//create options
var options = document.createElement('h1');
options.innerText = "Options:";

//setup click listeners
//this is disgusting, please fix later
checkboxs[0].children[0].addEventListener('click', function(){
    update(checkboxs[0].children[0].id,checkboxs[0].children[0].checked)});
checkboxs[1].children[0].addEventListener('click', function(){
    update(checkboxs[1].children[0].id,checkboxs[1].children[0].checked)});
checkboxs[2].children[0].addEventListener('click', function(){
    update(checkboxs[2].children[0].id,checkboxs[2].children[0].checked)});
checkboxs[3].children[0].addEventListener('click', function(){
    update(checkboxs[3].children[0].id,checkboxs[3].children[0].checked)});
checkboxs[4].children[0].addEventListener('click', function(){
    update(checkboxs[4].children[0].id,checkboxs[4].children[0].checked)});

//set proper saved check values for each checkbox
chrome.storage.sync.get('preferences', function(result){
    checkboxs[0].children[0].checked = result.preferences['TopBar'];
    checkboxs[1].children[0].checked = result.preferences['BottomBar'];
    checkboxs[2].children[0].checked = result.preferences['Enlarge'];
    checkboxs[3].children[0].checked = result.preferences['SideBar'];
    checkboxs[4].children[0].checked = result.preferences['Title'];
    document.getElementById('Off').checked = result.preferences['Off'];
    document.getElementById('Default').checked = result.preferences['Default'];
    //this is gross to fix this later, redundant code
    if(document.getElementById('Default').checked==false){
        document.getElementsByClassName('checkboxs')[0].appendChild(options);
        for(var i = 0; i < checkboxs.length; i++){
            document.getElementsByClassName('checkboxs')[0].appendChild(checkboxs[i]);
        }
    }
});

//this is bad code too :()
(function(){
    chrome.tabs.query({active:true ,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{todo:"changeColor"});
    });
    //setup click listeners
    document.getElementById('Off').addEventListener('click', function(){
        if(!document.getElementById('Off').checked){
            update('Off',false);
        }
        else{
            update('Off', true);
        }
    });
    document.getElementById('Default').addEventListener('click', function(){
        if(!document.getElementById('Default').checked){
            document.getElementsByClassName('checkboxs')[0].appendChild(options);
            for(var i = 0; i < checkboxs.length; i++){
                document.getElementsByClassName('checkboxs')[0].appendChild(checkboxs[i]);
            }
            update('Default',false);
        }
        else{
            var boxs = document.getElementsByClassName('checkboxs')[0];
            for(var i = boxs.children.length; i > 2; i--){
                boxs.removeChild(boxs.children[i-1]);
            }
            update('Default', true);
        }
    });
})();

function update(key,value){
    chrome.storage.sync.get('preferences', function(result){
        if(key in result.preferences){
            result.preferences[key] = value;
            chrome.storage.sync.set({'preferences':result.preferences});
        }
    });
};