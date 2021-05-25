import Styled from 'styled-components'

const BaseGrid = Styled.div`
display: grid;
grid-template-columns: ${props => props.gridtemplatecolumns ? props.gridtemplatecolumns : ""};
grid-template-rows: ${props => props.gridtemplaterows ? props.gridtemplaterows : ""};
gap: 0px 0px;
grid-auto-rows: ${props => props.gridtemplateautorows ? props.gridtemplateautorows : ""};
overflow: hidden;
background: ${props => props.background ? props.background : ""};
gap: ${props => props.gap ? props.gap : "0em"};
padding: ${props => props.padding ? props.padding : "0px"};
margin: auto;
background-repeat: no-repeat;
background-size: cover;
object-fit: cover;
height: ${props => props.height ? props.height : ""};
width: auto;
-webkit-background-style: cover;
-moz-background-style: cover;
-o-background-size: cover;
${props => props.noMedia ?
"" : `@media (max-width: 499.99px)
and (max-width: 1024px) {
    grid-template-columns: 100%;
    padding: 0px;
}`}

`
export default BaseGrid;