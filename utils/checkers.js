module.exports.emailCheck = email => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}

module.exports.passwordCheck = password => {
    return /[A-Z]/.test(password) && /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password) && password.length >= 8
}