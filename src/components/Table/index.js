import React from 'react'
import { Link } from 'react-router-dom'
import './table.css'

class DataTable extends React.Component {
    constructor(props) {
        super(props)

        this.rederStatus = this.rederStatus.bind(this)
    }

    rederStatus(status) {
        // alert(status)
        if (status === 'A') {
            return <td style={{ backgroundColor: "green" }}>A</td>
        }
        else if (status === 'R') {
            return <td style={{ backgroundColor: "red" }}>R</td>
        }
        else if (status === 'C') {
            return <td style={{ backgroundColor: "yellow" }}>C</td>
        }
        else {
            return <td style={{ backgroundColor: "white" }}>P</td>
        }
    }

    render() {
        let item = this.props.item
        let func_update = this.props.isUpdate

        return (
            <tr key={item.id} className='tr'>
                <td>{item.id}</td>
                <td className='td-link'><
                    Link to={`Sobre/${item.id}`}> {item.code}</Link>
                </td>
                <td>{item.create_at.substr(0, 10)}</td>
                <td>{item.deadline.substr(0, 10)}</td>
                {this.rederStatus(item.status)}
                <td>{item.total.toFixed(2)}</td>
                <td>{item.client}</td>

                {/* <td><Link to={`Sobre/${item.id}`}> Detalhar</Link></td> */}
                <td>

                    {/* <Link to={`Editar/${item.id}`}> Editar</Link> */}
                    <div className='btns'>
                        <button className='btn-aprovar' onClick={() => func_update(item.id, item.status, true)} >Aprovar</button>
                        <button className='btn-reprovar' onClick={() => func_update(item.id, item.status, false)} >Reprovar</button>
                    </div>

                </td>

            </tr>

        )
    }
}
export default DataTable