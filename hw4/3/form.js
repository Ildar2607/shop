window.onload = () => {
    submit();
}

function submit() {
    let form = document.querySelector('.form')
    let filds = document.querySelectorAll('input')
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        filds.forEach(elem => {
            let result = validate(elem)
            if(!result) {
                elem.parentNode.classList.add('not-valid')
                elem.parentNode.classList.remove('is-valid')
            } else {
                elem.parentNode.classList.add('is-valid')
                elem.parentNode.classList.remove('not-valid')
            }
        })
    })
}

function validate(elem) {
    let type = elem.getAttribute('name')
    let val = elem.value
    switch(type) {
        case 'firstname' :
            const optionName = /^[a-zа-я0-9 _.]+$/gi
            if(optionName.test(val)) {
                console.log(optionName.test(val));
                return true
            }
            return false;
        case 'phone' :
            const optionPhone = /^\+7\(\d{3}\)\d{3}-\d{4}$/g     //+7(000)000-0000.
            if(optionPhone.test(val)) {
                return true
            }
            return false;
        case 'email' :
            const optionEmail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/ig //E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru
            if(optionEmail.test(val)) {
                return true
            }
            return false;
            
    }
}