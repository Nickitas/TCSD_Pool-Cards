
import cls from './index.module.scss'


const Button = ({ type, children, disabled, ico, ...props }) => {
    return (
        <button className={cls.button} type={type} {...props} disabled={disabled}>
            { ico }
            <span>{ children }</span>
        </button>
    )
}

export { Button };