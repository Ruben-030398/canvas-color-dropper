import '@/sass/base.sass';

import app from '@/app'
import store from '@/store';

import { uploadImage } from './modules/base/store/actions';
import { ImageContainer } from './modules/image-container/ui';
import { Toolbar } from './modules/toolbar/ui/toolbar';


app.init();

const createApp = () => {
    const imageContainer = new ImageContainer({ x: 0, y: 0 });
    const toolbar = new Toolbar({ x: 0, y: 0 });

    app.mount(imageContainer, store => store.imageInfo);
    app.mount(toolbar, store => store.base.color);
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

        if (fileInput.files[0]) {
            store.dispatch(uploadImage(fileInput.files[0]));

            app.draw();

            main.style.display = 'none';
        }
    });
    fileInput.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLInputElement;

        const file = target.files && target.files[0];

        if (file) {
            store.dispatch(uploadImage(file));

            app.draw();

            main.style.display = 'none';
        }

    });
}

initUploadArea();

createApp();


