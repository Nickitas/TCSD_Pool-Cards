import cls from './index.module.scss';

const Loader = () => {
    return (
        <div className={cls.loaderWrapper}>
            <div className={cls.loader}>
                <div className={cls.spinner}>
                    <div className={cls.container}>
                        <div className={cls.hex0}></div>
                        <div className={cls.hex120}></div>
                        <div className={cls.hex240}></div>
                        <div className={cls.spinner}>
                            <div className={cls.container}>
                                <div className={cls.hex0}></div>
                                <div className={cls.hex120}></div>
                                <div className={cls.hex240}></div>
                                <div className={cls.spinner}>
                                    <div className={cls.container}>
                                        <div className={cls.hex0}></div>
                                        <div className={cls.hex120}></div>
                                        <div className={cls.hex240}></div>
                                        <div className={cls.spinner}>
                                            <div className={cls.container}>
                                                <div className={cls.hex0}></div>
                                                <div className={cls.hex120}></div>
                                                <div className={cls.hex240}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Loader };