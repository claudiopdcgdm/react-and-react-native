import React from 'react'


class Editar extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        let { id } = this.props.match.params

        return (
            <div>
                Page editar {id}
            </div>
        )
    }
}

export default Editar