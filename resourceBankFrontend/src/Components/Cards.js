
import { useState,useEffect } from "react";
import { Link } from "react-router-dom"

const Cards = ({ data, title }) => {
   const [branch,setbranch]=useState([])
 
   const key = 'branch';
   
   function compare(a, b) {
    if (a.branch> b.branch) return 1;
    if (a.branch < b.branch) return -1;
    return 0;
  }


    useEffect(() => {
        const unique = [...new Map(data.map(item =>
            [item[key], item])).values()];
          
        console.log(unique)
        unique.sort(compare)
        setbranch(unique)
        
        console.log(branch)
    }, [])
    


    return (

        <div>
            <h1 style={{ margin: "1rem", color: "white" }} >{title}</h1>
            <div className="cards cards-crd">
                {
                    branch.map(element => (
                        <Link to={`/Resources/${element.branch}`}>
                            <div className="card card-crd" >
                                <div className="card-body">
                                    <h5 className="card-title">{element.branch}</h5>
                                </div>
                            </div>
                         </Link>
                    ))
                }
            </div>
        </div>
        );
}

export default Cards;