import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';
bootstrapMicroframework({
    loaders: [
    ],
})
    .then((framework) => {
    }).catch(error => console.log('Application is crashed: ' + error));