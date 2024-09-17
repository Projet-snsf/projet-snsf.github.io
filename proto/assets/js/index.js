
const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');
const container = document.getElementById('container');

signUpBtn.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInBtn.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// const txt_slider = document.querySelector('.txt_slider')
// setInterval(() => {
//     txt_slider.style.animation='sliding 20s linear infinite;'
// }, 2100);

