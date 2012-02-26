$(document).ready(function(){

//id of canvas element
var canvas = "canvas";

var mouseDown = false;
var prevX = null;
var prevY = null;

$("#slider").slider({
    value: 10,
    change: function(event, ui){
        $("#thickness").html(ui.value);
        if (b)
        {
            b.thickness = ui.value;
            ctx.lineWidth = b.thickness;
        }
    }
});

$("#colorPicker").miniColors({
    change : function(hex, rgb){
        if (b) {
            b.color = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
            ctx.strokeStyle = b.color;
            ctx.fillStyle = b.color;
        }
    }
});

ctx = document.getElementById(canvas).getContext("2d");
b = new Brush();
ctx.strokeStyle = b.color;
ctx.fillStyle = b.color;
ctx.lineCap = "round";
ctx.lineWidth = b.thickness;

$("#clearButton").click(function() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.closePath();
});

$("#" + canvas).mousedown(function(e) {
    mouseDown = true;
    b.setPosition(e);
    b.drawCircle(ctx);
});

$("#" + canvas).mouseup(function(e) {
    mouseDown = false;
});

$("#" + canvas).mousemove(function(e) {
    
    ctx.beginPath();
    b.setPosition(e);

    if (prevX === null || prevY === null)
    {
        prevX = b.x;
        prevY = b.y;
        return;
    }
    ctx.moveTo(prevX, prevY);
    
    if (mouseDown)
    {
        ctx.lineTo(b.x, b.y);
        ctx.stroke();

    }
    prevX = b.x;
    prevY = b.y;

    ctx.closePath();
});


function Brush() {

    this.color = "rgb(0,0,0)";
    this.thickness = 10;
    this.x = null;
    this.y = null;
    
    this.setColor = function(color) {
        this.color = color;
    }
    
    this.getColor = function() {
        return this.color;
    }
    
    this.setThickness = function(thickness) {
        this.thickness = thickness;
    }
    
    this.getThickness = function() {
        return this.thickness;
    }
    
    this.setPosition = function(e) {
        var target = e.target;
        if (e.target)
        {
            var leftOffset = $(target).offset().left;
            var topOffset = $(target).offset().top;
            
            this.x = e.pageX - leftOffset;
            this.y = e.pageY - topOffset;
        }
    }
    
    this.drawCircle = function(context) {
        context.arc(this.x, this.y, this.thickness/2, 0, Math.PI * 2, false);
        context.fill();
    
    }

}



});