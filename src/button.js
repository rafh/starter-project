const Button = {
    button: '<button id="myButton">Init</button>',
    attachEl: () => {
        document.getElementById('myButton').addEventListener('click',
            () => {
                console.log('init');
            }
        );
    }
};

export default Button;
