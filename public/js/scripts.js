const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM Element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

socket.on('user_connected', (username) => {
  console.log(`${username} connected`);
});

function drawHelloStranger(username) {
  helloStrangerElement.innerText = `Hello ${username} Stranger :)`;
}

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
}

init();
