const getStartedbtn = document.getElementById("get-started-btn");
const goBackbtn = document.getElementById("goback-btn");
const chatBotbox = document.getElementById("chatbot");
const introSection = document.getElementById("intro");


getStartedbtn.addEventListener("click", function () {
    //chatBotbox.scrollIntoView({behavior: "smooth"});
    chatBotbox.classList.remove("hidden")
    introSection.classList.add("hidden");
});

goBackbtn.addEventListener("click", function(){
    chatBotbox.classList.add("hidden")
    introSection.classList.remove("hidden");
});
