import './styles/_reset.css'
import './styles/index.scss';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import './App.css';
import EventList from '../src/components/eventsList/index';
import SignupForm from './components/signupForm';
import SigninForm from './components/signinForm';
import AnnonceDetailsForMomer from './components/annonceDetailsForMomer';
import EventDetails from './components/eventDetails';
import Header from './components/Header';
// https://fkhadra.github.io/react-toastify (ToastContainer should be used once in the root of the app)
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GroupDetailsApplication from './components/groupDetailsApplication';
import PendingApplicationList from './components/pendingApplicationList';
import PersonalProfile from './components/personalProfile';
import PendingApplicationDetails from './components/pendingApplicationDetails';
import CreateAnnonce from './components/createAnnonce';
import MusicosList from './components/musicosList';
import MomerList from './components/momerList';
import Footer from './components/footer';
import About from './components/about';
import Page404 from './components/404';
import Welcome from './components/Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/actions';
import { useEffect } from 'react';
import MyAdsList from './components/myAdsList';
import MyAdDetails from './components/myAdDetails';
import MomerDetails from './components/momerDetails';
import MusicosDetails from './components/musicosDetails';
import HomeMomer from './components/HomeMomer';
import HomeMusicos from './components/HomeMusicos';
import AdsListForMusicos from './components/adsListForMusicos';
import AdForMusicoDetails from './components/adForMusicoDetails';
import Mailer from './components/Mailer';
import MomerEventsList from './components/momerEventsList';
import { SESSION_DURATION } from './constants';
import { logout } from './store/actions';
import MusicoEventsList from './components/musicoEventsList';


function App() {

    const dispatch = useDispatch();

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    let role;

    let location = useLocation();

    let navigate = useNavigate();

    if (loggedInUser) {
        role = loggedInUser.role;
    };

    useEffect(() => {
        // If there is a logged-in user in the localStorage,
        // we will assign it to our State.
        if (loggedInUser) {
            dispatch(setUser(loggedInUser));
        }
    }, [loggedInUser]);

    useEffect(() => {
        //This hook will run every time a user changes the location (route)
        // on the website. Here we check if the login session has expired by
        //simply tracking the time bwteen the jwt token creation and the current time.
        // It must not exceed the value specified in "Constants";
        if (loggedInUser) {
            const sessionStart = new Date(loggedInUser.connectedAt);
            const sessionEnd = new Date();

            const currentSessionLength = sessionEnd - sessionStart;
            if (currentSessionLength > SESSION_DURATION) {
                // Logout
                localStorage.removeItem("loggedInUser");
                const resetUser = {
                    logged: false,
                    name: '',
                    id: '',
                    email: '',
                    password: '',
                    token: '',
                    role: '',
                };
                dispatch(logout(resetUser));
                return navigate("/signin");
            }
        }
    }, [location]);

    const isLogged = useSelector((state) => state.user.logged);

    return (
        <>

            <div>
                <Header/>
                {role === 'momer' && 
                <CreateAnnonce />}
            </div>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/events/:eventId" element={<EventDetails />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/signin" element={<SigninForm />} />
                <Route path="/homemomer" element={<HomeMomer />} />
                <Route path="/homemusicos" element={<HomeMusicos />} />
                <Route path="/pendingapplications" element={<PendingApplicationList />} />
                <Route path="/profile" element={isLogged ? (<PersonalProfile />) : (<SigninForm />)}/>
                <Route path="/pendingapplications/:annonceId" element={<PendingApplicationDetails />} />
                <Route path="/musicos" element={isLogged ? (<MusicosList />) : (<SigninForm />)}/>
                <Route path="/musicos/:musicoId" element={isLogged ? (<MusicosDetails />) : (<SigninForm />)}/>
                <Route path="/momers" element={isLogged ? (<MomerList />) : (<SigninForm />)}/>
                <Route path="/momers/:momerId" element={isLogged ? (<MomerDetails />) : (<SigninForm />)}/>
                <Route path="/about" element={<About />} />
                <Route path="/myannonces" element={<MyAdsList />} />
                <Route path="/myannonces/:annonceId" element={<MyAdDetails />} />
                <Route path="/annonces" element={isLogged ? (<AdsListForMusicos />) : (<SigninForm />)}/>
                <Route path="/annonces/:annonceId" element={isLogged ? (<AdForMusicoDetails />) : (<SigninForm />)}/>
                <Route path="/candidates/:annonceId" element={isLogged ? (<AnnonceDetailsForMomer />) : (<SigninForm />)}/>
                <Route path="/contact" element={<Mailer url={"/contact"} redirectionUrl={"/"} />} />
                <Route path="/application/:annonceId/:musicoID" element={isLogged ? (<GroupDetailsApplication />) : (<SigninForm />)}/>
                <Route path="/myeventsmomer/" element={(isLogged && role === 'momer') ? (<MomerEventsList />) : (<SigninForm />)}/>
                <Route path="/myeventsmusicos/" element={(isLogged && role === 'musicos') ? (<MusicoEventsList />) : (<SigninForm />)}/>
                <Route path="/*" element={<Page404 />} />
            </Routes>
            <ToastContainer />
            <Footer />
            <div className='foot'></div>
        </>
    );
}
export default App;