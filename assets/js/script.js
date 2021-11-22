//Header Date
var currentDayheader = document.querySelector("#currentDay");
var headerJumbotron = document.querySelector("#head");

currentDayheader.textContent = moment().format("dddd, MMMM Do");
headerJumbotron.appendChild(currentDayheader);


//Tasks time sheet
var mainContainer = document.querySelector("main");
for (let i = 9; i < 18; i++) {
    buildSchedule(i);
}

function buildSchedule(index){
    //local storage check for saved tasks
    var savedtasks = localStorage.getItem(timeset(index)+"tasks");

    var rowContainer = document.createElement("div");
    rowContainer.setAttribute("class", "row w-100 m-auto px-3");
    rowContainer.setAttribute("style", "height:80px; padding-top:3px;")
    
     
    var timeCol = document.createElement("div");
    timeCol.setAttribute("class", "col-1 p-2 px-3 text-right border border-left-0");
    var inputCol = document.createElement("div");
    inputCol.setAttribute("class", "col-9 p-0");
    var submitbutton = document.createElement("button");
    submitbutton.setAttribute("class", "saveBtn col-1");
    submitbutton.setAttribute("type", "submit");
    submitbutton.innerHTML = "<i class='far fa-save'></i>";
    submitbutton.setAttribute("data-id", index);

    var time = document.createElement("p");
    time.setAttribute("class", "col p-0");
    time.textContent = timeset(index);
    var todoinput = document.createElement("input");
    todoinput.setAttribute("class", inputclass(index));
    todoinput.setAttribute("id", index);
    todoinput.value = savedtasks;
    
    
    mainContainer.appendChild(rowContainer);
    rowContainer.appendChild(timeCol);
    rowContainer.appendChild(inputCol);
    rowContainer.appendChild(submitbutton);

    timeCol.appendChild(time);
    inputCol.appendChild(todoinput);


}

function timeset(index){
    returnString = "";
    if(index < 13){
        returnString = index + "am";
        return returnString;
    }else{
        returnString = (index - 12) + "pm";
        return returnString;
    }
}

function inputclass(index){
    realTime = moment().hour() - 5;
    if(index < realTime){
        return "past w-100 h-100 p-0";
    }else if(index == realTime){
        return "present w-100 h-100 p-0 ";
    }else{
        return "future w-100 h-100 p-0";
    } 
}
console.log(realTime);
//saving to local storage when save button is clicked
mainContainer.addEventListener("click", function(event){
    var element = event.target;
    //only saves to local storage if the button with type submit is pressed
    if(element.type == "submit"){
    var searchid = element.getAttribute("data-id");
    var textToSaveLocally = document.getElementById(searchid).value;
    localStorage.setItem(timeset(searchid)+"tasks", textToSaveLocally);
    console.log(localStorage);
    }
})

