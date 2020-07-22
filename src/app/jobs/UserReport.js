export default{
    // worker's key
    key: 'UserReport',
    // worker method
    options: {
        delay: 5000,
    },
    async handle({ data }){
        const { user } = data;
        console.log('User Report');
        console.log(user);
    }
}