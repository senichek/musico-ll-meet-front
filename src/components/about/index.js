import './style.scss';
import logo from '../../assets/logo.svg';
import linkedinLogo from '../../assets/icons/linkedin-in-brands.svg';
import githubLogo from '../../assets/icons/github-brands.svg';
import avatarRichard from '../../assets/avatars/Richard.jpg';
import avatarStephane from '../../assets/avatars/Stephane.jpg';
import avatarOlexiy from '../../assets/avatars/Olexiy.jpg';
import avatarBruno from '../../assets/avatars/Bruno.jpg';


const About = () => {
    
    return (
        <div className='about'>
            <div className='about__intro'>
                <p><strong>MusicO'll Meet</strong> est notre projet d'apothéose.</p>
                <p>Après 4 mois de formation avec l'école O'clock, nous avons travaillé d'arrache pied pour réaliser cette application web en 4 semaines.</p>
                <h2>la team</h2>
            </div>
            <div className='about__team'>
                <div className='about__team__card'>
                    <div className='about__team__card__name'>
                        <h2>Richard</h2>
                    </div>
                    <div className='about__team__card__picture'>
                        <img src={avatarRichard} alt='Avatar Richard'></img>
                    </div>
                    <div className='about__team__card__role'>
                        <p>Git master</p>
                        <p>Dév back</p>
                    </div>
                    <div className='about__team__card__social'>
                        <a href='https://www.linkedin.com/in/richard-darcy-69a5b7147/'><img src={linkedinLogo} alt='LinkedIn'></img></a>
                        <a href='https://github.com/RicharDarcy'><img src={githubLogo} alt='Github'></img></a>
                    </div>
                    <div className='about__team__card__location'>
                    </div>
                </div>
                <div className='about__team__card'>
                    <div className='about__team__card__name'>
                        <h2>Stéphane</h2>
                    </div>
                    <div className='about__team__card__picture'>
                        <img src={avatarStephane} alt='Avatar Stéphane'></img>
                    </div>
                    <div className='about__team__card__role'>
                        <p>Lead dév back</p>
                    </div>
                    <div className='about__team__card__social'>
                        <a href='https://www.linkedin.com/in/stephane-ricard31/'><img src={linkedinLogo} alt='LinkedIn'></img></a>
                        <a href='https://github.com/StephaneRicard'><img src={githubLogo} alt='Github'></img></a>
                    </div>
                    <div className='about__team__card__location'>
                    </div>
                </div>
                <div className='about__team__card'>
                    <div className='about__team__card__name'>
                        <h2>Olexiy</h2>
                    </div>
                    <div className='about__team__card__picture'>
                        <img src={avatarOlexiy} alt='Avatar Olexiy'></img>
                    </div>
                    <div className='about__team__card__role'>
                        <p> Lead dév front</p>
                    </div>
                    <div className='about__team__card__social'>
                        <a href='https://www.linkedin.com/in/olexiy-senichek/'><img src={linkedinLogo} alt='LinkedIn'></img></a>
                        <a href='https://github.com/senichek'><img src={githubLogo} alt='Github'></img></a>
                    </div>
                    <div className='about__team__card__location'>
                    </div>
                </div>
                <div className='about__team__card'>
                    <div className='about__team__card__name'>
                        <h2>Bruno</h2>
                    </div>
                    <div className='about__team__card__picture'>
                        <img src={avatarBruno} alt='Avatar Bruno'></img>
                    </div>
                    <div className='about__team__card__role'>
                        <p>Product Owner</p>
                        <p>Scrum master</p>
                        <p>Dév front</p>
                    </div>
                    <div className='about__team__card__social'>
                        <a href='https://www.linkedin.com/in/bruno-villalon/'><img src={linkedinLogo} alt='LinkedIn'></img></a>
                        <a href='https://github.com/Bruno-VILLALON'><img src={githubLogo} alt='Github'></img></a>
                    </div>
                    <div className='about__team__card__location'>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default About