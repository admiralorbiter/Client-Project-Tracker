const initialProjects = [
    {
        id: 1, status: 'new', owner: 'Jon', effort: 5, due: new Date('2018-08-08'),
        title: 'Refactoring Code for Modularization',
    },
    {
        id: 2, status: 'assigned', owner: 'Jon', effort: 18, due: new Date('2018-08-08'),
        title: 'Standards and Style Guide',
    },
];

const sampleProjects={
    status: 'new', owner: 'Jon', effort: 5, due: new Date('2018-08-08'),
    title: 'New thing',
}

function ProjectTable(props) {
    const projectRows = props.projects.map(project=> <ProjectRow key={project.id} project={project}/>);
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

function ProjectRow(props) {
    const project = props.project;
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

class ProjectFilter extends React.Component{
    render(){
        return(
            <div>This is place holder for filter</div>
        );
    }
}

class ProjectAdd extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const form = document.forms.projectAdd;
        const project = {
            owner: form.owner.value, title: form.title.value, status: 'new',
        }
        this.props.createProject(project);
        form.owner.value = "";
        form.title.value = "";
    }

    render(){
        return(
           <form name="projectAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner"/>
                <input type="text" name="title" placeholder="Title"/>
                <button type="submit">Add</button>
           </form>
        );
    }
}

class ProjectList extends React.Component{
    constructor(){
        super();
        this.state = {projects: []};
    }

    createProject(project){
        project.id = this.state.projects.length + 1;
        project.created = new Date();
        const newProjects = this.state.projects.slice();
        newProjects.push(project);
        this.setState({projects: newProjects});
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            this.setState({projects: initialProjects});
        }, 500);
    }
    render(){
        return(
            <React.Fragment>
                <h2>Projects</h2>
                <ProjectFilter/>
                <hr />
                <ProjectTable projects={this.state.projects}/>
                <hr />
                <ProjectAdd createProject={this.createProject.bind(this)}/>
            </React.Fragment>
        );
    }
}

const element = <ProjectList/>;
ReactDOM.render(element,document.getElementById('content'));