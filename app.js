const { Component, mount, xml, useState } = owl;


// class for subcomponent (child)
class Task extends Component {
    static template = xml`
    <li t-attf-style="background-color:#{props.task.color}" class="d-flex align-items-center justify-content-between border p-3 mb-2 rounded">
        <div class="form-check form-switch fs-5">
            <input class="form-check-input" type="checkbox" value="" t-att-checked="props.task.isCompleted" t-att-id="props.task.id" t-on-click="toggleTask"/>
            <label class="form-check-label" t-att-for="props.task.id" t-attf-class="#{props.task.isCompleted ? 'text-decoration-line-through': ''}">
                <t t-esc="props.task.name"/>
            </label>
        </div>
        <div>
            <button class="btn btn-primary me-2"><i class="bi bi-pencil fs-5"></i></button>
            <button class="btn btn-danger"><i class="bi bi-trash fs-5"></i></button>
        </div>
    </li>
    `
    static props = ["task"]

    toggleTask(){
        this.props.task.isCompleted = !this.props.task.isCompleted
    }
}


// class inheritance
class Root extends Component {
    static template = xml`
    <div>
        <div class="input-group-lg w-100 d-flex border rounded align-items-center">
            <input type="text" class="form-control-lg flex-fill border-0 me-1" 
            placeholder="Add your new task" aria-label="Add your new task" 
            aria-describedby="button-addon2" t-att-value="state.name" t-model="state.name"/>

            <input type="color" class="form-control-lg form-control-color border-0 bg-white m-0" 
            id="color" t-att-value="state.color" title="Choose your color" t-model="state.color"/>
            
            <button class="btn btn-primary" type="button" id="button-addon2" t-on-click="addTask">
            <i class="bi bi-plus-lg fs-3"></i>
            </button>
        </div>
    </div>

    <ul class="d-flex flex-column mt-5 p-0">
        <t t-foreach="tasks" t-as="task" t-key="task.id">
            <Task task="task"/>
        </t>
    </ul>
    `

    static components = {Task}

    // life cycle method similar with __init__() in python
    setup(){
        this.state = useState({
            name: "",
            color: "#0dbd3c",
            isComplete: false,
        })

        this.tasks = useState([])
    }

    // method
    addTask(){
        // make a condition when user press the add button without data input
        if (!this.state.name){
            alert("Please provide name of your task.")
            return
        }

        // define id with increment by 1
        const id = this.tasks.length > 0
            ? this.tasks[this.tasks.length - 1].id + 1 // add the last id and add it by 1
            : 1; // initial id number start from 1

        // make a new task
        this.tasks.push({
            id:id,
            name:this.state.name,
            color:this.state.color,
            isComplete:false,
        })

        let state = this.state
        // Reset input state
        this.state = { ...state, name:"", color:"#0dbd3c" }

        // debug 
        console.log(this.tasks)
    }
}

mount(Root, document.getElementById("root"))