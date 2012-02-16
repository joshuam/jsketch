$(document).ready(function(){

var mouseDown = false;
var prevX = null;
var prevY = null;

$("#colorPicker").miniColors({
    change : function(hex, rgb){
        if (b) {
            b.color = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
            ctx.strokeStyle = b.color;
        }
    }
});

ctx = document.getElementById("canvas").getContext("2d");
b = new Brush();
ctx.strokeStyle = b.color;
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
    ctx.closePath();
});


function Brush() {

    this.color = "rgb(0,0,0)";
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