import React, { useState } from "react";
import "./ForYouMangasPage.css";


const ForYouMangasPage = props => {
    const [mangas, setMangas] = useState([])

    // useEffect(() => {
    //     if (props.show === true && mangas.length == 0) {
    //         axios.get(`https://charlotte-services.herokuapp.com/mangas/?sort=-score`).then(res => {
    //             setMangas(res.data)
    //             // if (Object.keys(props.selected).length === 0)
    //             //     props.selectManga(res.data[0])
    //             console.log("MANGA ALL GETTED", props.show)
    //         })
    //     }
    // }, [props.show])

    return (
        <div className={`for-you manga-list-container ${props.show ? '' : 'hidden'}`}>
            <div className="advice">
                Download our App to personalized recommendations!!!
            </div>
            {/* <ul className="manga-list">
                {mangas.map((manga, index) => (
                    <LazyLoad key={manga._id} height={900}>
                        <MangaCard manga={manga} rank={index + 1}></MangaCard>
                    </LazyLoad>
                ))}
            </ul> */}
        </div>
    )
}

export default ForYouMangasPage;