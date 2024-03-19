import cls from "./index.module.scss";


const Form = ({ id, className, active, children, onSubmit, ...props }) => {
    const form = (
        <form 
            className={`${cls.form} ${className && className}`}
            id={id}
            noValidate
            onSubmit={onSubmit}
            {...props}
        >
            { children }
        </form>
    );

    const formDiv = (
        <div className={`${cls.form} ${className && className}`}>
            { children }
        </div> 
    );
  
    return active == false 
        ? formDiv
        : form;
};

export { Form };