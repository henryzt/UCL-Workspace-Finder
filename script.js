var green = "linear-gradient(to right, #dce35b, #45b649)"
var darkGreen = "linear-gradient(to right, #3EC6B1, #0B86E0)"
var orange = "linear-gradient(to right, #FED524, #F95A57)"
var red = "linear-gradient(to right, #FF7500,#DC033A)"

var workspaceData = null;

var stuCen = new progressBar();
var sciLib = new progressBar();
var mainLib = new progressBar();
var ioe = new progressBar();
stuCen.create("sc", "Student Centre")
sciLib.create("sl", "Science Library")
mainLib.create("ml", "Main Library")
ioe.create("ioe", "Institue of Education")

// setTimeout(delay, 1200);
// function delay() {
//     stuCen.updateContent(Math.random()*100)
//     sciLib.updateContent(Math.random()*100)
//     mainLib.updateContent(Math.random()*100)
//     ioe.updateContent(Math.random()*100)
// }


function processData(){
    if(workspaceData.ok == true){
        workspaceData.surveys.forEach(element => {
            switch(element.id){
                case 58:
                    stuCen.updateContent(getPercentage(element))
                    break;
                case 19:
                    sciLib.updateContent(getPercentage(element))
                    break;
                case 38:
                    mainLib.updateContent(getPercentage(element))
                    break;
                case 46:
                    ioe.updateContent(getPercentage(element))
                    break;
            }
        });
    }
}

function getPercentage(survey){
    return survey.sensors_occupied / (survey.sensors_occupied + survey.sensors_absent)
}

/*
Example Div:
    <div class="progress-wrapper">
        <div class="progress" id="sc">
            Student Center
        </div>
        <div class="indicator">Very Busy</div>
    </div>
*/

function progressBar(){
    this.color = "";
    this.id = "";
    this.wrapper = null;
    this.placeName = "";
    this.create = function(id, name){
        var iDiv = document.createElement('div');
        this.id = id;
        this.placeName = name;
        this.wrapper = iDiv;
        this.wrapper.className = 'progress-wrapper progress-loading';
        this.updateContent()
        document.getElementById('overview').appendChild(this.wrapper);
    }
    this.updateContent = function(percentage){
        this.wrapper.innerHTML = "";
        var progress = document.createElement('div');
        progress.id = this.id;
        progress.innerHTML = this.placeName;
        progress.className = 'progress';
        var indicater = document.createElement('div');
        indicater.className = "indicator"
        if(percentage){
            if(percentage > 20){
                if(percentage > 50){
                    if(percentage > 80){
                        indicater.innerHTML = "Very Busy"
                        progress.style.background = red
                    }else{
                        indicater.innerHTML = "Busy"
                        progress.style.background = orange
                    }
                }else{
                    indicater.innerHTML = "Rather Quiet"
                    progress.style.background = darkGreen
                }
            }else{
                indicater.innerHTML = "Very Quiet"
                progress.style.background = green
            }

            this.wrapper.className = 'progress-wrapper';
            var that = this
            setTimeout(function() {
                that.updatePercentage(percentage)
            }, 50)
 
        }else{
            indicater.innerHTML = "Loading..."
        }
        if(percentage > 80){
            progress.appendChild(indicater)
            this.wrapper.appendChild(progress)
        }else{
            this.wrapper.appendChild(progress)
            this.wrapper.appendChild(indicater)
        }
        
        
    }

    this.updatePercentage = function(percentage){
        var progress = document.getElementById(this.id)
        if( progress && percentage){
            progress.style.width = percentage + "%"
        }
    }
}



var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       workspaceData = JSON.parse(xhttp.responseText);
       console.log(workspaceData)
    //    processData()
        setTimeout(processData, 900)
    }
};
xhttp.open("GET", "api.php", true);
xhttp.send();