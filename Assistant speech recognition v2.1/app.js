  const cText= document.querySelector('#convertedText');
  var converted="";
  var flag;
  var searchUrl="";
  //loading screen
  window.onload = function()
  {
	  var seconds= 3;
	  setTimeout(function(){
      document.querySelector('main').style.display="block";		  
	  document.querySelector('#loading').style.display="none";},seconds*1000);
  }
  //recognition part
  const voicerec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new voicerec();
  
  //speak part
  const speech = new SpeechSynthesisUtterance();
  speech.volume=1;
  speech.rate=1;
  speech.pitch=1;
  speech.text="This is what I've Found";
  var voices = window.speechSynthesis.getVoices();
  speech.voice = voices[1];
  
  
  
  rec.onstart= function()
  {  if(flag===1)
	  {
	    document.querySelector('#start').style.display="none";
        document.querySelector('#stop').style.display="inline-block";
      }
	  else if (flag===2)
	  {  
         
          document.querySelector('#listening').style.display="block";
		  document.querySelector('#search-controls').style.display="none";
	  }
    
  };
  rec.onerror = function(event) {
	  document.querySelector('#listening').style.display="none";
	  document.querySelector('#search-controls').style.display="flex";
	  if (event.error === "network")
	  {
	   document.getElementById('pop').style.display="none";
       document.getElementById('error').style.display="flex";
	   document.querySelector('main').style.filter="blur(10px)";
	   document.querySelector('footer').style.filter="blur(10px)";
	  }
}
  rec.onresult = function(event)
  {
	  const current = event.resultIndex;
	  var transcript = event.results[current][0].transcript;
	  if(flag===1)
	  {
	   console.log(flag);
	   converted = converted + " "+ transcript;
       cText.textContent = converted;
      }
	  else if (flag===2)
	  {    
     
		  searchUrl= "https://www.bing.com/search?q=" + transcript;
		  document.querySelector('#searchWindow').src=searchUrl;
		  window.speechSynthesis.speak(speech);
		  document.querySelector('#listening').style.display="none";
		  document.querySelector('#search-controls').style.display="flex";
	  }
  };
  function start(value)
  {  
    if(window.SpeechRecognition || window.webkitSpeechRecognition)
    {
	  flag= value;
	  rec.start();
    }
	else
	{
	  document.getElementById('pop').style.display="none";
	  document.getElementById('error-mssg').textContent="Looks like your browser doesn't support voice recognition";
	  document.getElementById('error-suggestion').textContent="Please try using google chrome";
      document.getElementById('error').style.display="flex";
	  document.querySelector('main').style.filter="blur(10px)";
	  document.querySelector('footer').style.filter="blur(10px)";
	}
  }
  rec.onend= function()
  { 
     document.querySelector('#stop').style.display="none";
     document.querySelector('#start').style.display="inline-block";
  };
  
  
  //voiceToText part
  function text()
  {  flag=1;
	 document.querySelector('#textConversion').style.display="none";
     document.querySelector('#text').style.display="block";
	
  }
  function erase()
  {
	  converted="";
	  cText.textContent = converted;
  }
 
   function textexit()
   {
    
	   rec.stop();
	   converted="";
	   cText.textContent = converted;
	   document.querySelector('#text').style.display="none";
       document.querySelector('#textConversion').style.display="flex";
 
  }


//search part
function search()
{
	 flag=2;
	 document.querySelector('#searchContainer').style.display="none";
     document.querySelector('#search').style.display="block";
}
function searchexit()
   {
    
	 rec.stop();
     document.querySelector('#search').style.display="none";
	 document.querySelector('#searchWindow').src="";
     document.querySelector('#searchContainer').style.display="flex";
		
 
  }


//popup

function popshow()
{
	document.getElementById('pop').style.display="block";
	document.querySelector('main').style.filter="blur(10px)";
	document.querySelector('footer').style.filter="blur(10px)";
	
}
function pophide()
{   document.getElementById('error').style.display="none";
	document.getElementById('pop').style.display="none";
	document.querySelector('main').style.filter="none";
	document.querySelector('footer').style.filter="none";
	   
}
function errorhide()
{
	document.getElementById('error').style.display="none";
	document.querySelector('main').style.filter="none";
	document.querySelector('footer').style.filter="none";
	   
}