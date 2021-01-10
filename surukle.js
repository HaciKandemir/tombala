function dragstart_handler(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.effectAllowed = "copy"; 
}
   
function drop_handler(ev) {
    ev.preventDefault();
    var id = ev.dataTransfer.getData("text");
    //var test = ev.target.closest("div > div");
    var test = ev.target.closest("div[class=card]");
    if (id==ev.target.textContent) {
       var clone = document.getElementById(id).cloneNode(true)
       clone.setAttribute("number",clone.id)
       clone.removeAttribute("ondragstart")
       clone.removeAttribute("draggable")
       clone.removeAttribute("id")
       ev.target.removeAttribute("ondragover")
       ev.target.removeAttribute("ondrop")
       ev.target.innerHTML=""
       ev.target.appendChild(clone);
       cardsMissingNumberCount[test.id]--
        if((cardsMissingNumberCount[test.id])<=0){
            // tombala.js dosyasında
            win()
        }
    }
    ev.dataTransfer.clearData();
}
   
function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy"
}
