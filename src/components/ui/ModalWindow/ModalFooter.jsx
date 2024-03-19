import cls from './index.module.scss';

const ModalFooter = ({ children }) => {
    const modalFooter = (
        <div className={cls.footer}>
            { children }
        </div>
    );
    
    return modalFooter;
}

export { ModalFooter };