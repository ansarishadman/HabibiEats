import { createContext } from "react";

const UserContext = createContext({
    user: {
        name: 'Shadman',
        email: 'invalid.email@gmail.com'
    }
})

export default UserContext;