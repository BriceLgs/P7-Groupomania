import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


const LoadingRedirect = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000);

        count === 0 && navigate("/login");
        return () => clearInterval(interval);

    }, [count, Navigate]);
  return (
    <div style={{marginTop: "100px"}}>
        <h5>Redirection dans {count} secondes</h5>
    </div>
  )
}

export default LoadingRedirect