let rbc= [1,0.2,0,0];
let zbs= [0,1,0,0];
let r0=200;
let N=80;

let secPoints;
//Input
var sliderR0=document.getElementById("r0");
var sliderR1=document.getElementById("r1");
var sliderR2=document.getElementById("r2");
var sliderR3=document.getElementById("r3");

var sliderZ1=document.getElementById("z1");
var sliderZ2=document.getElementById("z2");
var sliderZ3=document.getElementById("z3");

//Text Output
var valueR0=document.getElementById("r0Text");
var valueR1=document.getElementById("r1Text");
var valueR2=document.getElementById("r2Text");
var valueR3=document.getElementById("r3Text");

var valueZ1=document.getElementById("z1Text");
var valueZ2=document.getElementById("z2Text");
var valueZ3=document.getElementById("z3Text");

//Properties
var propertiesText=document.getElementById("props");

class _Point
{
    constructor(_x,_y)
    {
        this.x=_x;
        this.y=_y;
    }

}

function setup() {
    createCanvas(600, 600);
    secPoints=sectionPoints(rbc,zbs,r0,N)
    initializeText();
  }
  
  function draw() {
    background(30,33,38);
    line(width/2,0,width/2,height);
    drawShapeFromPoints(false,secPoints);
    //Drawing mirror
    drawShapeFromPoints(true,secPoints);
    updateProperties();
  }

  function sectionPoints(_rbc,_zbs,_r0,_N)
  {
    let points= [];
    let dtheta = 2*PI/(_N-1);

    for(let i=0; i<_N; i++)
    {
        let x=width/2;
        let y=height/2;
        for (let j=0; j<_rbc.length; j++)
        {
                x+=_r0*_rbc[j]*cos(j*dtheta*i);
                y+=_r0*_zbs[j]*sin(j*dtheta*i);
        }
        points.push(new _Point(x,y))
    }

    return points;
  }

  function resetBoundary()
  {
    rbc= [1,0.2,0,0];
    zbs= [0,1,0,0];
    secPoints=sectionPoints(rbc,zbs,r0,N)
    drawShapeFromPoints(false,secPoints);
    //Drawing mirror
    drawShapeFromPoints(true,secPoints);
    updateSliders();
    updateProperties();
  }

  function updateSliders() {
    sliderR0.value = rbc[0]*100;
    
    sliderR1.value = (rbc[1]+1)*50;
    
    sliderR2.value = (rbc[2]+1)*50;
    
    sliderR3.value = (rbc[3]+1)*50;
    
    sliderZ1.value = (zbs[1]+1)*50;
    
    sliderZ2.value = (zbs[2]+1)*50;
    
    sliderZ3.value = (zbs[3]+1)*50;

    initializeText();
  }

  function updateProperties()
  {
    let maxIndex = 0;
    for (let j = 1; j < secPoints.length; j++) {
        if (secPoints[j].y > secPoints[maxIndex].y) {
            maxIndex = j;
        }
    }
    let rmax=(secPoints[maxIndex].x-width/2)/r0;
    let rmag=rbc[0]+rbc[2];
    let a=(secPoints[0].x-width/2)/r0-rmag;
    let b=(secPoints[maxIndex].y-height/2)/r0;

    let triangularity= (rmag-rmax)/(a);
    let elongation=b/a;
    propertiesText.innerHTML= "a= "+a.toFixed(2)+", b= "+b.toFixed(2)+", Rgeom= "+rmag.toFixed(2)+", Rmax= "+rmax.toFixed(2)+", Triangularity= "+triangularity.toFixed(2)+", Elongation= "+elongation.toFixed(2);
    //propertiesText.innerHTML= "a= "+a
  }

  function drawShapeFromPoints(isMirrored,points)
  {
    beginShape();
    for(let _point of points)
    {
        if(isMirrored)
        {
            vertex(-_point.x+width,_point.y);
        }
        else
        {
            vertex(_point.x,_point.y);
        }
        
    }
    endShape(CLOSE);

    fill(0)
    //Make Geometric center
    if(isMirrored)
      {
        circle(-(rbc[0]+rbc[2])*r0+width/2,height/2,10);
      }
    else
    {
      circle((rbc[0]+rbc[2])*r0+width/2,height/2,10);
    }
    fill(255)
  }

  function initializeText()
  {
    valueR0.innerHTML="r0= "+rbc[0]
    valueR1.innerHTML="r1= "+rbc[1]
    valueR2.innerHTML="r2= "+rbc[2]
    valueR3.innerHTML="r3= "+rbc[3]

    valueZ1.innerHTML="z1= "+zbs[1]
    valueZ2.innerHTML="z2= "+zbs[2]
    valueZ3.innerHTML="z3= "+zbs[3]
  }

  //Slider Functions
  sliderR0.oninput = function()
  {
    rbc[0]=this.value/100;
    secPoints=sectionPoints(rbc,zbs,r0,N)
    valueR0.innerHTML="r0= "+this.value/100
  }
  sliderR1.oninput = function()
  {
    rbc[1]=this.value/50-1;
    secPoints=sectionPoints(rbc,zbs,r0,N);
    valueR1.innerHTML="r1= "+ (this.value/50-1).toFixed(2);
  }
  sliderR2.oninput = function()
  {
    rbc[2]=this.value/50-1;
    secPoints=sectionPoints(rbc,zbs,r0,N)
    valueR2.innerHTML="r2= "+(this.value/50-1).toFixed(2);
  }
  sliderR3.oninput = function()
  {
    rbc[3]=this.value/50-1;
    secPoints=sectionPoints(rbc,zbs,r0,N)
    valueR3.innerHTML="r3= "+(this.value/50-1).toFixed(2);
  }
  sliderZ1.oninput = function()
  {
    zbs[1]=this.value/50-1;
    secPoints=sectionPoints(rbc,zbs,r0,N)
    valueZ1.innerHTML="z1= "+(this.value/50-1).toFixed(2);
  }
  sliderZ2.oninput = function()
  {
    zbs[2]=this.value/50-1;
    secPoints=sectionPoints(rbc,zbs,r0,N)
    valueZ2.innerHTML="z2= "+(this.value/50-1).toFixed(2);
  }
  sliderZ3.oninput = function()
  {
    zbs[3]=this.value/50-1;
    secPoints=sectionPoints(rbc,zbs,r0,N)
    valueZ3.innerHTML="z3= "+(this.value/50-1).toFixed(2);
  }