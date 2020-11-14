import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {  useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors'

export default function Home() {
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token]);

  return (
    token ? (  <div>
      Home
      Top 3
      Top 3
      Current Round
    </div>) : ( null )
  
  )
}
