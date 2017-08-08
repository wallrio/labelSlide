/**
 * labelSlide
 * Show a label as slide, like a marquee.
 * 
 * Author: Wallace Rio <wallrio@gmail.com>
 * 
 */

var labelSlide = {
    current:null,
    mining:function(){
        var els = document.querySelectorAll('.label-slide');

        for(var i=0;i<els.length;i++){
            var el = els[i];          
            var listText = el.getAttribute('data-text');
            
            var checkInit = el.getAttribute('data-init');
            if(checkInit == "1")
                return false;

            el.setAttribute('data-init',1);

            listText = listText.replace(/%20/g,' ');
            var listTextArray = listText.split("|");

            var htmlLabel = '<span data-rel="arrow" data-dir="left">  </span>';
                htmlLabel += '<span data-rel="textWrapper">';
                 
                    for(var a=0;a<listTextArray.length;a++){
                        htmlLabel += '<span data-rel="text" data-num="'+a+'">'+listTextArray[a]+'</span>';
                    }                
                  
                htmlLabel += '</span>';
            htmlLabel += '<span data-rel="arrow" data-dir="right">  </span>';
            

            el.innerHTML = htmlLabel;

            labelSlide.setActive(el,0);
        }

        

        
        



    },
    align:function(el){       
        var num = el.getAttribute('data-current');

        var textTexts = el.querySelectorAll('[data-rel="textWrapper"] [data-rel="text"]');


       
        var arrowLeft = el.querySelector('[data-rel="arrow"][data-dir="left"]');
        var arrowRight = el.querySelector('[data-rel="arrow"][data-dir="right"]');

        var arrowLeft_width = el.querySelector('[data-rel="arrow"][data-dir="left"]').offsetWidth;
        var arrowRight_width = el.querySelector('[data-rel="arrow"][data-dir="right"]').offsetWidth;
        


        var textCurrent = el.querySelector('[data-rel="textWrapper"] [data-rel="text"][data-num="'+num+'"]');
        var textCurrent_width = textCurrent.offsetWidth;
       

        el.style.width=textCurrent_width+((arrowLeft_width+arrowRight_width))+"px";
        

        var wrapper_height = el.querySelector('[data-rel="textWrapper"]').offsetHeight;
        
        
        for(var a=0;a<textTexts.length;a++){         
            var current_height = textTexts[a].offsetHeight;
            textTexts[a].style.top = ((wrapper_height-current_height)/2)+"px";            
        }
      



    },
    prev:function(el){
        var current = el.getAttribute('data-current');
        
        labelSlide.setActive(el,Number(current)-1);
    },
    next:function(el){
        var current = el.getAttribute('data-current');
        
        labelSlide.setActive(el,Number(current)+1);
    },
    setActive:function(el,num){
        var textTexts = el.querySelectorAll(' [data-rel="textWrapper"] [data-rel="text"]');
   
        
        if(num < 0 || num > textTexts.length-1)
            return false;

  

        el.setAttribute('data-current',num);

        for(var a=0;a<textTexts.length;a++){            
            if(a < num)
                textTexts[a].setAttribute('data-status','left');
            if(a > num)
                textTexts[a].setAttribute('data-status','right');
        } 

       

        textTexts[num].setAttribute('data-status','active');

        el.setAttribute('data-textcurrent',textTexts[num].innerHTML);
        


        setTimeout(function(){
            labelSlide.align(el);   
        },100);
         

     
        var arrowLeft = el.querySelector('[data-rel="arrow"][data-dir="left"]');
        var arrowRight = el.querySelector('[data-rel="arrow"][data-dir="right"]');

 
        
        (function(el){

            arrowLeft.onclick = function(){
                labelSlide.prev(el);
            }

            arrowRight.onclick = function(){
                labelSlide.next(el);
            }

        })(el);
        

   

    },
    addEvent:function(objs,event,callback,mode,par1,par2){
            
            if(mode == undefined)
                mode = true;

            if(objs == undefined)
                objs = window; 
            if(objs.addEventListener){              
                return objs.addEventListener(event,function(){
                    if(callback)
                        return  callback(objs,par1,par2);
                },mode); 
            }else if(objs.attachEvent){
                return objs.attachEvent('on'+event,function(){
                    if(callback)
                        return callback(objs,par1,par2);
                }); 
            }
        },
        init:function(){
            setInterval(function(){
                labelSlide.mining();    
            },1000);

            labelSlide.mining();
        }
}



labelSlide.addEvent(window,'load',function(){
    labelSlide.init();

    // start: ajuste no wordpress -------------------------------------
    var notitleEl = document.querySelectorAll('.notitle');
    for(var i=0;i<notitleEl.length;i++){
        notitleEl[i].querySelector('a').setAttribute('title','');
    }
    // end: ajuste no wordpress -------------------------------------
});




