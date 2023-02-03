const Card = (props) => {
    // console.log(`from card: question is ${props.q}`)
    return (
        <>
            <div key={props.key}>
                <h2>{props.question}</h2>
                <p>{props.answer}</p>
            </div>
        </>
    );
}

export default Card;