function isValidForm(){
    valido = document.getElementById('validadorNombre');
    if($form.nombre.value.length==0){
        valido.innerText = "Tiene que escribir su nombre de usuario";
        $form.nombre.focus()
        return false;
    }

    //emailregex permite validar email
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    valido = document.getElementById('validadorEmail');
    if($form.email.value.length==0 || !(emailRegex.test(email.value))){
        valido.innerText = "Tiene que escribir un email valido";
        $form.email.focus()
        return false;
    }

    return true
}


const $form = document.querySelector('#form') 
$form.addEventListener('submit', handleSubmit)

async function handleSubmit(event){
    
    event.preventDefault();

    
    const form = new FormData(this);
    if(isValidForm()){
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            'Accept': 'application/json'
        }
    })
    if(response.ok){
        this.reset();
        alert('Gracias por contactarte con nosotros');
    }
    }

}






