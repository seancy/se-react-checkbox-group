import React from "react";
import PropTypes from 'prop-types'
import "./component.scss"

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            data: props.data.map(p=>({...p, checked:false})),
        };
    }

    changeCheckboxStatus(e, item) {
        this.setState(prevState=>{
            const data = [...prevState.data]
            //data.filter(p => p.value == item.value);
            return data;
        },()=>{
            const {onChange} = this.props
            if (onChange){
                onChange(this.state.data);
            }
        })
        item.checked = e.target.checked;
    }

    render() {
        const {} = this.state;
        return (
            <ul className={'se-react-checkbox-group ' + (this.props.className || '')}>
                {this.state.data.map(item => {
                    const id = 'se-react-checkbox-group-box' + item.value;
                    return (
                        <li key={item.value}>
                            <input type="checkbox" id={id} value={item.value}
                                   checked={item.checked} onChange={e => this.changeCheckboxStatus(e, item)}/>
                            <label htmlFor={id}>{item.text}</label>
                        </li>
                    )
                })}
            </ul>
        );
    }
}

export default Component;

Component.propTypes = {
    data:PropTypes.arrayOf(PropTypes.exact({
        value:PropTypes.string,
        text:PropTypes.string
    })),
    onChange:PropTypes.func,
}
