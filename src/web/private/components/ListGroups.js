import React from 'react'
import $ from '../jquery-3.5.1.min'

class ListGroups extends React.Component {
    constructor() {
        super();
        this.deleteGroup = this.deleteGroup.bind(this);
        this.loadGroups = this.loadGroups.bind(this);

        this.state = {
            groupIds: []
        }
    }

    componentDidMount() {
        this.loadGroups();
    }

    loadGroups() {
        let serverAns;
        $.ajax({
            url: '/ajax/getGroups',
            type: 'post',
            success: (msg) => serverAns = msg,
            complete: (() => {
                if (serverAns && serverAns.groups) {
                    this.groups = serverAns.groups;
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

    printRules(rules) {
        let ret = '';
        for(var i = 0; i < rules.length; i++) {
            ret += `${rules[i].requirePeople}+: ${rules[i].discount}%;\n`;
        }
        return ret;
    }

    render() {

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