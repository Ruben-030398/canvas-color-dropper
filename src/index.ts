import '@/sass/base.sass';

import app from '@/app'
import { Picture, Typography } from './components';
import Button from './components/button';


app.init();

const text = new Typography({ x: 300, y: 150, text: 'text' });

const picture = new Picture({ x: 300, y: 150, src: 'assets/upload.png' });

const button = new Button({
    x: 400,
    y: 150,
    text: 'Click me please click!',
    borderRadius: 10,
    textProps: {  y: 145 },
    borderColor: 'blue',
    onClick: () => console.log('clicked')
})


app.mount(text);

app.mount(picture);

app.mount(button);


console.log(app, 'app');

app.start();

const initDropArea = () => {
    const dropArea = document.getElementById('drop-area') as HTMLDivElement;
    const fileInput = document.getElementById('file-input') as HTMLInputElement;

    dropArea.addEventListener('click', () => fileInput.click());

    dropArea.addEventListener('dragover', e => e.preventDefault());

    dropArea.addEventListener('drop', e => {
        e.preventDefault();

        fileInput.files = e.dataTransfer.files;

        console.log(e.dataTransfer.files[0], 'e.dataTransfer.files');
    });

    fileInput.addEventListener('change', (e: HTMLInputEvent) => {
        e.target.files[0];

        console.log(e.target.files[0], 'e.target.files[0]');

        dropArea.style.display = 'none';

    });
}

initDropArea();


