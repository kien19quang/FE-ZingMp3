import './ModalSinger.scss';
import Image from '@/assets/images/Cover image/OnlyC.jpg';
function ModalSinger() {
    return (
        <div className="modal">
            <div className="modal-singer">
                <div className="modal-singer-header">
                    <img src={Image} alt="" />
                    <span>OnlyC</span>
                </div>
            </div>
        </div>
    );
}

export default ModalSinger;
