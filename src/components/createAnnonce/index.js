import { useState } from "react";
import Modal from 'react-modal';
import CreateAnnonceForm from "../createAnnonceForm";
import './style.scss';

const CreateAnnonce = () => {

    // https://reactcommunity.org/react-modal/accessibility/
    Modal.setAppElement('#root');

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }
    
    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.

    }
    
    const closeModal = () => {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            background: 'transparent',
            border: 'none',
        },
    };

    return (
        <div className="create-annonce">
            <button className="button-ad" onClick={openModal}>Créer une annonce</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {/* The form will be filled with the current user's values (info) */}
                <CreateAnnonceForm closeModal={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default CreateAnnonce;
