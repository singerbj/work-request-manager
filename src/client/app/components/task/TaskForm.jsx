import React from 'react';
import Ajax from '../../helpers/Ajax.js';
import Dom from '../../helpers/Dom.js';
import DateHelper from '../../helpers/DateHelper.js';

const defaultTask = {name:'', description:'', due: DateHelper.fixDate((new Date())), userId: '0', ownerId: '0', status: '1', fileName: '', file: ''};

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        if(props.task && props.task.id){
            props.task.due = DateHelper.fixDate(props.task.due);
            this.state = {task: props.task};
            this.getTask(props.task);
        }else{
            this.state = {task: Dom.clone(defaultTask)};
        }
        this.getTask = this.getTask.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.createUserOptions = this.createUserOptions.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.save = this.save.bind(this);
    }

    getTask (task) {
        return Ajax.task.getOne(task)
        .then((response) => response.json())
        .then((data) => {
            data.due = DateHelper.fixDate(data.due);
            this.setState({task: data});
        }).catch((data) => {
            this.setState({task: Dom.clone(defaultTask)});
        });
    }

    handleFileSelect (e) {
        e.stopPropagation();
        e.preventDefault();
        var self = this;
        var files = e.dataTransfer.files; // FileList object.
        var file = files[0];
        var reader = new FileReader();
        reader.onload = (function(contents) {
            return function(e) {
                self.state.task.file = e.target.result;
                self.state.task.fileName = file.name;
                self.setState(self.state);
            };
        })(file);
        reader.readAsDataURL(file);
    }

    handleDragOver (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.task && nextProps.task.id){
            nextProps.task.due = DateHelper.fixDate(nextProps.task.due);
            this.setState({task: nextProps.task, error: null}, function(){
                this.getTask(nextProps.task);
            });
        }else{
            this.setState({task: Dom.clone(defaultTask), error: null});
        }
    }

    componentDidMount() {
        Ajax.user.getAll()
        .then((response) => response.json())
        .then((data) => {
            // this.state.failed = false;
            this.state.users = data;
            this.setState(this.state);
        }).catch((data) => {
            // this.state.failed = true;
            this.state.users = [];
            this.setState(this.state);
        });
    }

    createUserOptions () {
        var jsx = [];
        if(!this.state.users){
            this.state.users = [];
        }
        jsx.push(<option key="0" value="0"></option>);
        this.state.users.forEach(function(user, index){
            jsx.push(
                <option key={user.id} value={user.id}>{user.name}</option>
            );
        });
        return jsx;
    }

    inputChange (event) {
        this.state.task[event.currentTarget.name] = event.currentTarget.value;
        this.setState(this.state);
    }

    save () {
        var key = 'save';
        this.state.task.password = 'password';
        this.state.task.role = 1;
        this.state.error = null;
        if(this.state.task.id){
            key = 'update';
        }
        return Ajax.task[key](this.state.task)
            .then((response) => response.json())
            .then((data) => {
                if(!data.error){
                    this.setState({task: Dom.clone(defaultTask)});
                    this.props.update();
                    Dom.removeClass(document.body,'form-open');
                }else{
                    console.log(data.error);
                    this.setState({error: data.error});
                }
            }).catch((data) => {
                this.setState({task: Dom.clone(defaultTask)});
            });
    }

    render() {
        if(this.state && this.state.task){
            return (
                <div className="task-form">
                    <div>
                        Name <input type="text" name="name" value={this.state.task.name} onChange={this.inputChange}/>
                    </div>
                    <div>
                        Description <input type="text" name="description" value={this.state.task.description} onChange={this.inputChange}/>
                    </div>
                    <div>
                        Due <input type="date" name="due" value={this.state.task.due} onChange={this.inputChange}/>
                    </div>
                    <div>
                        Owner <select name="ownerId" value={this.state.task.ownerId} onChange={this.inputChange}>
                            {this.createUserOptions()}
                        </select>
                    </div>
                    <div>
                        User <select name="userId" value={this.state.task.userId} onChange={this.inputChange}>
                            {this.createUserOptions()}
                        </select>
                    </div>
                    <div>
                        Status <select name="status" value={this.state.task.status} onChange={this.inputChange}>
                            <option value="1">Defined</option>
                            <option value="2">In Progress</option>
                            <option value="3">Completed</option>
                        </select>
                    </div>
                    <div>
                        File <input type="text" name="fileName" value={this.state.task.fileName} onChange={this.inputChange} onDragOver={this.handleDragOver} onDrop={this.handleFileSelect} placeholder="Drag file here" />
                        <input type="hidden" name="file" value={this.state.task.file} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <button value="true" onClick={this.save}>Save</button>
                    </div>
                    <div>
                        <div className={'error ' + (!this.state.error ? 'hidden' : '')}>{this.state.error}</div>
                    </div>
                </div>
            )
        }else{
            return (<div>Loading...</div>);
        }
    }
}

export default TaskForm;
