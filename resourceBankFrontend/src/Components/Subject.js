import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import useFetch from "./UseFetch";
const Subjects = ({ globalData ,profile}) => {
    const { branch,year } = useParams();
    const history = useHistory();

    const [subjects, setSubjects] = useState([])

    function compare(a, b) {
        if (a.subject > b.subject) return 1;
        if (a.subject < b.subject) return -1;
        return 0;
    }


    useEffect(() => {
        const unique = globalData.filter((ele)=>{
            if(ele.year==year&&ele.branch==branch)
                return ele;
        })

        unique.sort(compare)
        setSubjects(unique)

        console.log(unique)

    }, [])


    const handleClick=(subject)=>{
        if(profile===true)
            history.push(`/Paper/${branch}/${year}/${subject}`)
        else
            history.push("/User")

    }





    return (

        <div >

            {subjects  && (

                <article >
                    <h2 style={{ color: "white" }}>Choose Subject</h2>
                    <div className="cards cards-crd">
                        {
                            (subjects).map(element => (
                                <div>
                                        
                                            <div className="card card-crd"  >
                                                <div className="card-body">
                                                    <h2 className="card-title">{element.subject}</h2>
                                                </div>
                                                <button className="btn" onClick={()=>{handleClick(element.subject)}}>DOWNLOAD || UPLOAD</button>
                                            </div>
                                        
                                        
                                </div>
                            ))
                        }
                    </div>
                </article>

            )

            }
        </div>
    );
}

export default Subjects;