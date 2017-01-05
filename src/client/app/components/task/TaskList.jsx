import React from 'react';
import Strings from '../../helpers/Strings.js';
import Ajax from '../../helpers/Ajax.js';
import Dom from '../../helpers/Dom.js';

import TaskItem from './TaskItem.jsx';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateData = this.updateData.bind(this);
        this.add = this.add.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
    }

    updateData () {
        this.setState({data: undefined});
        return Ajax.task.getAll()
        .then((response) => response.json())
        .then((data) => {
            // this.state.failed = false;
            this.state.tasks = data;
            this.setState(this.state);
        }).catch((data) => {
            // this.state.failed = true;
            this.state.tasks = [];
            this.setState(this.state);
        });
    }

    add () {
        Dom.addClass(document.body,'form-open');
        this.props.loadForm({formType: 'task'});
    }

    componentDidMount () {
        this.updateData();
    }

    componentWillReceiveProps(nextProps) {
        this.updateData();
    }

    renderTasks () {
        var self = this;
        var tasks = [];
        if(this.state.tasks){
            this.state.tasks.forEach(function(task){
                tasks.push(
                    <TaskItem task={task} key={task.id} loadForm={self.props.loadForm} update={self.props.update}/>
                );
            });
        }
        return tasks;
    }

    render() {
        return (
            <div>
                <a onClick={this.add}>add</a>
                <div className="task-list">
                    {this.renderTasks()}
                </div>
            </div>
        );
    }
}

export default TaskList;
