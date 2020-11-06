import React from 'react'
import $ from '../jquery-3.5.1.min'

const inputStyle = { width: "99%", border: "none", borderBottom: "2px solid black" };

class DiscountPage extends React.Component {
    constructor() {
        super();
        this.loadGroup = this.loadGroup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateDiscountTable = this.generateDiscountTable.bind(this);
        this.generateCurrentDiscountText = this.generateCurrentDiscountText.bind(this);

        this.state = {
            dataLoaded: false,
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
        let data = { filter: { ids: [id] } };
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
                    this.getNumberOfSubscribers(id);
                }
            }).bind(this)
        });
    }

    generateDiscountTable() {
        let rules = this.group.discountRules;
        return (
            <table style={{width:"100%", border: "1px solid black", textAlign:"center", marginTop:"20px"}}>
                <tbody>
                    <tr>
                        <th colSpan="2">Check our discount rules</th>
                    </tr>
                    {rules.map((rule, index) => {
                            const { requirePeople, discount} = rule;
                            return (
                                <tr key={index}>
                                    <td>{`${requirePeople}+ people`}</td>
                                    <td>{`${discount}% discount`}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        );
    }

    generateCurrentDiscountText() {
        let rules = this.group.discountRules;
        let currentPeople = this.numberOfSubscribers;

        if(currentPeople == 0) {
            return <span> <span style={{fontWeight:"bold"}}>Be the first one</span> to subscribe!</span>
        }
        if(currentPeople>=rules[rules.length-1].requirePeople) {
            return <span> Lucky you! Join the {currentPeople} subscribers to <span style={{fontWeight:"bold"}}>get the top {rules[rules.length-1].discount}% discount</span>!</span>
        }
        for(var i=0;i<rules.length;i++) {
            if(currentPeople >= rules[i].requirePeople) {
                continue;
            }
            let missingPeople = rules[i].requirePeople-currentPeople;
            return <span> We currently have {currentPeople} subscribers. <span style={{fontWeight:"bold"}}> Only {missingPeople} more </span>to activate the {rules[i].discount}% discount!</span>
        }
    }

    getNumberOfSubscribers(id) {
        let serverAns;
        let data = { id: id };
        $.ajax({
            url: '/ajax/getNumberOfSubscribers',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: (msg) => serverAns = msg,
            complete: (() => {
                this.numberOfSubscribers = serverAns;
                this.setState({
                    dataLoaded: true
                });
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
        let serverAns;
        let data = { subscription: userSubscription };
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
        } else if (!this.state.dataLoaded) {
            return (
                <div>
                    LOADING
                </div>
            );
        }
        const endDateStr = (new Date(this.group.endDate)).toDateString();
        return (
            <React.Fragment>
                <div style={{ height: "10%", width: "100%", fontSize: "32px", fontWeight: "bold", backgroundColor: "#26D5A9", textAlign: "center" }}>
                    {this.group.university} Group Discount Sign-up
                </div>
                <div style={{ height: "60%", width: "100%", float: "left", marginTop: "50px" }}>
                    <div style={{ height: "100%", width: "50%", float: "left", fontSize: "32px" }}>
                        {`Add your name to the group by `}<span style={{ fontWeight: "bold" }}>{`${endDateStr}`}</span>{`. After the deadline, once we have reached enough sign-ups, we will open the group discount for you to purchase your discounted access!`}
                        {this.generateDiscountTable()}
                        {this.generateCurrentDiscountText()}
                    </div>
                    <div style={{ height: "100%", width: "40%", float: "right" }}>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                First name:
                                <input type="text" ref={this.firstNameInput} style={inputStyle} />
                            </label>
                            <label>
                                Last name:
                                <input type="text" ref={this.lastNameInput} style={inputStyle} />
                            </label>
                            <label>
                                Email
                                <input type="text" ref={this.emailInput} style={inputStyle} />
                            </label>
                            <div style={{ width: "100%", height: "30px", textAlign: "center", marginTop: "10px" }}>
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
