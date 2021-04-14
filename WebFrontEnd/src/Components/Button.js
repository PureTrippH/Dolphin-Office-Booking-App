import React from "react";
import styled from "styled-components";


const StyledButton = styled.button`
border-width: 5px;
border-color: #787473;
border-radius:10px;
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