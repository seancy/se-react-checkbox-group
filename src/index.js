import React from "react";
import { render } from "react-dom";
import Component from "./component";
import {arr1} from "./data"

const styles = {
  fontFamily: "sans-serif",
};


class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data:[], //arr,
            selectedItems:[]
        }
        setTimeout(()=>{
            this.setState({data:arr1})
        },1000)
        this.myRef = React.createRef()
    }

    handleChange(selectedItems){
        this.setState({
            selectedItems
        },()=>{
            console.log(this.state.selectedItems)
        })
    }

    clean(){
        this.myRef.current.clean();
    }

    render(){
        return (
          <div >
            <Component ref={this.myRef} data={arr1} checkedList={['a1']} prefire={false}
                       optionRender={(text)=>text}
                       onChange={this.handleChange.bind(this)} />
            <button onClick={this.clean.bind(this)}>clean selected items</button>
          </div>
        );
    }
}

render(<App />, document.querySelector(".root"));
