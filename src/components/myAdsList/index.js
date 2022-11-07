import { useSelector, useDispatch } from "react-redux";
import MyAd from "../myAd";
import FilterEvents from "../filterEvents";
import './style.scss';
import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../../constants";
import { setMyAds } from "../../store/actions";

const MyAdsList = () => {

    const jwt = useSelector((state) => state.user.token);
    const userName = useSelector((state) => state.user.name);

    const dispatch = useDispatch();

    const ads = useSelector((state) => state.user.myAds);

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/myads`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            dispatch(setMyAds(data));
            console.log("List of my ads >>>", data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getMyAds = async () => {
            await fetchData();
        };
        getMyAds();
    }, []);

    // Event and ad is the same thing basically
    return (
        <div>
            <h2 className="title-page">Voici tes annonces {userName}</h2>
            <FilterEvents />
            <div className="my-ads-list">
                {ads.length === 0 && 
            (<div className="my-ads-list__empty">Vous n'avez pas d'annonces</div>)}
                {ads.map((ad) => (
                    <MyAd
                        key={ad.id}
                        id={ad.id}
                        name={ad.name}
                        description={ad.description}
                        pictureUrl={ad.picture_url}
                        address={ad.address}
                        county={ad.county}
                        eventDate={ad.event_date}
                        externalLink={ad.external_link}
                        eventType={ad.event_type}
                        isArchived={ad.is_archived}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyAdsList;
