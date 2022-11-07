import './style.scss';
import { useState } from "react";
import { API_BASE_URL } from "../../constants";
import { useSelector } from "react-redux";
import axios from "axios";

const Upload = ({ setImage }) => {
    const jwt = useSelector((state) => state.user.token);
    
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState();
    const [toggleUpload, setToggleUpload] = useState(false);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
    };
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };
    const handleSubmitFile = (event) => {
        event.preventDefault();
        if(!previewSource) return;
        uploadImage(previewSource);
    };
    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage);
        const body = JSON.stringify({data: base64EncodedImage});

        const headers = {'Content-type': 'application/json', Authorization: `Bearer ${jwt}`};

        try {
            const dbResponse = await axios.patch(`${API_BASE_URL}/profile/upload`, body, {headers});
            setImage(dbResponse.data);
            console.log(dbResponse);
            uploadMenu();
        }catch (error) {
            console.error(error);
        }
    }
    
    const uploadMenu = () => {
        setToggleUpload(!toggleUpload);
    }
    return (
        <div>
            <button className='button' onClick={uploadMenu}>Changer d'image</button>
            {toggleUpload && (
                <div className='upload'>
                    <div className='closeMenu'>
                        <button className='closeMenu__X' onClick={uploadMenu}>+</button>
                    </div>
                    <h2 className='upload__title'>Nouvelle image</h2>
                    {previewSource && (
                        <img src={previewSource} alt='aperçu' className="upload__preview"/>
                    )}
                    <form>
                        <input 
                            type='file' 
                            name='image' 
                            onChange={handleFileInputChange} 
                            value={fileInputState} 
                            className='upload__select' 
                        />
                        <button className='button' onClick={handleSubmitFile}>Soumettre</button>
                    </form>
                </div>)}
        </div>
    )
}
export default Upload;
