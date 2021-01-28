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

class CheckboxGroup extends React.Component {
    constructor(props, context) {
        super(props, context);

        const checkedList = props.checkedList || []

        this.state = {
            prefire: props.prefire,
            checkedList
        };
    }

    componentDidMount() {
        if (this.props.data.length > 0 && (this.props.checkedList || []).length > 0 && this.state.prefire){
            this.fireChange()
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.data.length > 0 &&
            JSON.stringify(this.props.data) != JSON.stringify(nextProps.data) &&
            (this.props.checkedList || []).length > 0 && this.state.prefire) {
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
        const {data, optionRender} = this.props;
        const getItemText=(item)=>{
            return optionRender ? optionRender(item.text, item) : (item.text || item.value)
        }

        return (
            <CheckboxWrapper className={'se-react-checkbox-group ' + (this.props.className || '')}>
                {data.map(item => {
                    const id = 'se-react-checkbox-group-box' + item.value;
                    return (
                        <li key={item.value}>
                            <input type="checkbox" id={id} value={item.value}
                                   checked={this.state.checkedList.includes(item.value)} onChange={e => this.changeCheckboxStatus(e, item)}/>
                            <label htmlFor={id} title={getItemText(item)}>{getItemText(item)}</label>
                            {item.label && <span>{item.label}</span>}
                        </li>
                    )
                })}
            </CheckboxWrapper>
        );
    }
}

export default CheckboxGroup;

CheckboxGroup.propTypes = {
    data:PropTypes.arrayOf(PropTypes.shape({
        value:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        text:PropTypes.string,
        label:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    })),
    prefire:PropTypes.bool,
    checkedList:PropTypes.arrayOf(PropTypes.string),
    onChange:PropTypes.func,
}
