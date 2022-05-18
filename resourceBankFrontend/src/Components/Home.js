

import Cards from './Cards'
import useFetch from './UseFetch';
import { useState,useEffect } from 'react';

const Home = ({globalData , setGlobalData}) => {
  const { data, isPending, error } = useFetch('http://localhost:8000/metaData/fetch');

  useEffect(() => {
    setGlobalData(data)
  }, [data])
  

  return (

    <div className="home">
      
      <section className="bgimage" > 
        <div>
          <h1>RESOURCE BANK</h1>
          <p>A platform to learn and enhance development</p>
          {/* <p>Please choose your branch</p> */}
        </div>
      </section>
      <hr style={{color:"white",margin:"3rem"}}/>
      {error && <div>{error}</div>}
      {isPending && <div>Loading....</div>}
      {data && <Cards data={data} title='Choose Branch' />}
      <hr style={{color:"white",margin:"3rem"}}/>
    </div>
  );
}

export default Home;