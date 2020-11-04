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
                <div style={{ height: "10%", width: "100%" }}>
                    <HeaderMenu />
                </div>
                <div style={{ height: "80%", width: "100%" }}>
                    {this.props.children}
                </div>
                <div style={{ height: "10%", width: "100%" }}>
                    <Footer />
                </div>
            </React.Fragment>
        )

    }
}

export default Layout;