import Queue from '../lib/Queue';

export default {
    async store(req, res) {
        const {name, email, password} = req.body;

        const user = {
            name,
            email,
            password
        }

        await Queue.add('RegistrationMail', { user }); // send process to queue
        await Queue.add('UserReport', { user }); // send process to queue

        return res.json(user);
    }
}