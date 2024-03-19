import { useState, useEffect } from 'react';
import { ModalHeader } from './ModalHeader';
import { ModalContent } from './ModalContent';
import { ModalFooter } from './ModalFooter';
import cls from './index.module.scss';


const ModalWindow = ({
    children,
    setVisible 
}) => {
    const [animateModal, setAnimateModal] = useState(false);
    const [dragged, setDragged] = useState(false);
  
    useEffect(() => {
        setAnimateModal(true);
    }, []);

    const closeModal = () => {
        setAnimateModal(false);
        setTimeout(() => {
            setVisible(false);
        }, 300);
    };

    const handleFadeMouseDown = () => {
        setDragged(false);
    };

    const handleFadeMouseMove = () => {
        setDragged(true);
    };

    const handleFadeClick = (event) => {
        if (!dragged && event.target === event.currentTarget) {
            closeModal();
        }
    };

    const modalWindow = (
        <div className={cls.fade}
            onMouseDown={handleFadeMouseDown}
            onMouseMove={handleFadeMouseMove}
            onClick={handleFadeClick}
        >
            <div className={`${cls.modalWindow} ${animateModal ? cls.modalAnimate : ''}`}>
                { children }
            </div>
        </div>
    );

    return modalWindow;
};

export { 
    ModalWindow,
    ModalHeader,
    ModalContent,
    ModalFooter
};