import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import {  useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors'

export default function Profiel() {
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  });

  return (
    <div>
      Profiel
    </div>
  )
}
