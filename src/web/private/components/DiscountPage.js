import React from 'react'
import $ from '../jquery-3.5.1.min'

class DiscountPage extends React.Component {
    constructor() {
        super();
        this.loadGroup = this.loadGroup.bind(this);
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
        let data = { ids: [id] };
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
        // ev.preventDefault();
        let userSubscription = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            groupId: this.groupId
        };

        // console.log('Create: ', group);
        let serverAns;
        let data = { subscription: userSubscription };
        console.log('Subscribe: ', data);
        // $.ajax({
        //     url: '/ajax/subscribe',
        //     dataType: 'json',
        //     type: 'post',
        //     contentType: 'application/json',
        //     data: JSON.stringify(data),
        //     success: (msg) => serverAns = msg,
        //     complete: (() => {
        //         this.setState({
        //             subscribed: true
        //         });
        //     }).bind(this)
        // });
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
        return (
            <React.Fragment>
                <div style={{ height: "20%", width: "100%", fontSize: "32px", fontWeight: "bold" }}>
                    {this.group.university} Group Discount Sign-up
                </div>
                <div style={{ height: "60%", width: "100%" }}>
                    <div style={{ height: "100%", width: "40%", float: "left" }}>
                        Add your name to the group by midnight Saturday, 1st of December 2018. After the deadline, once we have reached 50 sign-ups, we will open the group discount for you to purchase your discounted XXXXX access!
                    </div>
                    <div style={{ height: "100%", width: "40%", float: "right" }}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                First name:
                                <input type="text" ref={this.firstNameInput} />
                            </label>
                            <label>
                                Last name:
                                <input type="text" ref={this.lastNameInput} />
                            </label>
                            <label>
                                Email
                                <input type="text" ref={this.emailInput} />
                            </label>
                            <input type="submit" value="Submit" />
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
