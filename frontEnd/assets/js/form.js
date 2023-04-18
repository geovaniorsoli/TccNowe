const form        = document.querySelector('.form');
const inpEmail    = document.querySelector('#email');
const inpPassword = document.querySelector('#password');
const conteinerMsg         = document.querySelector('.msg')

const url = 'http://localhost:3308'

window.addEventListener('load', async e => {
  const logado = new Logado()
  if(await logado.userLogado()){
    return window.location.assign('http://127.0.0.1:5500/FrontEnd/pages/tabela.html')
  }else{
    return
  }
})

class Logado{
  async userLogado(){
    try{
      if(!document.cookie) return false
      const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          .split("=")[1];
      const objBody = {token}
      const myBody = JSON.stringify(objBody)    
  
      const response = await fetch(url + '/token/logado', {
          method: "POST",
          headers: 
          {
            "Content-Type": "application/json",
          },
          body: myBody
      })
  
      if(response.status !== 200){
        const output = document.getElementById("cookies");
        output.textContent = "";
        return false
      } 
      return true
    }catch(e){
      console.log("erro");
    }
  }
  
}

class FormLogin{
    constructor(email, password){
        this.crateJsonBody(this.email, this.password)
        this.email = email;
        this.password = password;
    }
    crateJsonBody(){
      const obj = 
      {
        email: this.email,
        password: this.password
      }
      

      return this.body = JSON.stringify(obj)
    }

    validate(){
      return true
    };

    msg(msg){
        conteinerMsg.classList.add('errors')
        return conteinerMsg.innerHTML = msg
    };

    async postApi(){
        try{
          if(!this.validate()) return this.msg('Valores inválidos')
          const body = this.crateJsonBody()
          const response = await fetch(url + '/token', 
            {
              method: "POST",
              headers: 
                {
                  "Content-Type": "application/json",
                },
              body: body
                  
          });
          const data = await response.json();
          return data;
        }catch(e){
            this.msg(e);
        }
    };

    async init(){
      const response = await this.postApi();
      if(response.errors){
        this.msg(response.errors);
      }else{
        const token = response.token;
        const maxAge = 60*60*24*7
        document.cookie = `token=${token};max-age=${maxAge}; path=/`;
        window.location.reload()
      }
    };
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormLogin(inpEmail.value, inpPassword.value);
    form.init()
    return
})