setTimeout(typeWriter, 1000);
function typeWriter() {
    // document.getElementById("sc").style.width="50%";
}

var studentCentre = new progressBar();
studentCentre.create("sc")

function progressBar(){
    this.color = "";
    this.id = "";
    this.wrapper = null;
    this.placeName = "";
    this.create = function(id, name){
        var iDiv = document.createElement('div');
        this.id = id;
        this.placeName = name;
        iDiv.className = 'progress-wrapper';
        this.wrapper = iDiv;
        this.createContent()
        document.getElementById('overview').appendChild(iDiv);
    }
    this.createContent = function(percentage){
        this.wrapper.innerHTML = "";
        var progress = document.createElement('div');
        progress.id = this.id;
        progress.innerHTML = this.placeName;
        progress.className = 'progress';
        var indicater = document.createElement('div');
        indicater.style.marginLeft = "auto"
        indicater.innerHTML = "Loading"
        this.wrapper.appendChild(progress)
        this.wrapper.appendChild(indicater)
    }
}
