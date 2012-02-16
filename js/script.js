$(document).ready(function(){

var mouseDown = false;
var prevX = null;
var prevY = null;

ctx = document.getElementById("canvas").getContext("2d");
b = new Brush();
ctx.fillStyle = b.color;
ctx.lineCap = "round";
ctx.lineWidth = b.thickness;

$("#clearButton").click(function() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.closePath();
});

$("#canvas").mousedown(function() {
    mouseDown = true;
});

$("#canvas").mouseup(function() {
    mouseDown = false;
});

$("#canvas").mousemove(function(e) {
    
    ctx.beginPath();
    var target = e.target;
    if (e.target)
    {
        var leftOffset = $(target).offset().left;
        var topOffset = $(target).offset().top;
        
        var x = e.pageX - leftOffset;
        var y = e.pageY - topOffset;
        if (prevX === null || prevY === null)
        {
            prevX = x;
            prevY = y;
            return;
        }
        ctx.moveTo(prevX, prevY);
        
        if (mouseDown)
        {
            ctx.lineTo(x, y);
            ctx.stroke();

        }
        prevX = x;
        prevY = y;
    }
    ctx.endPath();
});


function Brush() {

    this.color = "rgb(200,0,0)";
    this.thickness = 10;
    
    this.SetColor = function(color) {
        this.color = color;
    }
    
    this.GetColor = function() {
        return this.color;
    }
    
    this.SetThickness = function(thickness) {
        this.thickness = thickness;
    }
    
    this.GetThickness = function() {
        return this.thickness;
    }

}



});