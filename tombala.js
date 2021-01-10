var createdCard = 0;
var number1to90 = [];
for (var i = 1; i <= 90; i++) {
    number1to90[i-1]=i;
}
var torbadaki = [...number1to90];
var usedNumbers = []
var cardsMissingNumberCount = {}

function arrayLog(array){
    array.forEach(function(value, i){
        console.log('%d: %s', i, value);
    });
}

function getRandomNumberIndex(maxNumber){
    // 0 dahil
    return Math.floor(Math.random()*(maxNumber));
}

function getRandomColor(){
    var makeColorCode = '0123456789ABCDEF';
      var code = '#';
      for (var count = 0; count < 6; count++) {
        code =code+ makeColorCode[Math.floor(Math.random() * 16)];
      }
      return code;
}

function createCard(){
    let color = getRandomColor();
    let copyArray = [...number1to90];
    let copyArrayLength = copyArray.length;
    var content = document.getElementById('cards');
    var div = document.createElement('div');
    div.className = "card";
    div.id= "card_id_"+createdCard;
    createdCard ++;
    cardsMissingNumberCount[div.id]=15
    var table = document.createElement('table');
    table.style.borderColor=color;
    var tbody = document.createElement('tbody');
    // 1 ile 2 arasında {1,2}
    let karar = Math.ceil(Math.random()*2); 
    for (let i = 0; i < 3; i++) {
        if(i==1){
            temp = karar+1;
        }else if(i==2){
            temp = karar+2;
        }else{
            temp = karar;
        }
        let kutuAdet = 4;

        var tr = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            var td = document.createElement('td');
            if(karar==1 && j==7 && i==0){
                temp = temp +1;
            }
            if((j==temp|| (i==1&&j==0) || (i==2 && j==1))&& kutuAdet>0){
                td.className = "kapali";
                td.style.backgroundColor=color;
                kutuAdet--;
                if(!(i==1 && j==0) && !(i==2 && j==1)){
                    temp = temp + 2;
                }
            }else{
                let numberIndex = getRandomNumberIndex(copyArrayLength);
                let tempNumber = copyArray[numberIndex];
                copyArray.splice(numberIndex,1);
                copyArrayLength--;
                //td.id= tempNumber
                td.setAttribute("ondragover", "dragover_handler(event);")//onDragOver(event);
                td.setAttribute("ondrop", "drop_handler(event);")//onDrop(event);
                td.textContent=tempNumber
                //td.appendChild(document.createTextNode(tempNumber));
                //td.className = tempNumber;	
            }
            
            
            tr.appendChild(td);				
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    div.appendChild(table);
    content.appendChild(div);
}

function sayiCek(){
    if(torbadaki.length>0){
        let index = getRandomNumberIndex(torbadaki.length)
        let sayi = torbadaki[index]
        usedNumbers.push(sayi)
        torbadaki.splice(index,1)
        tasOlustur(sayi)
        appendHistory(sayi)
    }
}
function tasOlustur(sayi){
    let torba = document.getElementById('torba')
    torba.innerHTML=''
    let circleDiv = document.createElement('div');
    circleDiv.classList.add("circle");
    circleDiv.id=sayi;
    circleDiv.setAttribute("draggable",true)
    circleDiv.setAttribute("ondragstart","dragstart_handler(event);")//onDragStart(event);
    circleDiv.textContent=sayi;
    torba.appendChild(circleDiv)
}
function appendHistory(sayi){
    let history = document.getElementById('taslar')
    let circleDiv = document.createElement('div');
    circleDiv.className="circle";
    circleDiv.textContent=sayi;
    history.appendChild(circleDiv)
}

function win(){
    alert("Tebrikler")
}