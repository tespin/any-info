const Card = (props) => {
    // console.log(`from card: question is ${props.q}`)
    return (
        <>
            <div className="xs:w-full sm:w-3/12 xs:mt-6 sm:mt-0">
                <h2 className="font-bold text-left tracking-wide">{props.question}</h2>
                <p className="text-left mt-2">{props.answer}</p>
            </div>
        </>
    );
}

export default Card;