import React from 'react'
// import { Link } from 'react-router-dom'
import './sobre.css'

class Sobre extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pedido: []
        }

        this.rederStatus = this.rederStatus.bind(this)

    }

    componentDidMount() {
        const { id } = this.props.match.params
        // let url = `http://127.0.0.1:8000/api-pedidos/apipedidos/${id}/?format=json`
        let url = `https://claudiomorais.herokuapp.com/api/apipedidos/${id}/?format=json`
        fetch(url)
            .then((resp) => resp.json())
            .then((j) => {
                this.setState({ pedido: j })
                console.log(j)
            })
            .catch(() => {
                let erro = {
                    code_error: '404',
                    desc_error: 'Não foi possivel conectar na API'
                }
                this.setState({ pedido: erro })

            })
    }

    rederStatus(status) {
        // alert(status)
        if (status === 'A') {
            return <li style={{ backgroundColor: "green" }}>A - APROVADO</li>
        }
        else if (status === 'R') {
            return <li style={{ backgroundColor: "red" }}>R - REPROVADO</li>
        }
        else {
            return <li style={{ backgroundColor: "white" }}>P - PENDENTE</li>
        }
    }

    render() {
        let pedido = this.state.pedido
        return (
            <div className='container'>
                {
                    pedido.id ?
                        <ul>
                            <li>Pedido ID: {pedido.id} </li>
                            <li>Pedido: {pedido.code} </li>
                            <li>Criado: {pedido.create_at} </li>
                            <li>Entrega: {pedido.deadline} </li>
                            <li>Valor: {pedido.total} </li>
                            {/* <li>Staus: {pedido.status} </li> */}
                            {this.rederStatus(pedido.status)}
                            <li>Cliente: {pedido.client} </li>

                        </ul>
                        :
                        pedido.detail &&
                        <h1>{pedido.detail}</h1>
                }

                <h1>{pedido.code_error}</h1>
                <h1>{pedido.desc_error}</h1>

            </div>
        )
    }
}

export default Sobre