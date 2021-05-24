import Styled from 'styled-components'

const Header = (props) => {
    return(
        <div>
        <h2 style={{"position": "relative", "fontFamily": "Alfa Slab One", "margin": "auto", "backgroundColor": "#cc7464", "border": "groove #914133", "boxShadow": "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>{props.text}
        </h2>
        {props.children}
      </div>
    )
}

export default Header;