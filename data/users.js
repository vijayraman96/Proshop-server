import brcypt from 'bcryptjs';
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: brcypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Vjay',
        email: 'vijay@example.com',
        password: brcypt.hashSync('123456', 10),
        isAdmin: false
    },
    {
        name: 'Harish',
        email: 'harish@example.com',
        password: brcypt.hashSync('123456', 10),
        isAdmin: false
    },
]

export default users;