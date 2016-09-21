var canvasWidth = 200,
    canvasHeight = 300,
    defaultWidth = $(window).width(), defaultHeight = $(window).height(),

    ua = navigator.userAgent.toLowerCase(),
    isAndroid = ua.indexOf("android") > -1,

    scratchMat = [0, 0, 0, 0, 0, 0],
    collectedNumbers = 0;


//Disable scrolling on mobile devices while the canvas is being scratched
$(document).on("touchstart", ".scr__canvas", function() {
  console.log("disabled")
  disableScroll();
})

$(document).on("touchstart", ".scr__instructions-numbers", function() {
  enableScroll();
} )

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.ontouchmove  = preventDefault; // mobile
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.ontouchmove = null;  
      console.log("enabled")

}

//If on Facebook Canvas, scroll the page to the top
function scrollY(y) {
    if (window.jQuery) {
        FB.Canvas.getPageInfo (function (pageInfo) {
            $({ y: pageInfo.scrollTop })
                .animate({
                        y: y
                    },
                    {
                        duration: 1000,
                        step: function (offset) {
                            FB.Canvas.scrollTo(0, offset);

                    }
                });
        });
      return false;
    } else {
        FB.Canvas.scrollTo(0, y);
        return false;
    }
};

//Scratchpad function adapted from http://codepen.io/andreruffert/pen/pvqly under MIT license. See scratchpad-license.txt 
function scratchPad(canvasid, canvasWidth, canvasHeight, pixelThreshold) {
  var isDrawing, lastPoint;
  var container    = document.getElementById('js-container'),
      canvas       = document.getElementById(canvasid),
      ctx          = canvas.getContext('2d'),
      brush        = new Image();
      image        = new Image(),
      image.src = "scratch-texture-large.jpg";


image.onload = function() {
    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);
  };

  brush.src = "circle.png" //File that determines the scratch "paintbrush"
  
  canvas.addEventListener('mousedown', handleMouseDown, false);
  canvas.addEventListener('touchstart', handleMouseDown, false);
  canvas.addEventListener('mousemove', handleMouseMove, false);
  canvas.addEventListener('touchmove', handleMouseMove, false);
  canvas.addEventListener('mouseup', handleMouseUp, false);
  canvas.addEventListener('touchend', handleMouseUp, false);
  
  function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }
  
  function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
  }
  
  // Only test every `stride` pixel. `stride`x faster,
  // but might lead to inaccuracy
  function getFilledInPixels(stride) {
    if (!stride || stride < 1) { stride = 1; }

      var pixels   = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
      var pdata    = pixels.data,
        l        = pdata.length,
        total    = (l / stride),
        count    = 0;
    // Iterate over all pixels
    for(var i = count = 0; i < l; i += stride) {
      if (parseInt(pdata[i]) === 0) {
        count++;
      }
    }
    return Math.round((count / total) * 100);
  }
  
  function getMouse(e, canvas) {
    var offsetX = 0, offsetY = 0, mx, my;

    if (canvas.offsetParent !== undefined) {
      do {
        offsetX += canvas.offsetLeft;
        offsetY += canvas.offsetTop;      } 
        while ((canvas = canvas.offsetParent));
    }
    
    mx = (e.pageX || e.touches[0].clientX) - offsetX;
    my = (e.pageY || e.touches[0].clientY) - offsetY;
    
    return {x: mx, y: my};
  }

  
  
  function handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;
    if (filledInPixels > pixelThreshold) {
      currentCanvasId = canvas.id.charAt(canvas.id.length-1);
      currentCanvasId -= 1;
      if ( scratchMat[ (parseInt(currentCanvasId)) ] == 0 ) {
          getSecretNumber(canvas.id);
          scratchMat[(parseInt(currentCanvasId))] = 1;
      }
    }
  }
  
  function handleMouseDown(e) {
    isDrawing = true;
    lastPoint = getMouse(e, canvas);
  }

  function handleMouseMove(e) {
    if (!isDrawing) return false;

    var currentPoint = getMouse(e, canvas),
        dist = distanceBetween(lastPoint, currentPoint),
        angle = angleBetween(lastPoint, currentPoint),
        x, y;
    
    for (var i = 0; i < dist; i++) {
      x = lastPoint.x + (Math.sin(angle) * i) - 25;
      y = lastPoint.y + (Math.cos(angle) * i) - 25;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(brush, x, y);
    }
    
    lastPoint = currentPoint;
    handlePercentage(getFilledInPixels(32));
  }

  function handleMouseUp(e) {
    if (!isAndroid) {
      isDrawing = false;
    }
    else {
      setTimeout(function() { isDrawing = false; });
    }
  }
};

//Determines the number to reveal and modal to show based on what canvas was scratched.
function getSecretNumber(id) { 
  var position = id.charAt(id.length-1);
  var idTag = "#scr__mystery-number" + position;
  var modalIdTag = "#modal" + position;
  updateNumbers(idTag, modalIdTag, position);
}

//Update the DOM and show the relevant modal.
function updateNumbers(tag, modalTag, position) {
  collectedNumbers+=1;
  switch (position) {
    case "1":
      $(tag).html("3").fadeIn(1000); 
      break;
    case "2" :
    case "3" :
    case "5" :
      $(tag).html("1").fadeIn(1000);
      break;
    case "4":
      $(tag).html("0").fadeOut().fadeIn(1000);
      break;
    case "6":
      $(tag).fadeOut().html("6").fadeIn(1000);
      break;
  }
  setTimeout(function() {
    scrollY(0);
    $(modalTag).modal("show")
    enableScroll();
  }, 1500); 
}

//If all the canvases have been scratched, redirect to the next page.
$(document).on('hide.bs.modal', function (e) {
    if (collectedNumbers>5) {
    $(".scr__canvas").hide();
    $(".scr__scratch-overlay").fadeOut("slow");
    scrollY(0);
    setTimeout(function(){
      self.location.href = "./thank-you.php#"
    }, 1000)
  };
})


tmpImage = new Image();
tmpImage.src = "scratch-texture-large.jpg";

//Ensure the app is responsive.
window.onresize = function() {
      sizeScratchpad()
}

window.onload = function() {
  sizeScratchpad();
}

function sizeScratchpad () {
  //Resizes the six scratchpad surfaces based on their 
  //proporitions to the actual image background. 
  //(The image is normally 800px)
  counter = 0;
  while (counter < 6) {
    canvasWidth  = parseInt($("#scr__scratch-underlay").width())
    canvasHeight = parseInt($("#scr__scratch-underlay").height());
     if (counter === 0) {
      canvasWidth *= 245/800;
      canvasHeight *= 245/800;
    }
    
    if (counter === 1) {
      canvasWidth *= 280/800;
      canvasHeight *= 250/800;
    }
    if (counter === 2) {
      canvasWidth *= 210/800; 
      canvasHeight *= 155/800;
    }

    if (counter === 3) {
      canvasWidth *= 220/800
      canvasHeight *= 210/800
        }

    if (counter === 4) {
      canvasWidth *= 220/800;
      canvasHeight *= 210/800;
    }

    if (counter === 5) {
      canvasWidth *= 180/800;
      canvasHeight *= 190/800 ;
    }

    
    ctx = $(".scr__canvas")[counter].getContext('2d');
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;
    ctx.drawImage(tmpImage, 0, 0, 50, 50, 0, 0, canvasWidth, canvasHeight);

    if (isAndroid) {
      thresholdLimit = 0;
    }
    else {
      thresholdLimit = 50;
    }
    if($("#js-canvas"+parseInt(counter+1)).length > 0) scratchPad("js-canvas"+parseInt(counter+1), canvasWidth.toFixed(2), canvasHeight.toFixed(2), thresholdLimit);
    counter++;
  }
}

