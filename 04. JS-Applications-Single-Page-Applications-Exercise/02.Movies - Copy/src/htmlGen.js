function htmlGen(tag,text,className,parent){
    const el = document.createElement(tag);
    el.textContent = text;
    if(className){
        el.className = className;
    }
    if(parent){
        parent.appendChild(el);
    }
    return el;
}
export {htmlGen};