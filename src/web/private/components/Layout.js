import React from 'react'
import HeaderMenu from './HeaderMenu.js'
import Footer from './Footer.js'

class Layout extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ height: "10%", width: "100%", backgroundColor:"#26D5A9" }}>
                    <HeaderMenu />
                </div>
                <div style={{ height: "85%", width: "100%"/*, backgroundColor:"#00B386" */}}>
                    {this.props.children}
                </div>
                <div style={{ height: "5%", width: "100%", backgroundColor:"#00D5A0" }}>
                    <Footer />
                </div>
            </React.Fragment>
        )

    }
}

export default Layout;