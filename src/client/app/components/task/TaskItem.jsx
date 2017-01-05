import React from 'react';
import Strings from '../../helpers/Strings.js';
import Dom from '../../helpers/Dom.js';
import Ajax from '../../helpers/Ajax.js';

class TaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    edit () {
        Dom.addClass(document.body,'form-open');
        this.props.loadForm({task: this.props.task, formType: 'task'});
    }

    delete () {
        return Ajax.task.delete(this.props.task)
            .then((response) => response.json())
            .then((data) => {
                this.setState({task: data});
                this.props.update();
            }).catch((data) => {
                this.setState({task:this.defaultTask});
            });
    }

    render() {
        return (
            <div className="item task-item">
                <div className="name">{this.props.task.name}</div>
                <div className="description">{this.props.task.description}</div>
                <div className="due">{(new Date(this.props.task.due)).toLocaleDateString()}</div>
                <div className="user">{this.props.task.userId}</div>
                <a onClick={this.edit}>edit</a>
                &nbsp;
                <a className="delete" onClick={this.delete}>delete</a>
            </div>
        )
    }
}

export default TaskItem;
