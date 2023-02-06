const Card = (props) => {
    // console.log(`from card: question is ${props.q}`)
    return (
        <>
            <div className="w-3/12">
                <h2 className="font-bold text-left tracking-wide">{props.question}</h2>
                <p className="text-left mt-2">{props.answer}</p>
            </div>
        </>
    );
}

export default Card;