var green = "linear-gradient(to right, #dce35b, #45b649)"
var darkGreen = "linear-gradient(to right, #A8E349, #569E20)"
var orange = "linear-gradient(to right, #FED524, #F95A57)"
var red = "linear-gradient(to right, #C63EC6, #E00B0B)"


var studentCentre = new progressBar();
studentCentre.create("sc", "Student Centre")

setTimeout(typeWriter, 1000);
function typeWriter() {
    studentCentre.updateContent(50)
}

/*
Example Div:
    <div class="progress-wrapper">
        <div class="progress" id="sc">
            Student Center
        </div>
        <div style="margin-left:auto">Very Busy</div>
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
        iDiv.className = 'progress-wrapper progress-loading';
        this.wrapper = iDiv;
        this.updateContent()
        document.getElementById('overview').appendChild(iDiv);
    }
    this.updateContent = function(percentage){
        this.wrapper.innerHTML = "";
        var progress = document.createElement('div');
        progress.id = this.id;
        progress.innerHTML = this.placeName;
        progress.className = 'progress';
        var indicater = document.createElement('div');
        indicater.style.marginLeft = "auto"
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
            var that = this
            setTimeout(function() {
                that.updatePercentage(percentage)
            }, 50)
 
        }else{
            indicater.innerHTML = "Loading..."
        }
        this.wrapper.appendChild(progress)
        this.wrapper.appendChild(indicater)
        
    }

    this.updatePercentage = function(percentage){
        var progress = document.getElementById(this.id)
        if( progress && percentage){
            progress.style.width = percentage + "%"
        }
    }
}
