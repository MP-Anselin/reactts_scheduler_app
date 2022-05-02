import React, {useContext, useEffect, useState} from "react";
import Modal from "react-modal";
import {GlobalContext} from '../context/GlobalState'
import {CirclePicker} from "react-color";
import {modalCustomStyles} from "../utils/utils";

const TaskForm: React.FC = () => {
    const {date, task, addTask, saveTask, setDate, deleteTask} = useContext(GlobalContext);

    const [name, setName] = useState("");
    const [plateNumber, setPlateNumber] = useState("");
    const [hour, setHour] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [color, setColor] = useState("#f44336");
    const [error, setError] = useState(false);

    useEffect(() => {

        if (task) {
            setPlateNumber(task.plateNumber || "");
            setHour(task.hour || "");
            setName(task.name || "");
            setColor(task.color || "#f44336");
        }
    }, [task]);

    const closeModal = () => {
        addTask(null);
        setError(false);
    };

    const _saveTask = () => {

        const checkError = [
            name.trim().length || 0,
            hour.trim().length || 0,
            country.trim().length || 0,
            city.trim().length || 0,
            plateNumber.trim().length || 0,
        ]

        if (checkError.find((el: number) => el < 1) !== undefined) {
            setError(true);
            return;
        }
        setError(false);

        saveTask({
            ...task,
            date: date,
            hour: hour,
            name: name,
            color: color,
            plateNumber: plateNumber,
        });
        setDate(date);
        closeModal();

    };

    const _deleteTask = () => {
        deleteTask(task.id);
        setDate(date);
        closeModal();
        setError(false);
    }

    return (
        <Modal
            isOpen={task != null}
            onRequestClose={closeModal}
            style={modalCustomStyles}
            ariaHideApp={false}
            contentLabel="Task Form"
        >
            <div className="task-form">

                <label>Driver Name</label>
                <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Driver Name"
                />

                <label>Country</label>
                <input
                    name="name"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    placeholder="Country Name"
                />

                <label>City</label>
                <input
                    name="name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    placeholder="City Name"
                />

                <label>Hours</label>
                <input name="hour"
                       value={hour}
                       type="time"
                       id="hour"
                       min="09:00"
                       max="18:00"
                       onChange={(e) => setHour(e.target.value)}
                />

                <label>Plate Number</label>
                <input type="text"
                       value={plateNumber}
                       placeholder="ex : Aa-999-Aa"
                       name="number plate"
                       pattern="^([A-Za-z]{2}-?[0-9]{3}-?[A-Za-z]{2})?([0-9]{4}-?[A-Za-z]{2}-?[0-9]{2})?([0-9]{3}-?[A-Za-z]{3}-?[0-9]{2})?$"
                       title="French Number Plate"
                       onChange={(e) => setPlateNumber(e.target.value)}
                />

                <label>Color</label>

                <div>
                    <CirclePicker
                        color={color}
                        onChange={(colorBis: any) => {
                            setColor(colorBis.hex);
                        }}
                    />
                </div>

                <div>
                    <button className="button button-red" onClick={closeModal}>
                        Cancel
                    </button>
                    {task && task.id ? (
                        <button
                            className="button button-orange"
                            onClick={_deleteTask}
                        >
                            Delete
                        </button>
                    ) : null}
                    <button
                        className="button button-green"
                        onClick={_saveTask}
                    >
                        Save
                    </button>
                </div>
                {error ? <p className="error">All the fields of the task is required</p> : null}
            </div>
        </Modal>
    );
}

export default TaskForm;
