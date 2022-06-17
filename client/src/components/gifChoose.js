export default function GifChoose({ src,handleChoice }) {



    return (
        <>
        <img src={src} className="gif" onClick={handleChoice}/>
        </>
    )
}