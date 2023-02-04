import React from "react";


export default function DatePicker(props) {

    return (
        
            <div className="datepicker_item">
                <label className="datepicker_item__label" htmlFor={props.htmlFor}>{props.id}:</label>
                <input className="datepicker_item__input" onChange={props.handleChange} type={props.type} id={props.id} name={props.name}
                    //value={props.value}
                    min={props.curentDateMin} max={props.curentDateMax}>                    
                    </input>
            </div>                        
        
    )

}
