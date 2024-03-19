import cls from './index.module.scss';


const ModalContent = ({ children }) => {
    const modalContent = (
        <div className={cls.content}>
            { children }
        </div>
    );

    return modalContent;
};

export { ModalContent };