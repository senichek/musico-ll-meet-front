import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import './style.scss';

// This is the "details" of the annonce a musico has applied for
const PendingApplicationDetails = () => {

    // annonceID will be received from browser's URL
    let { annonceId } = useParams();

    // Get the list of annonces (events) from state
    const events = useSelector((state) => state.events.events);

    // Find the annonce (event) we'd like to show by its id (sign of "plus" converts string to INT)
    const annonceToShow = events.find(ev => ev.id === +annonceId);

    const removeYourCandidature = () => {
        alert("Vous avez décidé de ne pas participer");
    }

    return (
        <div className="pending-application-page">
            <div className="details" style={{backgroundImage: `url("${annonceToShow.picture_url}")`}}>
                <div className="details__poster">
                    <div className="details__name"><h2>{annonceToShow.name}</h2></div>
                    <img className="details__picture" src={annonceToShow.picture_url} alt="group_img" />
                </div>
                <div className="details__infos">
                    <p>Nom du MoMer</p>
                    <p>Nom du responsable</p>
                    <p>adresse</p>
                    <p>Ville</p>
                    <p>Téléphone</p>
                    <p>Genre musical</p>
                    <p>Matériel fourni ou pas</p>
                    <p>{annonceToShow.description}</p>
                </div>
            </div>
            <div className="details__actions">
                <div className="details__status">Status: En attente</div>
                <button className="button" onClick={removeYourCandidature}>Supprimer</button>
            </div>
        </div>
        
    );
};

export default PendingApplicationDetails;