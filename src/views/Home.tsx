import { useEffect, useState } from "react";
import CustomTable from "../stories/table/Table"
import CustomModal from "../stories/modal/Modal";
import axios from "axios";
import { useAlert } from "../Utils";

const Home = () => {
    const [header, setHeaders] = useState<string[]>(["id", "Name", "Email", "Phone", "Gender", "Birthday"]);
    const [body, setBody] = useState<string[][]>([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<{}>({});
    const { handleSetAlert, handleClearAlert, handleSetServerErrorAlert } = useAlert();

    //modal close function
    const closeModal = () => {
        setShowModal(false);
    };

    //view edit delete function for Actions in table
    const onViewClick = (data: {}) => {
        setModalData(data);
        setShowModal(true);
    };

    const onEditClick = (data: {}) => {
        setModalData(data);
        setShowModal(true);
    };

    // calling delete api
    const onDeleteClick = async (data: any) => {
        try {
            const id = data.id
            await axios.delete(`http://localhost:4008/api/users/` + id).then(response => {
                if (response.status === 200) {
                    handleSetAlert("Successfully deleted data.", "success")
                    window.location.reload();
                } else {
                    handleSetAlert("Failed to delete data. Please try again", "danger")
                }
            })
        } catch (error) {
            handleSetAlert("An error occurred while saving data. Please try again", "warning");
            console.error("Error:", error);
        }
    };


    //fetch table data
    const getData = async () => {
        try {
            await axios.get(' http://localhost:4008/api/get').then(response => {
                if (response.status === 200) {
                    setBody(response.data.user)
                } else {
                    handleSetAlert("Failed to get data. Please try again", "warning")
                }
            })
        } catch (error) {
            handleSetServerErrorAlert()
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        handleClearAlert();
        getData();
    }, [])

    return (
        <div>
            {body.length > 0 ? <CustomTable data={body} headers={header} onViewClick={onViewClick} onDeleteClick={onDeleteClick} onEditClick={onEditClick} /> : "N data"}
            <CustomModal show={showModal} onClose={closeModal} data={modalData} modalHeader={"Details"} />
        </div>
    )
}

export default Home