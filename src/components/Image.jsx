import bro from "../assets/bro.png";
import pana from "../assets/pana.png";
import pana2 from "../assets/pana2.png";
import bro2 from "../assets/bro2.png";
import { useState, useEffect } from "react";

const image = [bro, pana, pana2, bro2];

export default function imageswap() {
    const [currentImage, setCuurentImage] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCuurentImage(image[Math.floor(Math.random() * image.length )])
        }, 1000)

        return () => clearInterval(intervalId);
    }, [])

    return (
        <div>
        <img src={currentImage} />
        </div>
    )
}