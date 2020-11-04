import React from 'react'
import $ from '../jquery-3.5.1.min'

class CreateGroup extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addRule = this.addRule.bind(this);
        this.generateRulesInput = this.generateRulesInput.bind(this);

        this.state = {numberOfRules:1};
        this.nameInput = React.createRef();
        this.university = React.createRef();
        this.startDate = React.createRef();
        this.endDate = React.createRef();
        this.rules = [{requirePeople:React.createRef(), discount: React.createRef()}];
    }

    handleSubmit(ev) {
        // ev.preventDefault();
        let group = {
            name : this.nameInput.current.value,
            startDate: this.startDate.current.value,
            endDate: this.endDate.current.value,
            university: this.university.current.value,
            discountRules : []
        };
        for(var i = 0; i < this.rules.length; i++) {
            let rule = {
                requirePeople: this.rules[i].requirePeople.current.value,
                discount: this.rules[i].discount.current.value
            };
            group.discountRules.push(rule);
        }
        // console.log('Create: ', group);
        let serverAns;
        let data = {group:group};
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
        this.rules.push({requirePeople:React.createRef(), discount: React.createRef()});
        this.setState({numberOfRules:this.state.numberOfRules+1});
    }

    generateRulesInput() {
        return this.rules.map((rule, index)=>(<React.Fragment>
            <label>
                Require People:
                <input type="text" ref={rule.requirePeople} />
            </label>
            <label>
                Discount (%):
                <input type="text" ref={rule.discount} />
            </label>
        </React.Fragment>))
    }

    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" ref={this.nameInput} />
                    </label>
                    <label>
                        University:
                        <input type="text" ref={this.university} />
                    </label>
                    <label>
                        Start Date:
                        <input type="text" ref={this.startDate} />
                    </label>
                    <label>
                        End Date:
                        <input type="text" ref={this.endDate} />
                    </label>
                    <label>
                        Rules:
                        <span onClick={this.addRule}>Add Rule</span>
                        {this.generateRulesInput()}
                    </label>
                    <input type="submit" value="Create" />
                </form>
            </div>
        );
    }
}
export default CreateGroup;