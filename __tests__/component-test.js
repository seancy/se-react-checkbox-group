import React from 'react'
import {cleanup, fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import CheckboxGroup from '../src/component'
import {arr1} from "../src/data"

afterEach(cleanup)

it('set default items - checkedList property', () => {
    let selectedItems = []
    const defaultValue = 'a1'

    const renderResult = render(<CheckboxGroup data={arr1} checkedList={[defaultValue]}
                                               onChange={items => selectedItems = items}/>)
    expect(selectedItems && selectedItems.length > 0 ? selectedItems[0].value : '').toBe(defaultValue)
})


it('check on two items - data property - onChange event', () => {
    let selectedItems = []

    const renderResult = render(<CheckboxGroup data={arr1} onChange={items => selectedItems = items}/>)
    const {queryByLabelText, getByLabelText, queryByDisplayValue} = renderResult

    expect(getByLabelText('address')).toBeInTheDocument()

    fireEvent.click(getByLabelText('city'))
    fireEvent.click(getByLabelText('country'))

    const items = selectedItems && selectedItems.length>0 ? selectedItems:[]
    expect((items[0] || {}).value).toBe('a2')
    expect((items[1] || {}).value).toBe('a4')
})


it('clean selected items', () => {
    let selectedItems = []

    const myRef = React.createRef()
    const clean = ()=>{
        myRef.current.clean();
    }

    const renderResult = render(<><CheckboxGroup ref={myRef}
        data={arr1} onChange={items => selectedItems = items}/>
        <button  data-testid="clean" onClick={clean}>clean</button>
        </>)
    const {getByLabelText, getByTestId} = renderResult

    fireEvent.click(getByLabelText('city'))
    fireEvent.click(getByLabelText('country'))

    expect(selectedItems.length).toBe(2)

    fireEvent.click(getByTestId('clean'))

    expect(selectedItems.length).toBe(0)
})
