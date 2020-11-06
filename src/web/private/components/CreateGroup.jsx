import React from 'react'
import $ from '../jquery-3.5.1.min'

const inputStyle = { width: "100%", border: "none", borderBottom: "2px solid black" };

class CreateGroup extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addRule = this.addRule.bind(this);
        this.generateRulesInput = this.generateRulesInput.bind(this);

        this.state = { numberOfRules: 1 };
        this.nameInput = React.createRef();
        this.university = React.createRef();
        this.startDate = React.createRef();
        this.endDate = React.createRef();
        this.rules = [{ requirePeople: React.createRef(), discount: React.createRef() }];
    }

    handleSubmit(ev) {
        // ev.preventDefault();
        let group = {
            name: this.nameInput.current.value,
            startDate: (new Date(this.startDate.current.value)).getTime(),
            endDate: (new Date(this.endDate.current.value)).getTime(),
            university: this.university.current.value,
            discountRules: []
        };
        for (var i = 0; i < this.rules.length; i++) {
            let rule = {
                requirePeople: this.rules[i].requirePeople.current.value,
                discount: this.rules[i].discount.current.value
            };
            group.discountRules.push(rule);
        }
        // console.log('Create: ', group);
        let serverAns;
        let data = { group: group };
        $.ajax({
            url: '/ajax/createGroup',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: (msg) => serverAns = msg,
            complete: (() => {

            }).bind(this)
        });
    }

    addRule() {
        this.rules.push({ requirePeople: React.createRef(), discount: React.createRef() });
        this.setState({ numberOfRules: this.state.numberOfRules + 1 });
    }

    generateRulesInput() {
        return this.rules.map((rule, index) => (<React.Fragment>
            <label>
                Require People:
                <input type="text" ref={rule.requirePeople} style={inputStyle} />
            </label>
            <label>
                Discount (%):
                <input type="text" ref={rule.discount} style={inputStyle} />
            </label>
        </React.Fragment>))
    }

    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                <div style={{ width: "100%", height: "5%", float: "left", textAlign: "center", marginTop: "10px" }}>
                    Create new Group Discount
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" ref={this.nameInput} style={inputStyle} />
                    </label>
                    <label>
                        University:
                        <input type="text" ref={this.university} style={inputStyle} />
                    </label>
                    <label>
                        Start Date:
                        <input type="text" ref={this.startDate} style={inputStyle} />
                    </label>
                    <label>
                        End Date:
                        <input type="text" ref={this.endDate} style={inputStyle} />
                    </label>
                    <div style={{width:"100%", height:"30px", marginTop:"20px"}}>
                        <span style={{float:"left", border:"1px solid black", borderRadius:"5px"}} onClick={this.addRule}>+ Add Rule&nbsp;</span>
                        <span style={{float:"left", width:"40%", marginLeft:"20px"}}>Rules:</span>
                    </div>
                    <label>
                        {this.generateRulesInput()}
                    </label>
                    <div style={{width:"100%", height:"30px", textAlign:"center", marginTop:"10px"}}>
                        <input type="submit" value="Create Group Discount" />
                    </div>
                </form>
            </div>
        );
    }
}
export default CreateGroup;