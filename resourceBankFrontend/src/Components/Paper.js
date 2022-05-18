import { useParams } from "react-router";
import { useState} from 'react';
// import { Link } from "react-router-dom"
import useFetch from "./UseFetch";
import axios from 'axios'

import { Button, Upload } from "antd"

const Paper = ({profile}) => {
    const [file, setFile] = useState([])
    const [defaultFileList, setDefaultFileList] = useState([]);
    const { branch, year, subject } = useParams();

    const { data: paper, isPending, error } = useFetch(`http://localhost:8000/document/download?year=` + year + `&branch=` + branch + `&subject=` + subject)

    const [progress, setProgress] = useState(0);

  const handleFileSubmit = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append("document", file);
    fmData.append('branch', branch)
    fmData.append('year', year)
    fmData.append('subject', subject)
        
    try {
      const res = await axios.post(
        "http://localhost:8000/document/upload",
        fmData,
        config
      );

      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const handleOnChange = ({ file, fileList, event }) => {
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    setDefaultFileList(fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };


    return (

        <div >
            {error && <div>{error}</div>}
            {isPending && <div>Loading....</div>}
            {profile && paper && (

                <article >
                    {console.log(paper)}
                    <h2 style={{ color: "white" }}>All Subjects</h2>
                    <div className="cards Resources-cards">
                        {
                            (paper).map(element => (
                                <div >
                                    <a target="_blank">
                                        <div className="card Resources-card"  >
                                            <div className="card-body">
                                                <h2 className="card-title">{element.subject}</h2>
                                                <a className="btn" href={`http://localhost:8000/document/downloaddoc?id=${element._id}`} download={true} target="blank">DOWNLOAD</a>
                                            </div>
                                        </div>
                                    </a>

                                </div>
                            ))
                        }
                    </div>
                    <div style={{ height: "10vh", color: "white", backgroundColor: "black" }}>
                        <Upload.Dragger
                            listType="picture"
                            accept=".pdf"
                            customRequest={handleFileSubmit}
                            onChange={handleOnChange}
                            defaultFileList={defaultFileList}
                        // iconRender={()=>{
                        //     return <Upload.Spin></Upload.Spin>
                        // }}
                        >
                            <Button>  Upload</Button>
                        </Upload.Dragger>
                        {/* <button onClick={handleSubmit}>SUBMIT</button> */}
                    </div>
                </article>

            )
            }
        </div>
    );
}

export default Paper;