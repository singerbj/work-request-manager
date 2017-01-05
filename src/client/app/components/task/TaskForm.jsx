import React from 'react';
import Ajax from '../../helpers/Ajax.js';
import Dom from '../../helpers/Dom.js';

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.defaultTask = {name:'', description:'', due: this.fixDate((new Date())), userId: '0', status: '0', fileName: '', file: ''};
        if(props.task && props.task.id){
            props.task.due = this.fixDate(props.task.due);
            this.state = {task: props.task};
            this.getTask(props.task);
        }else{
            this.state = {task: this.defaultTask};
        }
        this.fixDate = this.fixDate.bind(this);
        this.getTask = this.getTask.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.createUserOptions = this.createUserOptions.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.save = this.save.bind(this);
    }

    fixDate(date){
        var d = new Date(date);
        var month = (d.getMonth() + 1).toString().length === 1 ? '0' + (d.getMonth() + 1).toString() : (d.getMonth() + 1);
        var day = (d.getDate() + 1).toString().length === 1 ? '0' + (d.getDate() + 1).toString() : (d.getDate() + 1);
        return d.getUTCFullYear() + '-' + month + '-' + day;
    }

    getTask (task) {
        return Ajax.task.getOne(task)
        .then((response) => response.json())
        .then((data) => {
            data.due = this.fixDate(data.due);
            this.setState({task: data});
        }).catch((data) => {
            this.setState({task: this.defaultTask});
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
                document.querySelector('input[name=file]').value = e.target.result;
                document.querySelector('input[name=fileName]').value = file.name;
                self.state.task.file = e.target.result;
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
            this.setState({task: nextProps.task}, function(){
                this.getTask(nextProps.task);
            });
        }else{
            this.setState({task: this.defaultTask});
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

        var fileInput = document.querySelector('input[name=fileName]');
        fileInput.addEventListener('dragover', this.handleDragOver, false);
        fileInput.addEventListener('drop', this.handleFileSelect, false);
    }

    createUserOptions () {
        var jsx = [];
        if(!this.state.users){
            this.state.users = [];
        }
        this.state.users.forEach(function(user){
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
        if(this.state.task.id){
            key = 'update';
        }
        return Ajax.task[key](this.state.task)
            .then((response) => response.json())
            .then((data) => {
                this.setState({task: data});
                this.props.update();
                Dom.removeClass(document.body,'form-open');
            }).catch((data) => {
                this.setState({task:this.defaultTask});
            });
    }

    render() {
        if(this.state && this.state.task){
            // console.log(this.state.task);
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
                        User <select name="userId" value={this.state.task.userId} onChange={this.inputChange}>
                            {/* <option value="1">User 1</option> */}
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
                        File <input type="text" name="fileName" value={this.state.task.fileName} onChange={this.inputChange} placeholder="Drag file here" />
                        <input type="hidden" name="file" value={this.state.task.file} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <button value="true" onClick={this.save}>Save</button>
                    </div>
                </div>
            )
        }else{
            return (<div>Loading...</div>);
        }
    }
}

export default TaskForm;
