import React, { Children } from "react";
import { AiFillPropertySafety } from "react-icons/ai";

function Popup(props){
    return (props.tirgger)?(
      <div className="popup">
        <div className="popup-inner">
            <button className="close-btn">close</button>
            {props.Children}

        </div>


      </div>
    ):"";
        



}

export default Popup;