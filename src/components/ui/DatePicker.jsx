import { useRef } from "react";
import { IoCalendarNumber } from "react-icons/io5";

const DatePicker = ({ label, name, value, onChange, style }) => {
    const inputRef = useRef();

    return (
        <div className="form-control z-[10] w-full md:w-1/2">
            <label className="label">
                <strong className="label-text">{label} Date</strong>
            </label>
            <input
                onClick={() => inputRef.current?.showPicker()}
                ref={inputRef}
                type="date"
                name={name}
                value={value}
                onChange={onChange}
                className={`input custom-cursor-pointer ${
                    value ? "date-picked" : "date-placeholder"
                }`}
                required
            />
            <span
                className="custom-cursor-pointer"
                onClick={() => inputRef.current?.showPicker()}
                style={style}
            >
                <IoCalendarNumber />
            </span>
        </div>
    );
};

export default DatePicker;
