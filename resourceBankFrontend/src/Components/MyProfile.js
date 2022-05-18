import { div } from "prelude-ls";
import useFetch from "./UseFetch";

const Profile = (props) => {
    const { data, error, isPending } = useFetch('http://localhost:8000/userinfo/' + props.userData);


    return ( 
        <div>
            <h1 style={{color:"white"}}>{props.userData}</h1>
            {error && <div>{error}</div>}
            {isPending && <div>Loading....</div>}
            {data && <div>
                
                <h1>{data.username}</h1>
                <h2>{data.email}</h2>
                <h2>*******</h2>
                
                </div>}
            {isPending }    



        </div>
     );
}
 
export default Profile;