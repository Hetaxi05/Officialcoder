import Course from "../course/course";
import Coursecard from "../coursecard/coursecard";
import "../coursecard/coursecard.css";

function Coursenav() {
    return (
        <>
            <div className="mobilecoursecard-container">
                <Course />

                <Coursecard />

            </div>

        </>

    )
}
export default Coursenav;