import { useState, useEffect, useRef } from 'react';
import {
    foramtFio,
    formatPhoneNumber,
    formatCardNumber,
    formatCarNumber,
    formatAmount,
    formatDateNumber,
} from '../../../utils/formats'
import {
    validationPhone,
    validationEmail,
    validationFio,
    validationPassword,
    validationDate,
    validationWords,
    validationAmount,
    validationCardNumber,
    validationCarNumber,
    validationDefault,
} from '../../../utils/validations';
import { getMessageByCode } from '../../../utils/functions/getMessageByCode';
import { EyeIcon, EyeCloseIcon } from '../../ui/svg.module';
import cls from './index.module.scss';

const defaultProps = {
    autoComplete: "off",
    type: "text",
};

const Input = ({
    id,
    name,
    type,
    value,
    onChange,
    isValid,
    placeholder,
    clue,
    autoComplete,
    readonly,
    autoFocus,
    responseCode,
    setServerResponse,
    showServerErrorMessage,
    setShowServerErrorMessage,
    ...props }) => {

    const formatDefault = (text) => text;

    const typeInput = {
        fio: {
            type: 'text',
            format: foramtFio,
            valid: validationFio,
        },
        phoneNumber: {
            type: "phone",
            format: formatPhoneNumber,
            valid: validationPhone,
        },
        email: {
            type: "email",
            format: formatDefault,
            valid: validationEmail,
        },
        password: {
            type: "password",
            format: formatDefault,
            valid: validationPassword,
        },
        date: {
            type: "text",
            format: formatDateNumber,
            valid: validationDate,
        },
        amount: {
            type: "text",
            format: formatAmount,
            valid: validationAmount,
        },
        cardNumber: {
            type: "password",
            format: formatCardNumber,
            valid: validationCardNumber,
        },
        carNumber: {
            type: 'text',
            format: formatDefault,
            valid: validationDefault,
            // type: "carNumber",
            // format: formatCarNumber,
            // valid: validationCarNumber,
        },
        words: {
            type: "text",
            format: formatDefault,
            valid: validationWords,
        },
        text: {
            type: "text",
            format: formatDefault,
            valid: validationDefault,
        },
    };

    const inputRef = useRef(null);
    const [currentValue, setCurrentValue] = useState(value);
    const [valid, setValid] = useState(false);
    const [toggleEye, setToggleEye] = useState(false);
    const TypeInput = typeInput[type];

    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, []);
  
    useEffect(() => {
      onChange && onChange(currentValue);
      isValid && isValid(!!TypeInput.valid(currentValue));
    }, [currentValue]);
  
    useEffect(() => {
      getMessageByCode(-1);
    }, [currentValue, valid]);
  
    useEffect(() => {
      setCurrentValue(value || "");
      if (value?.length == 0) {
        setValid(false);
      }
    }, [value]);

    return (
        <div className={cls.inputWrapper}  data-error={
            (valid && !!TypeInput.valid(currentValue)) ||
            (responseCode !== -1 && showServerErrorMessage)
        }>
            <div className={cls.input}>
                <input
                    id={id}
                    name={`${id}_${type}`}
                    value={currentValue}
                    placeholder={placeholder}
                    type={toggleEye ? 'text' : typeInput[type].type}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    readOnly={readonly}
                    onChange={(e) => {
                        const value = e.target.value;
                        setCurrentValue(typeInput[type].format(value));
                        if (responseCode === -1) {
                            setShowServerErrorMessage && setShowServerErrorMessage(true);
                        }
                        setServerResponse && setServerResponse(-1);
                    }}
                    onFocus={() => {
                        setValid(false);
                        setShowServerErrorMessage && setShowServerErrorMessage(false)
                    }}
                    onBlur={() => {
                        isValid && setValid(true);
                    }}
                    className={cls.input}
                    {...props}
                />
                {type === "password" ? (
                    <div
                        className={cls.eyeButton}
                        onClick={() => setToggleEye((prev) => !prev)}
                    >
                        {toggleEye ? <EyeCloseIcon /> : <EyeIcon />}
                    </div>
                ) : null}
                <label className={cls.label}>{placeholder}</label>
            </div>
             {valid && TypeInput.valid ? (
                    <span className={cls.error}>{TypeInput.valid(currentValue)}</span>
                ) : (
                    <span className={cls.clue}>{clue}</span>
                )}
                {responseCode && showServerErrorMessage && (
                    <span className={cls.error}>{getMessageByCode(responseCode)}</span>
                )}
        </div>
    );
};

Input.defaultProps = defaultProps;

export { Input };