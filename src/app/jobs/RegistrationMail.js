import Mail from '../lib/Mail';

export default {
    // worker's key
    key: 'RegistrationMail', 
    // worker method
    async handle({data}){
        try{
            console.log('Sending email ...');
            const { user } = data;
            await Mail.sendMail({
                from: 'Queue Test <queue@queuetest.com.br>',
                to: `${user.name} <${user.email}>`,
                subject: 'Cadastro de usuário',
                html: `Olá, ${user.name}, bem-vindo ao sistema de filas :D`
            });
            console.log('Sending email OK!');
        }
        catch(err){
            console.error(`Error during send mail: ${err}`);
            throw err;
        }
    }
}