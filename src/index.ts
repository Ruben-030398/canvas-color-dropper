import '@/sass/base.sass';

import app from '@/app'
// import { Button, Picture, Typography } from './components';
import store from './store';
import { uploadImage } from './modules/base/store/actions';
import { ImageContainer } from './modules/image-container/ui';

app.init();

const createApp = () => {
    const imageContainer = new ImageContainer({ x: 0, y: 0 });
    // const text = new Typography({ x: 100, y: 200, text: 'text' });
    // const picture = new Picture({ x: 200, y: 30, src: 'assets/upload.png' });
    // const button = new Button({
    //     x: 300,
    //     y: 100,
    //     text: 'Click',
    //     borderRadius: 10,
    //     color: 'black',
    //     backgroundSrc: 'assets/upload.png',
    //     onClick: () => console.log('clicked'),
    //     textProps: { fillStyle: '#fff' },
    //     backgroundProps: { width: 75, height: 75 }
    // })
    
    // const button2 = new Button({
    //     x: 300,
    //     y: 200,
    //     width: 200,
    //     text: 'button 2',
    //     borderRadius: 10,
    //     color: 'red',
    //     textProps: { fillStyle: '#fff' },
    //     onClick: () => console.log('clicked button 2'),
    //     backgroundProps: { width: 75, height: 75 }
    // })
    
    // app.mount(text);
    // app.mount(button2);
    // app.mount(button);
    // app.mount(picture);

    // console.log(app, 'app')

    app.mount(imageContainer, store => store.imageInfo)
    app.draw();
}


const initUploadArea = () => {
    const main = document.getElementById('main') as HTMLElement;
    const dropArea = document.getElementById('drop-area') as HTMLDivElement;
    const fileInput = document.getElementById('file-input') as HTMLInputElement;

    dropArea.addEventListener('click', () => fileInput.click());
    dropArea.addEventListener('dragover', e => e.preventDefault());
    dropArea.addEventListener('drop', e => {
        e.preventDefault();

        if (!e.dataTransfer?.files) return;

        fileInput.files = e.dataTransfer.files;

        fileInput.files[0] && store.dispatch(uploadImage(fileInput.files[0]));

        main.style.display = 'none';

    });
    fileInput.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLInputElement;

        const file = target.files && target.files[0];

        file && store.dispatch(uploadImage(file))

        main.style.display = 'none';
    });
}

initUploadArea();

createApp();


