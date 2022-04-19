window.onload = () => {
    renderText();
}

function renderText() {
    document.querySelector('.rerender').addEventListener('click', () => {
        document.querySelectorAll('.text').forEach(elem => {
            elem.textContent = elem.textContent.replace(/\s'|'\s|'$/g, '"'); // Решение №1   
                                                //.replace(/'/g, '"').replace(/\b"\b/g, `'`); // Решение №2
                                                //.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2'); // нашел в интернете тоже работает.
        })
    })
}
