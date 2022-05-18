import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";

const Navbar = ({profile,setProfile}) => {
  const history = useHistory();

  const handleClick = ()=>{

      axios.get("http://localhost:8000/credential/user/logout")

      setProfile(false)
      history.push("/")  
  }


  return (
    <div className="sticky">
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ paddingTop: "0px", paddingBottom: "0px" }}>
        <div className="container-fluid" >
          <Link className="navbar-brand" to="/" style={{ color: "white" }}>Cosmos</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
              {/* <li className="nav-item">
                <Link className="nav-link active" to="/" style={{ color: "white" }}><i className="fa fa-fw fa-home"></i> Home</Link>

              </li>
              <li className="nav-item">

                <Link className="nav-link" to="/" style={{ color: "white" }}><i className="fa fa-fw fa-envelope"></i> Contact</Link>
              </li> */}
              <li className="nav-item dropdown">
                {/* <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false" style={{ color: "white" }}>
                  Categories
                </Link> */}
                {/* <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/">Laptops</Link></li>
                  <li><Link className="dropdown-item" to="/">Mobiles</Link></li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li><Link className="dropdown-item" to="/">Aur nhi hmre pass!</Link></li>
                </ul> */}
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link disabled" to="/" tabindex="-1" aria-disabled="true">Disabled</Link>
              </li> */}
            </ul>

            {!profile && <Link to="/User">
              <button className="btn btn-outline-success" type="submit" style={{ color: "white", borderRadius: "10px", margin: "0px" , width:"100px"}}>Signin</button>
            </Link>}
            {profile && 
                  <button className="btn btn-outline-success" type="submit" style={{ color: "white", borderRadius: "10px", margin: "0px" , width:"100px" }}onClick={handleClick} >Log Out</button>
            }
          </div>
        </div>
      </nav>

    </div>
  );
}

export default Navbar;