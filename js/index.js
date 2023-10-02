const questions = [
	{
		question: "What does HTML stand for?",
		options : ["Hyperlink Text Markup Language", " Hyper Transfer Markup Language","Hyper Text Markup Language","Hyper Tool Markup Language"],
		answer : 0 
	},
	{
		question:"Primarily used Language for server-side web development?",
		options : ["HTML", "JavaScript", "Python", "PHP"],
		answer : 3
	},
	{
		question : "What is the purpose of CSS in web development?",
		options : ["Creating dynamic web pages","Managing server-side logic","Styling web content","Handling user interactions"],
		answer : 2
	},
	{
		question : "Which of the following is not a valid HTTP status code?",
		options : ["200 OK", "404 Not Found",  "503 Service Unavailable", "300 Multiple Choices"],
		answer : 3
	},
	{
		question : "What does the acronym 'URL' stand for?",
		options : ["Uniform Resource Locator", " Universal Resource Locator", "Uniform Reference Locator", "Universal Reference Locator"],
		answer : 0
	}, 
	{
		question : "Which framework commonly used for building user interfaces?",
		options : ["Angular", "Node.js", "Ruby on Rails", "Django"],
		answer : 0
	},
	{
		question : "What is the primary purpose of a web server?",
		options : ["Rendering web pages in the browser", " Storing and managing databases", "Serving web content to client browsers", "Running server-side scripts"],
		answer : 2
	}, 
	{
		question : " Which version control system is widely used in web development?",
		options : ["Git", "SVN", "Mercurial", "CVS"],
		answer : 0
	},
	{
		question : "In web development, what does the acronym 'CMS' typically refer to?",
		options : ["Computer Management System", "Content Management System", "Code Maintenance System", " Customer Management System"],
		answer : 1
	},
	{
		question : "In which part of the HTML metadata is contained?",
		options : ["head tag", "title tag", "html tag", "body tag"],
		answer : 0
	}
 ];

const questions_length = questions.length;
var question_index = 0;

const questions_box = document.querySelector("#question > p");
const options_box = [... document.querySelector("#options").children]
const start_btn = document.getElementById("start");
const name_input = document.getElementById("name");
const name_output = document.getElementById("msg");
const next_btn = document.getElementById("next");
const main_box = document.getElementById("page-wrap");

const resetbtn = document.getElementById("resetbtn");
const correct_output = document.getElementById("correct");
const wrong_output = document.getElementById("wrong");



var user_answer = []
var device_width = document.body.clientWidth;




function start() {
	if(!name_input.value) return;
	name_output.innerText = name_input.value;

	// setting first question 

	questions_box.innerText = `${ question_index + 1 }. ` + questions[question_index].question;
	
	for (var i =0; i<= 3;i++){
		options_box[i].children[0].innerText = `${i+1}. ${questions[question_index].options[i]}`
	}

	main_box.style.left = device_width > 650 ? "-25rem" : "-20rem"
	question_index += 1;

}

function clear(){
	options_box.forEach(e => {
		e.children[1].checked = false
	})
}


function getanswer(){
	for(var i=0;i<options_box.length;i++){
		if(options_box[i].children[1].checked){
			return(i)
		}
	}
	
}






function resetQuiz() {
	user_answer = [];
	name_input.value = '';
	clear()
	main_box.style.left = '0';
	question_index = 0;

}







function showAnswers() {
	main_box.style.left = device_width > 650 ? `-${25*2}rem` : `-${20*2}rem`;
	// TODO:
	// here can show which questions are correct or wrong 
	// we have all questions and user given answers
	let correct = [];
	let wrong = [];
	for(let i=0;i<user_answer.length;i++){
		if(user_answer[i].user_answer === questions[i].answer ){
			correct.push({
				question : questions[i].question,
				correct_answer : questions[i].answer,
				user_answer: user_answer[i].user_answer
			})
		}else{
			wrong.push({
				question : questions[i].question,
				correct_answer : questions[i].answer,
				user_answer: user_answer[i].user_answer
			})
		}
	}

	correct_output.textContent = correct.length;
	wrong_output.textContent = wrong.length;
}


function checkSelected() {

	for(var i=0;i<options_box.length;i++){
		if(options_box[i].children[1].checked){
			return true
		}
	}
	return false;
}



function next() {
	
	if(!checkSelected()) {
		return alert("Please Select An Options")
	}


	if(user_answer.length < questions.length) {
			user_answer.push({
			question_number : question_index,
			user_answer : getanswer()
			})
	}

	if(question_index === questions_length){
			showAnswers()
	}else {
			questions_box.innerText = `${ question_index + 1 }. ` +    questions[question_index].question;
	clear()
	for (var i =0; i<= 3;i++){
		options_box[i].children[0].innerText = `${i+1}. ${questions[question_index].options[i]}`
	}
	question_index += 1;
	}
}




start_btn.onclick = start;
next_btn.onclick = next;
resetbtn.onclick = resetQuiz;



function handlecheckClick(e) {
	options_box.forEach(e => {
		e.children[1].checked = false;
	});

	[...e.target.children][1].checked = true;
}


options_box.forEach(e => {
	e.onclick = handlecheckClick
})