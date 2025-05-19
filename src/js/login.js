const right = document.getElementById('right')
const registerBtn = document.getElementById('register-btn')

registerBtn.addEventListener('click', ()=>{
    right.classList.toggle('active');
    registerBtn.textContent =right.classList.contains('active')
    ? 'Acces Account'
    : 'Create Account'
});