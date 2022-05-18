import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import useFetch from "./UseFetch";
const Resources = ({ globalData }) => {
    const { branch } = useParams();

    const [year, setYear] = useState([])

    const key = 'year';

    function compare(a, b) {
        if (a.year > b.year) return 1;
        if (a.year < b.year) return -1;
        return 0;
    }


    useEffect(() => {
        const unique = [...new Map(globalData.map(item =>
            [item[key], item])).values()];

        unique.sort(compare)
        setYear(unique)

        console.log(year)
    }, [])



    return (

        <div >

            {year && (

                <article >
                    <h2 style={{ color: "white" }}>Choose Year</h2>
                    <div className="cards cards-crd">
                        {
                            (year).map(element => (
                                <div>
                                    <Link to={`/Subjects/${branch}/${element.year}`}>
                                        <a href={element.src} target="_blank">
                                            <div className="card card-crd"  >
                                                <div className="card-body">
                                                    <h2 className="card-title">{element.year}</h2>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
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

export default Resources;