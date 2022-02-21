const uname = document.getElementById('username')
const password = document.getElementById('password')
const form = document.getElementById('submitForm')
const errorElement = document.getElementById('error')

//NOT WORKING FOR SOME REASON
//check for errors before allowing user to submit
form.addEventListener('submit', (e) => {
    let messages = []
    //if any forms are empty
    if (uname.value === ''|| uname.value == null){
        messages.push('Username is required')
    }
    if (password.value === ''|| password.value == null){
        messages.push('Password is required')
    }
    //seperate error messages
    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
})