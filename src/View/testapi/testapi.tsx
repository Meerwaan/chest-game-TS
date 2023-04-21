import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/api";

function Apitest() {
  const [data, setData] = useState<string>();


  useEffect(() => {
    fetchData()
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  if (!data) {
    return <div>Loding zone ...</div>;
  }

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}

export default Apitest;
