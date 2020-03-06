import React from "react";
import { render } from "react-dom";
import Component from "./component";

const styles = {
  fontFamily: "sans-serif",
};

const arr = [
    { value:'a0', text:'name' },
    { value:'a1', text:'address' },

]
const arr1 = [
    { value:'a0', text:'name' },
    { value:'a1', text:'address' },
    { value:'a2', text:'city' },
    { value:'a3', text:'gender' },
    { value:'a4', text:'country' },

]

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data:arr,
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
        const {data}= this.state
        return (
          <div >
            <Component ref={this.myRef} data={data} onChange={this.handleChange.bind(this)} />
            <button onClick={this.clean.bind(this)}>clean selected items</button>
          </div>
        );
    }
}

render(<App />, document.querySelector(".root"));
