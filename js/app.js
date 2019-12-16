
//Create a list that holds all of your cards
const cardList=document.querySelectorAll(".card");
let opencards=[];
let icons=[];
//get a list of all stars
const starsList=document.querySelectorAll(".fa-star");
// get the model that display the win message
var modal = document.getElementById("myModal");
//get the pragraph that conatain the message
var content =document.getElementById("content");
//get the paly again button
var btn = document.getElementById("replay");
var count = 0, clearTime,clearintial, seconds = 0, minutes = 0, hours = 0, clearState,secs, mins, gethours;
let counter=0,moves=0;

//get list of icons to shuffle them later.
for(let card of cardList) {
 icons.push(card.firstElementChild.className);}

// call update card function to update them using shuffle function
updatecards(shuffle(icons));

//theh function is called to start the timer
startWatch();
/*
update card fuction takes the an array of icons that are already shuffled as parameter 
then use that array to fill the cards
*/
function updatecards(array){  
 let i=0;
 for(let card of cardList){
  card.firstElementChild.className=array[i++];}
 }
 
//start watch from https://www.ostraining.com/blog/coding/stopwatch/
function startWatch(){ 
 /* check if seconds is equal to 60 and add a +1 to minutes, and set seconds to 0 */
 /* you use the javascript tenary operator to format how the minutes should look and add 0 to minutes if less than 10 */ 
 if ( seconds === 60 ){ seconds = 0; minutes = minutes + 1; }  
 mins = ( minutes < 10 ) ? ( '0' + minutes + ': ' ) : ( minutes + ': ' ); 
 /* check if minutes is equal to 60 and add a +1 to hours set minutes to 0 */
 /* you use the javascript tenary operator to format how the hours should look and add 0 to hours if less than 10 */
 if ( minutes === 60 ) { minutes = 0; hours = hours + 1; } 
 gethours = ( hours < 10 ) ? ( '0' + hours + ': ' ) : ( hours + ': ' ); secs = ( seconds < 10 ) ? ( '0' + seconds ) : ( seconds ); 
 // display the stopwatch 
 var timer = document .querySelector(".timer"); 
 timer.innerHTML = 'Time: ' + gethours + mins + secs; 
 /* call the seconds counter after displaying the stop watch and increment seconds by +1 to keep it counting */ 
 seconds++; 
 /* call the setTimeout( ) to keep the stop watch alive ! */
 clearTime = setTimeout( "startWatch( )", 1000 ); } 

// add event listener to restart button when it clicked it will refresh all things  
document.querySelector(".restart").addEventListener("click", function(e){
 document.location.reload(true);});
   
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
 let currentIndex = array.length, temporaryValue, randomIndex;
 while (currentIndex !== 0) {
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;}
 return array;}

//add event listener to all cards
for(const card of cardList ){    
 card.addEventListener("click", function(event){ 
  if(card.classList[1] !='open'){
  // when the card clicked the counter incremented to check if they ecseeds 2 times
   counter++; 
	// increment the number of moves to display them to the user
   moves++; 
  //update the moves div
	 document.querySelector(".moves").innerHTML=moves.toString(); 
	 // call the open function to update the card to open card style 
   open(card);	
   /*if the counter equals two it will rest to 0 and then the ismatched function will called if it is 
    matched we will call match card method otherwise hidecard will be called.*/
	if(counter==2){
    counter=0;
    if(!ismatch()){ 
     setTimeout(function(){
    // we use timeout to delegate hide cards some seconds to be visible to the user.
     hidecards();}, 300);}
	else
	   matchedcard();}
  // based on the moves we will change the number of the stars.
  changesrats()};
	});}

/*change stars functio update the stars baed on the moves number and i assume when the move grater than 45 i will display one star
and if it is between 25 and 45 it will be two stars finally if it it less than or equal 25 it will be three stars.*/
function changesrats(){
 if(moves >45){
  starsList[0].className='fa fa-star';
  starsList[1].className='fa fa-star-o';
  starsList[2].className='fa fa-star-o';}

 else if(moves>25 && moves<=45){
   starsList[0].className='fa fa-star';
   starsList[1].className='fa fa-star';
   starsList[2].className='fa fa-star-o';}

 else{
    starsList[0].className='fa fa-star';
    starsList[1].className='fa fa-star';
    starsList[2].className='fa fa-star';}
}

/* open function update the style and the class of open card to be open 
and show classes through add these class to clicked card and add it also to open card list*/
function open(c){
 opencards.push(c); 
 c.classList.add('open','show');}

/*it will hide the two cards by remove the open and show classes also remove them from open cards list */
function hidecards(){
 for(const ocard of opencards ){
  ocard.classList.remove('open','show');}
  opencards.pop();
  opencards.pop();}

/* it will check if the cards are matched by get them from the open list and compare the class name of the icons if they equal or not*/
function ismatch(){
 return opencards[0].firstElementChild.className== opencards[1].firstElementChild.className;}

/* if the cards are  matched it will change the style of them by adding the match class and remove open amd show classes
 also it will check if the all cards are matched by calling is finshed function. finally it will remove the cards from open list*/
function matchedcard(){
 for(const ocard of opencards ){
  ocard.classList.remove('open','show');
  ocard.classList.add('match');}
 setTimeout(function(){
 isfinished();},100);
 opencards.pop();
 opencards.pop();}

/* it will check if all cards are matche then will dispaly message and button
 for repaly again when the btn is clicked the game will start again*/
function isfinished(){
 if(document.querySelectorAll(".match").length==16){
  clearTimeout(clearTime);
  content.innerHTML=`
  Conguraltion! You won!with ${moves} moves and ${document.querySelectorAll(".fa-star").length} stars and ${document .querySelector(".timer").innerHTML}`;
  modal.style.display = "flex";
  btn.onclick = function(){
   document.location.reload();}
 }}

