window.onload = () => {
    let socket = io.connect()
    socket.on('connect', () => {
        let input = document.querySelector('.input__area')
        input.focus()
    })
    socket.on('newMsg', (msg, userName) => {
        addNewMsg(msg, userName)
    })
    socket.on('addUser', (userName, userNumber) => {
        addUser(userName, userNumber)
    })
    socket.on('leave', (userName, userNumber) => {
        leave(userName, userNumber)
    })

    let sureName = document.querySelector('.input__button')
    sureName.addEventListener('click', () => {
        let input = document.querySelector('.input__area')
        if (input.value) {
            socket.emit('login', input.value)
            let backgound = document.querySelector('.input__background')
            backgound.style.visibility = 'hidden'
        } else {
            alert('昵称不能为空o~')
            input.focus()
        }
    })
    
    let sendMsgBtn = document.querySelector('.chat__send')
    sendMsgBtn.addEventListener('click', () => {
        let input = document.querySelector('.chat__input')
        if (input.value) {
            socket.emit('postMsg', input.value)
            addNewMsg(input.value, '我')
            input.value = ''
        } else {
            alert('输入内容不能为空o~')
        }
    })
    function addNewMsg(msg, userName) {
        let body = document.querySelector('.chat__body')
        let newMsg = document.createElement('p')
        newMsg.innerHTML = userName + ':' + msg
        body.appendChild(newMsg)
        body.scrollTop = body.scrollHeight
    }
    function addUser(userName, userNumber) {
        let body = document.querySelector('.chat__body')
        let newMsg = document.createElement('p')
        newMsg.innerHTML = '欢迎' + userName + '来到聊天室'
        body.appendChild(newMsg)
        document.querySelector('.chat__userNumber').innerHTML = userNumber
    }
    function leave(userName, userNumber) {
        let body = document.querySelector('.chat__body')
        let newMsg = document.createElement('p')
        newMsg.innerHTML = userName + '退出了聊天室'
        body.appendChild(newMsg)
        document.querySelector('.chat__userNumber').innerHTML = userNumber
    }
}