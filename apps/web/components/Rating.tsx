import { FaStar, FaRegStar } from "react-icons/fa";
import { Button, Card } from "react-bootstrap"
import { Product } from "../models/Product"



export const Rating = ({rating}) => {
    const arrRating: Array<number> = Array.from(Array(5).keys())
    const ratingConfig = {
        style: {
            fontSize: 20,
            color: '#6B5995',
            cursor: 'pointer'
        },
        onHandleClick: () => {
            console.log('Clicked!')
        }
    }
    return (
        <section>
            {
                arrRating.map((r: number, index: number) => index + 1 <= rating 
                    ? <FaStar key={index} onClick={ratingConfig.onHandleClick} style={ratingConfig.style} /> 
                    : <FaRegStar key={index} onClick={ratingConfig.onHandleClick} style={ratingConfig.style} />)
            }
        </section>
    )
}