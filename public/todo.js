var selectedDay = "";

function addItem2(task) {
    var item = document.getElementById('items-listed');
    let checked = task.done ? "checked=true" : "";
    let optionSelected = task.priority == "" ? "" : "<option selected='selected'>" + task.priority + "</option>";
    item.innerHTML += "<li id='" + task.id + "'><div class='wrapper'><div class='left'><input onclick='saveTask(" + task.id + ");' title='Check' type='checkbox' " + checked + ">" + task.title + "</div><div class='right'> <select id='myList' onChange=savePriority(" + task.id + ")> <option value='' disabled selected>Select Priority</option> <option value='high' " + (task.priority == "high" ? "selected" : "") + ">High</option><option value='medium' " + (task.priority == "medium" ? "selected" : "") + ">Medium</option><option value='low' " + (task.priority == "low" ? "selected" : "") + ">Low</option></select><h3 onclick='deleteTask(" + task.id + ");' class='close'>x</h3></div><div class='cleared'></div>" + "</div></li><hr>";
    if (checked != "") {
        var x = [].slice.call(document.querySelectorAll("li[id='" + task.id + "']"));
        x.filter(function (e) {
            updateText(e);
            updateColor(e);
        })
    }
}

function addItem(task) {
    console.log(task.done);
    let checked = task.done ? "checked=true" : "";
    let optionSelected = task.priority == "" ? "" : "<option selected='selected'>" + task.priority + "</option>";
    var item = document.getElementById('items-listed');
    item.innerHTML += "<li id='" + task.id + "'><div class='wrapper'><div class='left'><input onclick='saveTask(" + task.id + ");' title='Check' type='checkbox'" + checked + ">" + task.title + "</div><div class='right'> <select id='myList' onChange=savePriority(" + task.id + ")> <option value='' disabled selected>Select Priority</option> <option value='high' " + (task.priority == "high" ? "selected" : "") + ">High</option><option value='medium' " + (task.priority == "medium" ? "selected" : "") + ">Medium</option><option value='low' " + (task.priority == "low" ? "selected" : "") + ">Low</option></select><h3 onclick='deleteTask(" + task.id + ");' class='close'>x</h3></div><div class='cleared'></div>" + "</div></li><hr>";
    taskJson = {
        id: task.id,
        title: task.title,
        date: task.date,
        done: task.done,
        user: loginData.username,
        priority: ""
    }
    tasklist.push(taskJson);

    localStorage.setItem("tasklist", JSON.stringify(tasklist));
}

function savePriority(id) {
    var x = document.querySelectorAll("li[id='" + id + "']  #myList");
    for (var i = 0; i < tasklist.length; i++) {
        if (tasklist[i].id == id) {
            tasklist[i].priority = x[0].value;
            break;
        }

    }
    updateTask(id, tasklist[i].title, tasklist[i].done, tasklist[i].priority);
}

function saveTask(id) {
    for (var i = 0; i < tasklist.length; i++) {
        if (tasklist[i].id == id) {
            if (tasklist[i].done) {
                tasklist[i].done = "f"
            } else {
                tasklist[i].done = "t"
            }
            break;
        }

    }
    updateTask(id, tasklist[i].title, tasklist[i].done, tasklist[i].priority);
}

function updateColor(el) {
    el.firstChild.firstChild.style.color = el.firstChild.firstChild.firstChild.checked ? "lightgray" : "";
}

function updateText(el) {
    el.firstChild.firstChild.style.textDecoration = el.firstChild.firstChild.firstChild.checked ? "line-through" : "";
}

function showDiv() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// Clears inputfields when task added

function ClearFields() {

    document.getElementById("inputtext").value = "";

}

//Adds items to list by keypress
function searchKeyPress(e) {
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13) {
        document.getElementById('addTaskButton').click();
        return false;
    }
    return true;
}


var Cal = function (divId) {

    //Store div id
    this.divId = divId;

    // Days of week, starting on Sunday
    this.DaysOfWeek = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'

  ];

    // Months, stating on January

    this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Set the current month, year

    var d = new Date();

    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();

};

// Goes to next month

Cal.prototype.nextMonth = function () {
    if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    } else {
        this.currMonth = this.currMonth + 1;
    }

    this.showcurr();

};

// Goes to previous month

Cal.prototype.previousMonth = function () {
    if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    } else {
        this.currMonth = this.currMonth - 1;
    }

    this.showcurr();
};

// Show current month
Cal.prototype.showcurr = function () {
    this.showMonth(this.currYear, this.currMonth);

};

// Show month (year, month)
Cal.prototype.showMonth = function (y, m) {

    var d = new Date()

        // First day of the week in the selected month
        ,
        firstDayOfMonth = new Date(y, m, 1).getDay()

        // Last day of the selected month
        ,
        lastDateOfMonth = new Date(y, m + 1, 0).getDate()

        // Last day of the previous month
        ,
        lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();


    var html = '<table>';

    // Write selected month and year
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';

    // Write the header of the days of the week
    html += '<tr class="days">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';

    }

    html += '</tr>';

    // Write the days  
    var i = 1;
    do {

        var dow = new Date(y, m, i).getDay();

        // If Sunday, start new row
        if (dow == 0) {
            html += '<tr>';
        }

        // If not Sunday but first day of the month
        // it will write the last days from the previous month
        else if (i == 1) {
            html += '<tr>';
            var k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (var j = 0; j < firstDayOfMonth; j++) {
                html += "<td onclick=c.previousMonth(); class='not-current'>" + k + '</td>';
                k++;
            }
        }

        // Write the current day in the loop
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            selectedDay = "" + i;
            selectedDay += this.currMonth;
            selectedDay += this.currYear;
            html += "<td onclick=dayClick(this," + i + "," + this.currMonth + "," + this.currYear + ")  class='today'>" + i + '</td>';

        } else {
            html += "<td onclick=dayClick(this," + i + "," + this.currMonth + "," + this.currYear + ")  class='normal'>" + i + '</td>';
        }
        // If Saturday, closes the row
        if (dow == 6) {
            html += '</tr>';
        }
        // If not Saturday, but last day of the selected month
        // it will write the next few days from the next month
        else if (i == lastDateOfMonth) {
            var k = 1;
            for (dow; dow < 6; dow++) {
                html += "<td onclick=c.nextMonth();  class='not-current'>" + k + '</td>';
                k++;
            }


        }

        i++;
    } while (i <= lastDateOfMonth);

    // Closes table

    html += '</table>';
    // Write HTML to the div

    document.getElementById(this.divId).innerHTML = html;
};

// On Load of the window
var c = new Cal("divCal");
window.onload = function () {

    // Start calendar
    
    c.showcurr();

    // Bind next and previous button clicks

    getId('btnNext').onclick = function () {
        c.nextMonth();
    };
    getId('btnPrev').onclick = function () {
        c.previousMonth();

    };
}

// Get element by id
function getId(id) {
    return document.getElementById(id);
}

// Clears inputfields when task added

function ClearFields() {

    document.getElementById("item").value = "";

}


function dayClick(el, i, k, l) {
    var item = document.getElementById('items-listed');
    var x = [].slice.call(document.querySelectorAll("td.selected"));
    x.filter(function (e) {
        e.className = "normal";
    })
    item.innerHTML = "";
    selectedDay = i < 10 ? "0" + i+"." : "" + i+".";
    selectedDay += k < 9 ? "0" + (k+1)+"." : "" + (k+1)+".";
    selectedDay += l;
    console.log(selectedDay);
    if(el.className!="today"){
       
    el.className = "selected";
       }
    for (i = 0; i < tasklist.length; i++) {
        if (tasklist[i].date == selectedDay) {
            addItem2(tasklist[i]);
        }

    }

}
