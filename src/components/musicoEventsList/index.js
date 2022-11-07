import { useSelector } from "react-redux";
import Event from "../event";
import FilterEvents from "../filterEvents";
import './style.scss';
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants";

const MusicoEventsList = () => {

    const [events, setEvents] = useState([]);

    const loggedInUserId = useSelector((state) => state.user.id);

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/`);

            const confirmedEvents = [];
            for (const ev of data) {
                for (const group of ev.groups) {
                    if (group.userId === loggedInUserId && group.status === 'Acceptée') {
                        confirmedEvents.push(ev);
                    };
                };
            };
            setEvents(confirmedEvents);
            console.log("List of confirmedEvents of Musico >>>", confirmedEvents);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getEvents = async () => {
            await fetchData();
        };
        getEvents();
    }, []);

    return (
        <div>
            <h2 className="title-page">Mes Events</h2>
            {(!events || events.length === 0) &&
            <p style={{textAlign: "center"}}>Il n'y a pas d'événements confirmés</p>
            }
            <div className="musico-events-list">
                {events.map((ev) => (
                    <Event
                        key={ev.id}
                        id={ev.id}
                        name={ev.name}
                        description={ev.description}
                        pictureUrl={ev.picture_url}
                        address={ev.address}
                        county={ev.county}
                        eventDate={ev.event_date}
                        externalLink={ev.external_link}
                        eventType={ev.event_type}
                    />
                ))}
            </div>
        </div>
    );
};

export default MusicoEventsList;
