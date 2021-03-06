import React from 'react';
import Strings from '../../helpers/Strings.js';
import Dom from '../../helpers/Dom.js';
import DateHelper from '../../helpers/DateHelper.js';
import Ajax from '../../helpers/Ajax.js';

class TaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.resolveStatusClass = this.resolveStatusClass.bind(this);
        this.resolveStatus = this.resolveStatus.bind(this);
        this.showFileOrNot = this.showFileOrNot.bind(this);
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

    resolveStatusClass (status) {
        var r;
        if(status === 1){
            r = 'defined';
        }else if(status === 2){
            r = 'in-Progress';
        }else if(status === 3){
            r = 'completed';
        }
        return r;
    }

    resolveStatus (status) {
        var r;
        if(status === 1){
            r = 'Defined';
        }else if(status === 2){
            r = 'In Progress';
        }else if(status === 3){
            r = 'Completed';
        }
        return r;
    }

    showFileOrNot (fileName, file) {
        if(fileName && file){
                // var json = file,//JSON.stringify(file),
                // blob = new Blob([json], {type: "octet/stream"}),
                // url = window.URL.createObjectURL(blob);
            return (<a href={file} download={fileName}>{fileName}</a>);
        }else{
            return (<span>No file uploaded</span>);
        }
    }

    render() {
        var dueDate = new Date(this.props.task.due);
        var daysleft = DateHelper.daysUntil(dueDate);
        return (
            <div className="item task-item">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="name">{this.props.task.name}</div>
                    </div>
                    <div className="col-sm-6">
                        <div className="description">{this.props.task.description}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div>Status: <span className={'status ' + this.resolveStatusClass(this.props.task.status)}>{this.resolveStatus(this.props.task.status)}</span></div>
                        <div className="due">{dueDate.toLocaleDateString() + ' (' + daysleft + ' days left)'}</div>
                    </div>
                    <div className="col-sm-6">
                        <div className="owner">Owner: {this.props.task.owner ? this.props.task.owner.name : 'No owner assigned to task'}</div>
                        <div className="user">Assigned: {this.props.task.user ? this.props.task.user.name : 'No user assigned to task'}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="file">File: {this.showFileOrNot(this.props.task.fileName, this.props.task.file)}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <a onClick={this.edit}>edit</a>
                        &nbsp;
                        <a className="delete" onClick={this.delete}>delete</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskItem;
