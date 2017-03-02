import Button from './button';
var newMessage = () => (Button.button);
// Button.attachEl();
const page = `<h1>This is page 2</h1><div>`+ newMessage() +`</div>`;
export default page;
