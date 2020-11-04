import React from 'react'
import { Link } from 'react-router-dom'

const HeaderMenu = () => {
    return (
        <React.Fragment>
            <div style={{height:"100%",width:"20%",float:"left"}}>
                <Link to="/listGroups">List Group Discounts</Link>
            </div>
            <div style={{height:"100%",width:"20%",float:"left"}}>
                <Link to="/createGroup">Create Group Discount</Link>
            </div>
        </React.Fragment>
    );
}

export default HeaderMenu;