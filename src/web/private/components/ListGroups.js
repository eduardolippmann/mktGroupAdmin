import React from 'react'
import $ from '../jquery-3.5.1.min'
import { Link } from 'react-router-dom'

class ListGroups extends React.Component {
    constructor() {
        super();
        this.deleteGroup = this.deleteGroup.bind(this);
        this.loadGroups = this.loadGroups.bind(this);
        this.loadSubscribers = this.loadSubscribers.bind(this);
        this.finalizeGroup = this.finalizeGroup.bind(this);
        this.hideSubscribes = this.hideSubscribes.bind(this);
        this.showSubscribes = this.showSubscribes.bind(this);

        this.state = {
            groupIds: [],
            loadComplete: false
        }
    }

    componentDidMount() {
        this.loadGroups();
    }

    loadGroups() {
        let serverAns;
        let filter = {filter: {all:true}};
        $.ajax({
            url: '/ajax/getGroups',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(filter),
            success: (msg) => serverAns = msg,
            complete: (() => {
                console.log(serverAns);
                if (serverAns && serverAns.groups) {
                    this.groups = serverAns.groups;
                    this.loadSubscribers()
                    this.setState({
                        groupIds: Object.keys(this.groups)
                    });
                }
            }).bind(this)
        });
    }

    deleteGroup(id) {
        let serverAns;
        let data = {id:id};
        $.ajax({
            url: '/ajax/deleteGroup',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: (msg) => serverAns = msg,
            complete: (() => {
                this.loadGroups();
            }).bind(this)
        });
    }

    finalizeGroup(id) {
        let serverAns;
        let data = {id:id};
        $.ajax({
            url: '/ajax/finalizeGroup',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: (msg) => serverAns = msg,
            complete: (() => {
                this.deleteGroup(id);
            }).bind(this)
        });
    }

    loadSubscribers() {
        let serverAns;
        $.ajax({
            url: '/ajax/getSubscribers',
            type: 'post',
            success: (msg) => serverAns = msg,
            complete: (() => {
                this.subscribers = serverAns;
                this.setState({
                    loadComplete: true
                });
            }).bind(this)
        });
    }

    hideSubscribes(id) {

    }

    showSubscribes(id) {
        let subsToShow = this.subscribers[id] || [];
        for(var i = 0; i < subsToShow.length; i++) {
            console.log(`${subsToShow[i].lastName}, ${subsToShow[i].firstName} : ${subsToShow[i].email}`);
        }
    }

    printRules(rules) {
        let ret = '';
        for(var i = 0; i < rules.length; i++) {
            ret += `${rules[i].requirePeople}+: ${rules[i].discount}%;\n`;
        }
        return ret;
    }

    render() {
        if(!this.state.loadComplete) {
            return(
                <div>
                    LOADING
                </div>
            );
        }
        return (
            <React.Fragment>
                <table id='students'>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>UNIVERSITY</th>
                            <th>START DATE</th>
                            <th>END DATE</th>
                            <th>DISCOUNT RULES</th>
                            <th>SUBSCRIBERS</th>
                            <th>LANDING PAGE</th>
                        </tr>
                        {this.state.groupIds.map((id) => {
                            const { name, university, startDate, endDate, discountRules } = this.groups[id]; //destructuring
                            return (
                                <tr key={id}>
                                    <td onClick={(()=>this.deleteGroup(id))}>X</td>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{university}</td>
                                    <td>{startDate}</td>
                                    <td>{endDate}</td>
                                    <td>{this.printRules(discountRules)}</td>
                                    <td onMouseEnter={(()=>this.showSubscribes(id))} onMouseLeave={(()=>this.hideSubscribes(id))}>{this.subscribers[id] ? this.subscribers[id].length : 0}</td>
                                    <td><Link to={`/discountPage/${id}`}>Link</Link></td>
                                    <td><button onClick={(()=>this.finalizeGroup(id))}>Finalize</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}


export default ListGroups;