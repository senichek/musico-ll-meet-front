import Event from "../event";
import FilterEvents from "../filterEvents";
import './style.scss';
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants";

const EventsList = () => {

    const [events, setEvents] = useState([]);
    const [urlParams, setUrlParams] = useState("");

    const fetchData = async () => {
        try {
            // url params are received from filter. If they are present
            // we'll receive the filtered list from the server.
            console.log("Full URL >>>", `${API_BASE_URL}${urlParams}`);
            const { data } = await axios.get(`${API_BASE_URL}${urlParams}`);
            setEvents(data);
            console.log("List of Events >>>", data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getEvents = async () => {
            await fetchData();
        };
        getEvents();
    }, [urlParams]);

    return (
        <div>
            <h2 className="title-page">Les Events</h2>
            <FilterEvents setFinalUrl={setUrlParams} />
            <div className="events-list">
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

export default EventsList;
