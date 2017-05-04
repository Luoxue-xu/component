import { render, Component } from './component/react';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'luoxue'
        };
    }

    handle() {
        alert(123);
    }

    render() {
        return `<div style="color:${this.props.textColor}">${this.state.name}</div>`;
    }

}

const app = new App({
    textColor: '#f60'
});

render(app, document.querySelector('.wrapper'));
