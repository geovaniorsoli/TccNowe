const conteinerMsg = document.querySelector('.msg')
const table        = document.querySelector('#table')
const url          = "http://localhost:3308";



window.addEventListener('load', async (e) => {
  const logado = new Logado()
  if(!(await logado.userLogado())){
    return window.location.assign('http://127.0.0.1:5500/FrontEnd/index.html')
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
            body: myBody,
        })

        if(response.status !== 200) return false

        return true
      }catch(e){
        console.log("erro");
      }
  }
  
}

class TableContas{
    constructor(){}

    msg(msg){
        conteinerMsg.classList.add('errors')
        return conteinerMsg.innerHTML = msg
    };

    token(){
      const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            .split("=")[1];
      return token 
    }

    async getApi(){
        try{
          const auht = "Bearer " + String(document.cookie.split('=').pop())
           
          const myHeader = new Headers
          ({
                "Content-Type":  "application/json",
                "authorization": auht,
          })

          const response = await fetch(url + '/contas', {
            method: 'GET',
            mode: "cors",
            headers: myHeader
        });
          if(!response){
            return this.msg('Request Failed');
          }
          const data = await response.json();
          if(data.length <= 0 || !data){
            return this.msg('Não há nenhum valor cadastrado')
          }
          return data;
        }catch(e){
            this.msg(e);
        }
    };

    async createTable(){
        const response = await this.getApi()

        response.forEach(el => {
            const linha = document.createElement('tr')

            const {documento, valor, data_pagamento, data_vencimento, fornecedor, id} = el

            const doc   = document.createElement('td')
            const vl    = document.createElement('td')
            const dataP = document.createElement('td')
            const dataV = document.createElement('td')
            const forne = document.createElement('td')

            const edit = document.createElement('td')
            const delet = document.createElement('td')

            edit.setAttribute('id','edit')
            delet.setAttribute('id','delet')

            edit.setAttribute('value', id)
            delet.setAttribute('value', id)

            const txtDoc   = document.createTextNode(documento)
            const txtVl    = document.createTextNode(valor)
            const txtDataP = document.createTextNode(data_pagamento)
            const txtDataV = document.createTextNode(data_vencimento)
            const txtForne = document.createTextNode(fornecedor)

            const txtEdit = document.createTextNode('Edit')
            const txtDelet = document.createTextNode('Delete')

            doc.appendChild(txtDoc)
            vl.appendChild(txtVl)
            dataP.appendChild(txtDataP)
            dataV.appendChild(txtDataV)
            forne.appendChild(txtForne)

            edit.appendChild(txtEdit)
            delet.appendChild(txtDelet)

            linha.appendChild(doc)
            linha.appendChild(vl)
            linha.appendChild(dataP)
            linha.appendChild(dataV)
            linha.appendChild(forne)

            linha.appendChild(edit)
            linha.appendChild(delet)

            table.append(linha)
        });
    }

    async deletApi(id){
      if(!id) return

      const confirm = window.confirm('Deseja excluir este registro ?')

      if(!confirm) return

      const token = this.token()

      const header = new Headers(
        {
          "Content-Type":  "application/json",
          "authorization": `Bearer ${token}` 
        }
      )
      const response = await fetch(`${url}/contas/${id}`, 
      {
        method: "DELETE",
        headers: header,
        mode: "cors"
      })

      return response
    }

    async events(e){
      const el = e.target

      if(el.getAttribute('id') === 'edit'){
        const id = el.getAttribute('value')
        const response = await this.updateApi(id)/
        console.log(response);
      }
      if(el.getAttribute('id') === 'delet'){
        const id = el.getAttribute('value')
        const response = await this.deletApi(id)
        if(response.status !== 200) return this.msg('Não foi possivel excluir este registro')
        return window.location.reload()
      }
    }

    async init(){
      this.createTable()
      document.addEventListener('click', (e) => this.events(e))
    };
}

const tabela = new TableContas();
tabela.init()
