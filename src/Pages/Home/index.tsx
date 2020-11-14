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
  });

  return (
    token ? (  <div>
      Home
    </div>) : ( null )
  
  )
}
