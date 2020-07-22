// Queue Class

import Queue from 'bull';
import redisConfig from '../../config/redis';

import * as jobs from '../jobs'; // Import all workers from jobs folder

// Extract the workers
const queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, redisConfig),
    name: job.key,
    handle: job.handle,
    options: job.options,
}));

export default {
    queues, // define queues into this object
    // Add: add processes into specific queue
    add(name, data) {
        const queue = this.queues.find(queue => queue.name == name); // get specific queue
        return queue.bull.add(data, queue.options); // add into queue
    },
    // Process Queues
    process(){
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle); // Create queues using workers

            // Catch errors in queue execution
            queue.bull.on('failed', (job, err) => {
                console.log('Job Failed', job.name, job.data);
                console.error(err);
            });
        });
    }
};

// ************ Old Code for comparision or simple implementation **********

// import RegistrationMail from '../jobs/RegistrationMail';

// const mailQueue = new Queue(RegistrationMail.key, redisConfig);

// mailQueue.on('failed', (job, err) => {
//     console.log('Job Failed', job.name, job.data);
//     console.error(err);
// })

// export default mailQueue;