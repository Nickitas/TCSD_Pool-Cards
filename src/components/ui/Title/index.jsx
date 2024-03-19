import cls from './index.module.scss';

const defaultProps = {
    type: 'h2',
    align: 'left',
};

const Title = ({ children, type, align, noPadding, className }) => {
    let titleElement;

    switch (type) {
        case 'h1':
            titleElement = <h1 className={`${cls.mainTitle} ${className}`} data-align={align}>{ children }</h1>;
            break;
        case 'h2':
            titleElement = <h2 className={`${cls.title} ${className}`} data-align={align} data-no-padding={noPadding}>{ children }</h2>;
            break;
        case 'h3':
            titleElement = <h3 className={`${cls.subTitle} ${className}`} data-align={align}>{ children }</h3>;
            break;
        case 'h4':
            titleElement = <h4 className={`${cls.header} ${className}`} data-align={align}>{ children }</h4>;
            break;
        case 'h5':
            titleElement = <h5 className={`${cls.topic} ${className}`} data-align={align}>{ children }</h5>;
            break;
        case 'h6':
            titleElement = <h6 className={`${cls.subject} ${className}`} data-align={align}>{ children }</h6>;
            break;
        default: titleElement = <h2 className={`${cls.title} ${className}`} data-align={align}>{ children }</h2>;
    }

    return titleElement;
};

Title.defaultProps = defaultProps;

export { Title };