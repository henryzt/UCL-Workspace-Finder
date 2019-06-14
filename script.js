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
    return Math.floor(100 * (survey.sensors_occupied / (survey.sensors_occupied + survey.sensors_absent)))
}

/*
Example Div:
    <div class="overview-progress">
        <div class="progress-wrapper">
            <div class="progress" id="sc">
                Student Center
            </div>
            <div class="indicator">Very Busy</div>
        </div>
    <div>80% Full</div>
*/

function progressBar(){
    this.color = "";
    this.id = "";
    this.overview = null;
    this.placeName = "";
    this.create = function(id, name){
        var overview = document.createElement('div');
        overview.className = "overview-progress"
        this.id = id;
        this.placeName = name;
        this.overview = overview;
        this.updateContent()
        document.getElementById('overview').appendChild(this.overview);
    }
    this.updateContent = function(percentage){
        this.overview.innerHTML = "";
        var wrapper = document.createElement('div');
        var progress = document.createElement('div');
        var indicater = document.createElement('div');
        var remain = document.createElement('div');
        indicater.className = "indicator"
        remain.className = "remain"
        progress.id = this.id;
        progress.innerHTML = this.placeName;
        progress.className = 'progress';
        
        remain.innerHTML = percentage + "% Full"
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

            wrapper.className = 'progress-wrapper';
            var that = this
            setTimeout(function() {
                that.updatePercentage(percentage)
            }, 50)
 
        }else{
            indicater.innerHTML = ""
            remain.innerHTML = "Loading..."
            wrapper.className = 'progress-wrapper progress-loading';
        }
        if(percentage > 80){
            progress.appendChild(indicater)
            wrapper.appendChild(progress)
        }else{
            wrapper.appendChild(progress)
            wrapper.appendChild(indicater)
        }
        
        this.overview.appendChild(wrapper)
        this.overview.appendChild(remain)
        
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
        setTimeout(processData, 1000)
    }
};
xhttp.open("GET", "api.php", true);
xhttp.send();