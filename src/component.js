import React from "react";
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CheckboxWrapper = styled.ul`
    list-style: none;
    padding:0;
    margin:0;
    
    li {
        display: inline-block;
        width: 20%;
    }
`

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        const checkedList = props.checkedList || []

        this.state = {
            checkedList
        };
    }

    componentDidMount() {
        if (this.props.data.length > 0 && (this.props.checkedList || []).length > 0){
            this.fireChange()
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data.length > 0 &&
            JSON.stringify(this.props.data) != JSON.stringify(nextProps.data) &&
            (this.props.checkedList || []).length > 0){
            setTimeout(this.fireChange.bind(this), 100)
        }
    }

    clean(){
        this.setState({checkedList:[]}, this.fireChange.bind(this))
    }

    changeCheckboxStatus(e, item) {
        let checkedList =this.state.checkedList;
        if (e.target.checked){
             checkedList.push(item.value)
            this.setState({checkedList}, this.fireChange.bind(this))
        }else{
            checkedList = checkedList.filter(val=>val !== item.value)
            this.setState({ checkedList }, this.fireChange.bind(this))
        }
    }

    fireChange(){
        const {onChange, data} = this.props
        const checkedItems = data.filter(p=>this.state.checkedList.includes(p.value))
        onChange && onChange(checkedItems)
    }

    render() {
        const {data} = this.props;
        return (
            <CheckboxWrapper className={'se-react-checkbox-group ' + (this.props.className || '')}>
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
            </CheckboxWrapper>
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
