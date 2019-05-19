import React from "react";
import './groupheader.css'

const GroupHeader = props => {
    return (
        <div>
            <div className={'group-header-container-title'}>
                <label className={'title-group-header-style'}>{props.title}</label>
            </div>
            <div className={'group-header-divisor'}>
                
            </div>
        </div>
    );
};

export default GroupHeader;