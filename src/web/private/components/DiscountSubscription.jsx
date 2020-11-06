import React from 'react'
import $ from '../jquery-3.5.1.min'

const inputStyle = { width: "99%", border: "none", borderBottom: "2px solid black" };

class DiscountPage extends React.Component {
    constructor() {
        super();
        this.loadGroup = this.loadGroup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            groupLoaded: false,
            subscribed: false
        };

        const pathname = window.location.pathname;
        const pathNameSplited = pathname.split('/');
        this.groupId = pathNameSplited[pathNameSplited.length - 1];

        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
    }

    componentDidMount() {
        this.loadGroup(this.groupId);
    }

    loadGroup(id) {
        let serverAns;
        let data = {filter: { ids: [id] }};
        $.ajax({
            url: '/ajax/getGroups',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: (msg) => serverAns = msg,
            complete: (() => {
                if (serverAns && serverAns.groups) {
                    this.group = serverAns.groups[id];
                    this.setState({
                        groupLoaded: true
                    });
                }
            }).bind(this)
        });
    }

    handleSubmit(ev) {
        ev.preventDefault();
        let userSubscription = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            groupId: this.groupId
        };

        console.log('Create: ', this.group);
        let serverAns;
        let data = { subscription: userSubscription };
        console.log('Subscribe: ', data);
        $.ajax({
            url: '/ajax/subscribe',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: (msg) => serverAns = msg,
            complete: (() => {
                this.setState({
                    subscribed: true
                });
            }).bind(this)
        });
    }

    render() {
        if (this.state.subscribed) {
            return (
                <div>
                    THANKS FOR SUBSCRIBING
                </div>
            );
        } else if (!this.state.groupLoaded) {
            return (
                <div>
                    LOADING
                </div>
            );
        }
        const endDateStr = (new Date(this.group.endDate)).toDateString();
        return (
            <React.Fragment>
                <div style={{ height: "10%", width: "100%", fontSize: "32px", fontWeight: "bold",backgroundColor:"#26D5A9", textAlign:"center" }}>
                    {this.group.university} Group Discount Sign-up
                </div>
                <div style={{ height: "60%", width: "100%", float: "left", marginTop:"50px" }}>
                    <div style={{ height: "100%", width: "50%", float: "left", fontSize:"32px" }}>
                        {`Add your name to the group by `}<span style={{fontWeight:"bold"}}>{`${endDateStr}`}</span>{`. After the deadline, once we have reached enough sign-ups, we will open the group discount for you to purchase your discounted access!`}
                    </div>
                    <div style={{ height: "100%", width: "40%", float: "right" }}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                First name:
                                <input type="text" ref={this.firstNameInput} style={inputStyle}/>
                            </label>
                            <label>
                                Last name:
                                <input type="text" ref={this.lastNameInput} style={inputStyle} />
                            </label>
                            <label>
                                Email
                                <input type="text" ref={this.emailInput} style={inputStyle} />
                            </label>
                            <div style={{width:"100%", height:"30px", textAlign:"center", marginTop:"10px"}}>
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
                <div style={{ height: "20%", width: "100%" }}>

                </div>
            </React.Fragment>
        )
    }
}


export default DiscountPage;
