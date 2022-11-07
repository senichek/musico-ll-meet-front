import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import "./style.scss";
import { dateFormatter } from "../../utils/dateFormatter";

const EventDetails = () => {

    // eventID will be received from browser's URL
    let { eventId } = useParams();

    const [event, setEvent] = useState();

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/${eventId}`);

            // get the confirmed groups for each event
            let confirmedGroups = [];
            for (const group of data.groups) {
                if (group.status === 'Acceptée') {
                    confirmedGroups.push(group.group_name);
                };
            };
            data.confirmedGroupNames = confirmedGroups.join(", ");
            setEvent(data);
            console.log("Event details >>>", data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getEvent = async () => {
            await fetchData();
        };
        getEvent();
    }, []);

    return (
        <div>
            {event && (
                <div>
                    <div className={"details"} id={event.id} style={{backgroundImage: `url("${event.picture_url}")`}} > 
                        <div className="details__poster">
                            <div className="details__name"><h2>{event.name}</h2></div>
                            <img className="details__picture" src={event.picture_url} alt="event_img" />
                        </div>
                        <div className="details__infos">
                            <div className="details__date"><strong>{dateFormatter(event.event_date)}</strong></div>
                            <div className="details__type"><strong>Type d'Event : </strong>{event.event_type}</div>
                            {event.confirmedGroupNames !== "" && 
                                <div className="details__groups"><strong>Musicos : </strong>{event.confirmedGroupNames}</div>
                            }
                            <div className="details__description">{event.description}</div>
                            <div className="details__extLink"><a href={event.external_link} target="_blank">{event.external_link}</a></div>
                            <div className="details__county"><strong>{event.county}</strong></div>
                            <div className="details__address"><strong>Adresse : </strong>{event.address}</div>
                        </div>
                    </div>
                    <div className="details__actions">
                        <Link to="/events">
                            <button className="button">Retour</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDetails;
