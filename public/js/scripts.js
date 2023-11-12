const socket = io('/chattings');
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM Element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected`);
});

socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username} : ${chat}`);
});

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (!inputValue) return;
  socket.emit('submit_chat', inputValue);
  drawNewChat(`me : ${inputValue}`);
  event.target.elements[0].value = '';
}

function drawHelloStranger(username) {
  helloStrangerElement.innerText = `Hello ${username} Stranger :)`;
}

function drawNewChat(message) {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.innerHTML = `
    <div>
      ${message}
    <div>
  `;
  chattingBoxElement.append(wrapperChatBox);
}

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

init();
