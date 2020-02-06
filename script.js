//javascript and jquery content to be saved in Git;
function submitAnswers(){
    var total = 5;
    var score = 0;
    
    //Get User Input
    //document.forms returns an HTMLcollection object containing all of the document's forms;
    
    //HTMLCollection Objects are array-like objects, allowing you to access by either index or name attribute of element.
    
    //When we have a form element, then any element is available inside that named collection ex: form.elements.value
    
    // The form htmlcollection obj can access its elements by actual name.
    
    //Elements within a collection object are indexed and accessed via square brackets;
    var q1 = document.forms["quizForm"]["q1"].value;
    var q2 = document.forms["quizForm"]["q2"].value;
    var q3 = document.forms["quizForm"]["q3"].value;
    var q4 = document.forms["quizForm"]["q4"].value;
    var q5 = document.forms["quizForm"]["q5"].value;
    
    //alert(q1);
    
    
    //Validation;
    
    //loop;
    for(i = 1; i<= total; i++){
      
      //Function method executes each question;
         if(eval('q' + i) == null || eval('q' + i) == ''){
      
      alert('You missed question ' + i);
      return false;
    }
      
      
  }
  
  // Set Correct Answers
  var answers = ['b', 'a', 'd', 'b', 'd'];
  
  // Check Answers
  for(i = 1; i<= total; i++){
    
    if(eval('q' + i) == answers[i - 1]) {
      score++
  }
     
    
  }
  
  alert('You scored ' + score + ' out of '+ total);
  
  //Display results at top;
  
  var result = document.getElementById('results');
  result.innerHTML= '<h3>Congrats! You scored <span>' + score + '</span> out of <span>' +  total + '</span> . </h3>';
   
    
    //Does not actually submit the form;
    //Usually will have a php backend file setup to receive this form submission;
    return false;
}

//Function(alert("23"));

