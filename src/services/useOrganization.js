import { useState, useEffect } from 'react';

const useOrganization = (url = 'http://13.232.213.53/api/v1/organizations', options = null) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setData(JSON.parse(JSON.stringify(data))));
  }, [url, options]);
  return { data };
};
export default useOrganization;
