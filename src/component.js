import React from "react";
import PropTypes from 'prop-types'
import "./component.scss"

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            checkedList:[]
        };
    }

    clean(){
        this.setState({checkedList:[]}, this.fireOnChange.bind(this))
    }

    changeCheckboxStatus(e, item) {
        let checkedList =this.state.checkedList;
        if (e.target.checked){
             checkedList.push(item.value)
            this.setState({checkedList}, this.fireOnChange.bind(this))
        }else{
            checkedList = checkedList.filter(val=>val !== item.value)
            this.setState({ checkedList }, this.fireOnChange.bind(this))
        }
    }

    fireOnChange(){
        const {onChange, data} = this.props
        const checkedItems = data.filter(p=>this.state.checkedList.includes(p.value))
        onChange && onChange(checkedItems)
    }

    render() {
        const {data} = this.props;
        return (
            <ul className={'se-react-checkbox-group ' + (this.props.className || '')}>
                {data.map(item => {
                    const id = 'se-react-checkbox-group-box' + item.value;
                    return (
                        <li key={item.value}>
                            <input type="checkbox" id={id} value={item.value}
                                   checked={this.state.checkedList.includes(item.value)} onChange={e => this.changeCheckboxStatus(e, item)}/>
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
