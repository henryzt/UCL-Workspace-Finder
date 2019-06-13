setTimeout(typeWriter, 1000);
function typeWriter() {
    document.getElementById("sc").style.width="50%";
}

var studentCentre = new progressBar();
studentCentre.create("sc")

function progressBar(){
    this.color = "";
    this.id = "";
    this.wrapper = null;
    this.create = function(id){
        var iDiv = document.createElement('div');
        this.id = id;
        iDiv.id = id;
        iDiv.className = 'progress-wrapper';
        this.wrapper = iDiv;
        document.getElementById('overview').appendChild(iDiv);
    }
}
