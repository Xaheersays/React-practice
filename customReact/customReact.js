const root_container = document.querySelector("#root");
const reactElementTemplate = { 
    type:"a",
    props : {
        href : "https://google.com",
        target : '_blank'
    },
    content : "click me to redirect to google"
};

function customRender(reactElementTemplate,root){
    const element = document.createElement(reactElementTemplate.type);
    element.innerHTML = reactElementTemplate.content;
    element.setAttribute("href",reactElementTemplate.props.href);
    element.setAttribute("target",reactElementTemplate.props.target);
    root.appendChild(element);
}
customRender(reactElementTemplate,root);
