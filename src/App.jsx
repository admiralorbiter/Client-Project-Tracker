const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

const initialProjects = [
    {
        id: 1, status: 'New', owner: 'Jon', effort: 5, due: new Date('2018-08-08'),
        title: 'Refactoring Code for Modularization',
    },
    {
        id: 2, status: 'InProgress', owner: 'Jon', effort: 18, due: new Date('2018-08-08'),
        title: 'Standards and Style Guide',
    },
];

const sampleProjects={
    status: 'New', owner: 'Jon', effort: 5, due: new Date('2018-08-08'),
    title: 'New thing',
}

async function graphQLFetch(query, variables = {}) {
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
      
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
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
            <td>{project.due ? project.due: ''}</td>
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
            owner: form.owner.value, title: form.title.value, status: 'New',
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

    async createProject(project){
        const query = `mutation projectAdd($project: ProjectInputs!) {
             projectAdd(project: $project){
                id
            }
        }`;
        const data = await graphQLFetch(query, { project });
        if (data) {
            this.loadData();
        }
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `query {
          projectList {
            id title status owner
            effort due
          }
        }`;

        const data = await graphQLFetch(query);
        if (data) {
            this.setState({ projects: data.projectList });
        }
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