import 'dotenv/config';
import Queue from './app/lib/Queue';

Queue.process();

console.log('Waiting for process ...');