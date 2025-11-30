import "./MainBanner.css";
import { Aperture } from 'lucide-react'; 

const MainBanner = () => (
    <section className="main-banner-section"> 
        <div className="main-banner-image-placeholder"> 
            <Aperture size={80} color="#aaaaaa" />
        </div>

        <div className="main-banner-content"> 
            
            <h1 className="main-banner-title">Main Title</h1> 
            
            <p className="main-banner-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis
                dui, non pulvinar lorem felis nec erat
            </p>
        </div>
    </section>
);

export default MainBanner;