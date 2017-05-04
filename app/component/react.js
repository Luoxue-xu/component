
class Component {

    constructor(props = {}) {
        this.props = props;
    }

    // 设置属性
    setState(state) {
        this.state = state;
        this.element = this.renderDOM();
    }

    // 根据传入的字符串，转换为DOM，字符串必须是标准html标签结构，同时最外层有且只有一个元素容器
    createDomFromString(str) {
        const _targetName = /[^<][a-zA-Z]+[^(>|\s)]/.exec(str);
        const _element = document.createElement(_targetName);
        _element.innerHTML = str;
        return _element;
    }

    renderDOM() {
        this.element = this.createDomFromString(this.render());
        return this.element;
    }

}

let render = (component, element) => {
    const _element = component.renderDOM();
    element.innerHTML = '';
    element.appendChild(_element);
}

export { render, Component };
