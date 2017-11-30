var selectedDay = "";

function addItem2(task) {
    var item = document.getElementById('items-listed');
    let checked = task.done ? "checked=true" : "";
    let optionSelected = task.priority == "" ? "" : "<option selected='selected'>" + task.priority + "</option>";
    item.innerHTML += "<li id='" + task.id + "'><div class='wrapper'><div class='left'><input onclick='saveTask(" + task.id + ");' title='Check' type='checkbox' " + checked + ">" + task.title + "</div><div class='right'> <select id='myList' onChange=savePriority(" + task.id + ")> <option value='' disabled selected>Select Priority</option> <option value='High' " + (task.priority == "High" ? "selected" : "") + ">High</option><option value='Medium' " + (task.priority == "Medium" ? "selected" : "") + ">Medium</option><option value='Low' " + (task.priority == "Low" ? "selected" : "") + ">Low</option></select><h3 onclick='deleteTask(" + task.id + ");' class='close'>x</h3></div><div class='cleared'></div>" + "</div></li><hr>";
    if (checked != "") {
        var x = [].slice.call(document.querySelectorAll("li[id='" + task.id + "']"));
        x.filter(function (e) {
            updateText(e);
            updateColor(e);
        })
    }
}

function addItem(task) {
    let checked = task.done ? "checked=true" : "";
    let optionSelected = task.priority == "" ? "" : "<option selected='selected'>" + task.priority + "</option>";
    var item = document.getElementById('items-listed');
    item.innerHTML += "<li id='" + task.id + "'><div class='wrapper'><div class='left'><input onclick='saveTask(" + task.id + ");' title='Check' type='checkbox'" + checked + ">" + task.title + "</div><div class='right'> <select id='myList' onChange=savePriority(" + task.id + ")> <option value='' disabled selected>Select Priority</option> <option value='High' " + (task.priority == "High" ? "selected" : "") + ">High</option><option value='Medium' " + (task.priority == "Medium" ? "selected" : "") + ">Medium</option><option value='Low' " + (task.priority == "Low" ? "selected" : "") + ">Low</option></select><h3 onclick='deleteTask(" + task.id + ");' class='close'>x</h3></div><div class='cleared'></div>" + "</div></li><hr>";
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


function ClearFields() {
    document.getElementById("inputtext").value = "";

}

function searchKeyPress(e) {
    e = e || window.event;
    if (e.keyCode == 13) {
        document.getElementById('addTaskButton').click();
        return false;
    }
    return true;
}


var Cal = function (divId) {

    this.divId = divId;

    this.DaysOfWeek = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'

  ];


    this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var d = new Date();

    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();

};


Cal.prototype.nextMonth = function () {
    if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    } else {
        this.currMonth = this.currMonth + 1;
    }

    this.showcurr();

};


Cal.prototype.previousMonth = function () {
    if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    } else {
        this.currMonth = this.currMonth - 1;
    }

    this.showcurr();
};

Cal.prototype.showcurr = function () {
    this.showMonth(this.currYear, this.currMonth);

};

Cal.prototype.showMonth = function (y, m) {

    var d = new Date()

        ,
        firstDayOfMonth = new Date(y, m, 1).getDay()

        ,
        lastDateOfMonth = new Date(y, m + 1, 0).getDate()

        ,
        lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();


    var html = '<table>';

    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';

    html += '<tr class="days">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';

    }

    html += '</tr>';

    var i = 1;
    do {

        var dow = new Date(y, m, i).getDay();

        if (dow == 0) {
            html += '<tr>';
        }

        else if (i == 1) {
            html += '<tr>';
            var k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (var j = 0; j < firstDayOfMonth; j++) {
                html += "<td onclick=c.previousMonth(); class='not-current'>" + k + '</td>';
                k++;
            }
        }

        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            selectedDay = i < 10 ? "0" + i + "." : "" + i + ".";
            selectedDay += this.currMonth < 9 ? "0" + (this.currMonth + 1) + "." : "" + (this.currMonth + 1) + ".";
            selectedDay += this.currYear;

            html += "<td onclick=dayClick(this," + i + "," + this.currMonth + "," + this.currYear + ")  class='today'>" + i + '</td>';


        } else {
            html += "<td onclick=dayClick(this," + i + "," + this.currMonth + "," + this.currYear + ")  class='normal'>" + i + '</td>';
        }
        if (dow == 6) {
            html += '</tr>';
        }
        else if (i == lastDateOfMonth) {
            var k = 1;
            for (dow; dow < 6; dow++) {
                html += "<td onclick=c.nextMonth();  class='not-current'>" + k + '</td>';
                k++;
            }


        }

        i++;
    } while (i <= lastDateOfMonth);


    html += '</table>';

    document.getElementById(this.divId).innerHTML = html;
};

var c = new Cal("divCal");
window.onload = function () {


    c.showcurr();


    getId('btnNext').onclick = function () {
        c.nextMonth();
    };
    getId('btnPrev').onclick = function () {
        c.previousMonth();

    };
}

function getId(id) {
    return document.getElementById(id);
}


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
    selectedDay = i < 10 ? "0" + i + "." : "" + i + ".";
    selectedDay += k < 9 ? "0" + (k + 1) + "." : "" + (k + 1) + ".";
    selectedDay += l;
    console.log(selectedDay);
    if (el.className != "today") {

        el.className = "selected";
    }
    for (i = 0; i < tasklist.length; i++) {
        if (tasklist[i].date == selectedDay) {
            addItem2(tasklist[i]);
        }

    }

}
