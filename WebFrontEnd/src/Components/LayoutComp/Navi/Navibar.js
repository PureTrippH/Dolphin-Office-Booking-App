import React from 'react';
import Button from "../../Button";

const Navibar = (props) => {
    const Buttons = this.props.Map(button => {
        return (
            <Button>
                <p>{button.text}</p>
            </Button>
        )
    })
    return (
        <div className="MasterGrid" style={{"display": "grid", "gridTemplateColumns": "30%, 90%"}}>
            <div className="Naviarea" style={{"display": "grid"}}>
                {Buttons}
            </div>
        </div>
    )
}