import './style.scss'
import { NavLink } from "react-router-dom";

const Login =() => {
    return(
        <div className='log'>
            <NavLink className='log-signin' to="/signin">Connexion</NavLink>
            <NavLink className='log-signup' to="/signup">Inscrivez-vous</NavLink>
        </div>
    )
}

export default Login