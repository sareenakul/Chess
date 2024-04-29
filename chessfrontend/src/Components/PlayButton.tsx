import "../Pages/landing.css"
export const PlayButton = ({onClick, children}: {onClick: () => void, children: React.ReactNode}) =>{
    return(
        <button onClick={onClick} className="play-button">
            {children}
        </button>
    )
};