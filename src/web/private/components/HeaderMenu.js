import React from 'react'
import { Link } from 'react-router-dom'

const HeaderMenu = () => {
    return (
        <React.Fragment>
            <div style={{height:"50%",width:"100%",float:"left", fontSize:"30px", fontWeight:"bold", textAlign:"center"}}>
                Group Discounts Admin
            </div>
            <div style={{height:"48%",width:"20%",float:"left", textAlign:"center"}}>
                <Link to="/listGroups">List Group Discounts</Link>
            </div>
            <div style={{height:"48%",width:"20%",float:"left"}}>
                <Link to="/createGroup">Create Group Discount</Link>
            </div>
        </React.Fragment>
    );
}

export default HeaderMenu;