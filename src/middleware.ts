import {withAuth} from "next-auth/middleware"

export default withAuth(
    function middleware(req) {
        // only if callbacks.authorized is true
    },
    {
        callbacks: {
            authorized: ({token}) => {        
		        return !!token 
            },
        },
    }
)