import { CloseIcon } from '../svg.module';
import cls from './index.module.scss'

const ModalHeader = ({ setVisible, ...props }) => {
    return (
        <div className={cls.header}>
            <h2 className='subtitle'>
                { props.children }
            </h2>
            <div className={cls.closeButton} onClick={() => setVisible(false)}>
                <CloseIcon/>
            </div>
        </div>
    )
}

export { ModalHeader }