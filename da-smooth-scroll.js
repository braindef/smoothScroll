// init smoothScroll on "click"
var nav = document.getElementById('nav');
var aLink = nav.querySelectorAll('a');
var ArrLink = Array.from(aLink);
ArrLink.forEach(el => el.onclick = function() {
  var LinkClicked = this.getAttribute('href');
  var destID = LinkClicked.replace('#', '');
  smoothScroll(destID, 1000, 'easeInQuad');
  return false;
});



function smoothScroll(destination, duration, easing, callback) {

  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  };
    


    
  // gibt an, wieviel px die Seite bereits über den oberen Rand gescrollt wurde..
  const start = window.pageYOffset;
  // gibt die Zeit an bei 'click' bzw. Start der Funktion 'smoothScroll'..
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  // gibt die Höhe des html-Dokumentes (Seite) an..
  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  // gibt die Höhe des Anzeigefensters an..
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  // gibt den Abstand an vom oberen Rand der Seite zum Ziel-Element..
  const destinationOffset = document.getElementById(destination).offsetTop;
  // Distanz zu scrollen..
  const distanceToScroll = documentHeight - (documentHeight - destinationOffset) - start;    

  // falls requestAnimationFrame nicht funzt.. dann scroll bzw springe..
  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, distanceToScroll);
    if (callback) {
      callback();
    }
    return;
  }

    
  // function 'scroll' mit requestAnimationFrame..
  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (distanceToScroll - start)) + start));

    if (window.pageYOffset === distanceToScroll) {
      if (callback) {
        callback();
      }
      return;
    }


    const rAF = "equestAnimationFrame";
    window["r"+rAF](scroll) = window["r"+rAF] || window["webkitR"+rAF] || window["mozR"+rAF] || window["msR"+rAF] || window["oR"+rAF]; 
    
  }

  scroll();
    
    
    
}