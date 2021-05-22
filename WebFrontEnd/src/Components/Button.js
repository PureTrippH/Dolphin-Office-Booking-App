import React from "react";
import styled from "styled-components";


const StyledButton = styled.button`
border-width: 5px;
display: block;
border-color: #de9ba6;
border-radius:10px;
margin: 0 auto;
background-color: rgba(255,255,255,0.1);
align-content: center;
font-size: 0.5fr;
`

const Button = (props) => {
    return(
        <div>
            <StyledButton onClick={props.clickEvent}>
            {props.children}
                </StyledButton>
        </div>
    );
}
export default Button;