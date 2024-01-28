import '@/sass/base.sass';

import app from '@/app'
import { Picture, Typography } from './components';
import Button from './components/button';

app.init();

const text = new Typography({ x: 100, y: 200, text: 'text' });

const picture = new Picture({ x: 200, y: 30, src: 'assets/upload.png' });

const button = new Button({
    x: 300,
    y: 200,
    text: 'Click button 1!',
    borderRadius: 10,
    color: 'black',
    textProps: { y: -8 },
    onClick: () => console.log('clicked'),
    backgroundProps: { width: 75, height: 75 }
})

const button2 = new Button({
    x: 300,
    y: 200,
    width: 200,
    text: 'button 2',
    borderRadius: 10,
    color: 'red',
    textProps: { fillStyle: '#fff' },
    onClick: () => console.log('clicked button 2'),
    backgroundProps: { width: 75, height: 75 }
})


app.mount(text);


app.mount(button2);

app.mount(button);


app.mount(picture);

console.log(app, 'app');

app.draw();

const initDropArea = () => {
    const dropArea = document.getElementById('drop-area') as HTMLDivElement;
    const fileInput = document.getElementById('file-input') as HTMLInputElement;

    dropArea.addEventListener('click', () => fileInput.click());

    dropArea.addEventListener('dragover', e => e.preventDefault());

    dropArea.addEventListener('drop', e => {
        e.preventDefault();

        if (!e.dataTransfer?.files) return;

        fileInput.files = e.dataTransfer.files;

        console.log(e.dataTransfer.files[0], 'e.dataTransfer.files');
    });

    fileInput.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLInputElement;

        const file = target.files && target.files[0];

        console.log(file, 'file');

        dropArea.style.display = 'none';

    });
}

initDropArea();


