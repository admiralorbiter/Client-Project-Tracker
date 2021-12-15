const businessPartenrs = ['Cerner', 'Goodwill', 'Kauffman Organization'];
const helloBusinessPartner = Array.from(businessPartenrs, c => `Hello ${c}`);
const message = helloBusinessPartner.join(' ');

const element=(
    <div title="Outer Div">
        <h1>{message}</h1>
    </div>
);
ReactDOM.render(element,document.getElementById('content'));