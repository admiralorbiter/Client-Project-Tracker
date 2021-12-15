const project = [
    {
        id: 1, status: 'new', owner: 'Jon', effort: 5, due: new Date('2018-08-08'),
        title: 'Refactoring Code for Modularization',
    },
    {
        id: 2, status: 'assigned', owner: 'Jon', effort: 18, due: new Date('2018-08-08'),
        title: 'Standards and Style Guide',
    },
];

class ProjectTable extends React.Component {
    render() {
        const projectRows = project.map(project=> <ProjectRow key={project.id} project={project}/>);
        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Effort</th>
                        <th>Due Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {projectRows}
                </tbody>
            </table>
        );
    }
}

class ProjectRow extends React.Component{
    render(){
        const project = this.props.project;
        return(
            <tr>
                <td>{project.id}</td>
                <td>{project.status}</td>
                <td>{project.owner}</td>
                <td>{project.effort}</td>
                <td>{project.due ? project.due.toDateString(): ''}</td>
                <td>{project.title}</td>
            </tr>
        );
    }
}

class ProjectFilter extends React.Component{
    render(){
        return(
            <div>This is place holder for filter</div>
        );
    }
}

class ProjectAdd extends React.Component{
    render(){
        return(
            <div>This is place holder for add</div>
        );
    }
}

class ProjectList extends React.Component{
    render(){
        return(
            <React.Fragment>
                <h2>Projects</h2>
                <ProjectFilter/>
                <hr />
                <ProjectTable/>
                <hr />
                <ProjectAdd/>
            </React.Fragment>
        );
    }
}

const element = <ProjectList/>;
ReactDOM.render(element,document.getElementById('content'));