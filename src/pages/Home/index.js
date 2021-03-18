import React from 'react'
import DataTable from '../../components/Table'

import './home.css'

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pedidos: [],
            busca: ''
        }
        this.loadpedidos = this.loadpedidos.bind(this)
        this.isUpdate = this.isUpdate.bind(this)
        this.buscar = this.buscar.bind(this)
    }

    componentDidMount() {
        this.loadpedidos()
    }

    // componentDidUpdate(prevState) {

    //     if (this.state.msg !== prevState.msg) {

    //     }

    // }

    loadpedidos() {

        // let url = 'http://127.0.0.1:8000/api/apipedidos/?format=json'
        let url = 'https://claudiomorais.herokuapp.com/api/apipedidos/?format=json'
        fetch(url)
            .then((resp) => resp.json())
            .then((json) => {
                this.setState({ pedidos: json })
                // console.log(json)
            })
    }

    isUpdate(uid, status, flag) {

        if (status !== 'P') {
            alert(`Pedido não consta como pendente \nPedido id: ${uid} \n status: ${status}`)
            return
        }

        // let url = `http://127.0.0.1:8000/api-pedidos/apipedidos/${uid}/?format=json`
        let url = `https://claudiomorais.herokuapp.com/api/apipedidos/${uid}/?format=json`
        let data = {
            id: parseInt(uid),
            status: flag ? 'A' : 'R',
        }

        let resquestInfo = {
            method: 'PATCH',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }

        fetch(url, resquestInfo)
            .then((response) => response.json())
            .then((json) => {
                window.location.reload();
            })
            .catch(e => console.log(e))

        // window.location.reload();
    }

    buscar(uid) {
        // let { pedidos } = this.state

        if (uid === '') {
            const url = 'https://claudiomorais.herokuapp.com/api/apipedidos/?format=json'

            fetch(url)
                .then((resp) => resp.json())
                .then((j) => {
                    this.setState({ pedidos: j })
                })
                .catch(() => {
                    let erro = {
                        code_error: '404',
                        desc_error: 'Não foi possivel conectar na API'
                    }
                })
        } else {
            const url = `https://claudiomorais.herokuapp.com/api/apipedidos/${uid}/?format=json`
            fetch(url)
                .then((resp) => resp.json())
                .then((j) => {
                    let data = [j]
                    this.setState({ pedidos: data })
                    console.log(j)
                })
                .catch(() => {
                    let erro = {
                        code_error: '404',
                        desc_error: 'Não foi possivel conectar na API'
                    }
                })
        }
    }

    render() {
        return (
            <div className='container'>
                <h2>Simples painel para testar o funcionamento da API</h2>
                <p> URL = 'https://claudiomorais.herokuapp.com/api/apipedidos/'  </p>
                <h3>Funcionalidade</h3>
                <p>
                    Este Painel é apenas para testar os metodos <strong>GET, PATCH.</strong>
                    Api disponibiliza o CPF do cliente para ser verificado
                    a situação do nome do cliente (Score, negativado, etc...).
                    A partir dessa validação pode alterar o status do pedido
                    de pendente para aprovado ou reprovado.
                    observe que são entregues pelo endpoit apenas dados cujo
                    a forma de pagamento seja igual a BP - (Boleto-Parcelado) e status pendente.
                </p>
                <hr />
                <div className='ipt' >
                    <input type='text' placeholder='Busca pela id' className='busca' onChange={(v) => this.setState({ busca: v.target.value })} />
                    <button type='button' className='btn-busca' onClick={() => this.buscar(this.state.busca)} >pesquisar</button>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>PEDIDO</th>
                            <th>CRIADO</th>
                            <th>ENTREGA</th>
                            <th>STATUS</th>
                            <th>VALOR</th>
                            <th>CPF A ANALISAR</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>
                    {this.state.pedidos.map((item) => {
                        return (
                            <tbody key={item.id}>
                                <DataTable item={item} isUpdate={this.isUpdate} />
                            </tbody>
                        )
                    })}
                </table>
            </div>
        )
    }
}
export default Home

// client: "91925681491"
// code: "900299"
// create_at: "2021-09-24T16:22:57-03:00"
// deadline: "2021-09-24T16:22:57-03:00"
// id: 200
// payment: "BP"
// status: "A"
// total: 189.8