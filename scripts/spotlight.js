var ticks = 0;
var ticksRequired = 35;

function spotlightMouseMove(event)
{
    if(event.target !== event.currentTarget) return;

    if(ticks < ticksRequired)
    {
        ticks++;
        return;
    }

    ticks = 0;

    var x = event.offsetX;
    var y = event.offsetY;

    var width = event.target.offsetWidth;
    var height = event.target.offsetHeight;

    var widthMiddle = width / 2;
    var heightMiddle = height / 2;

    var normalizedX = (widthMiddle - x) / width;
    var normalizedY = (heightMiddle - y) / height;

    var boxShadowX = 20 * normalizedX;
    var boxShadowY = 20 * normalizedY;

    //var color = getComputedStyle(event.target)["border-left-color"];
    var color = '#bdc3c7';
    var boxShadowString = `${boxShadowX}px ${boxShadowY}px 20px ${color}`;

    event.target.style.boxShadow = boxShadowString;

    console.log(normalizedX, normalizedY);
}

var elements = document.getElementsByClassName("spotlight");

for(var element of elements)
{
    element.addEventListener("mousemove", spotlightMouseMove);
    console.log(element);
}
