import React, {useState} from "react";
import {IItemDetails, IPageDetailsProps} from "../../../../types/components/page/IPageDetails";
import {fetchData} from "../../services/rest";

const PageDetails: React.FunctionComponent<IPageDetailsProps> = (props: IPageDetailsProps): JSX.Element =>
{
    const [details, useDetails] = useState<IItemDetails>(null);
    const [error, setError] =  useState<string>(null);
    const formRef = React.useRef(null);

    React.useEffect(() =>
    {
        console.log("GET user effect")
        getDetails();
    }, []);


    const getDetails = async () =>
    {
        try {
            const res = await fetchData(`${HOST}/item/details/${props.location.pathname.split("/")[1]}`, "GET");
            useDetails(res.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const onRateChange =  (rate: number) =>
    {
        updateData({rate})
    }

    const updateFeedback =  (e: React.SyntheticEvent) =>
    {
        e.preventDefault()
        updateData({feedback: [...details.feedback, formRef.current[0].value]}, () => formRef.current[0].value = "")
    }

    const updateData = async (data, callback?) =>
    {
        console.log("rate", data)
        try {
            const res = await fetchData(`${HOST}/item/update/${props.location.pathname.split("/")[1]}`, "PUT", data);

                if(res.data.success)
                {
                    console.log('dfgtyhujiop', res)
                    useDetails(prevState => {
                        return {...prevState, ...data}
                    });
                    if(callback){
                        callback();
                    }
                }
        }
        catch (err) {
            console.log(err);
        }
    }

    console.log("page details", details)
    return (
        <div className="page-details">
            {
                details !== null ? (
                    <div>
                        <h1>{details.name}</h1>
                        <h3>Feedback</h3>
                        <ol>
                            {
                                details.feedback.map((message, i) => (
                                    <li key={i}>
                                        <span>user: {message}</span>

                                    </li>
                                ))
                            }
                        </ol>
                        <div className="star-rating">
                            <h1>Please rate our restoran</h1>
                            {
                                [1, 2 , 3, 4, 5, 6, 7].map(rate => <span key ={rate}
                                                                         className={`${rate <= details.rate ? "active" : ""}`}
                                                                         onClick={() => onRateChange(rate)}/>)
                            }
                        </div>

                        <form  onSubmit={updateFeedback} ref = {formRef}>
                            <div>
                                <label>
                                   Add your appinion for aur restoran:
                                </label>
                                <input name={"feedback"} />
                            </div>
                            <button type="submit">Add feedback</button>
                        </form>
                    </div>
                ) : <div className = "loader" />
            }
        </div>
    );

};

export default PageDetails;