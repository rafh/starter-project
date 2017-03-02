const Button = {
    button: '<button id="myButton">Init</button>',
    attachEl: () => {
        document.getElementById('myButton').addEventListener('click',
            () => {
                console.log('clicked');
            }
        );
    }
};

export default Button;
