import React from "react"
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import moment from 'moment'

const ProjectDetails = (props) => {
    const { project,auth } = props;

    if(!auth.uid) return <Redirect to='/signin/' />

    if (project) {
        return (
            <div className="container section project-details">
                <div className="card z-depth-1">
                    <div className="card-content">
                        <h5 className="text-darken-3 card-title">{project.title}</h5>
                        <p>{project.content}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
                        <div>Priority: {project.priority}</div>
                        <div>{moment(project.createAt.toDate().toString()).calendar()}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
            <p>Loading project...</p>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) =>{
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    return {
        project: project,
        auth: state.firebase.auth
    }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect(['projects']),
)(ProjectDetails)
