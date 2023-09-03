import { useState } from "react"


export function TwitterFollowCard ({ userName, children, initialIsFollowing }) {

    const [ isFollowing, setIsFollowing ] = useState(initialIsFollowing) 
    const buttonText = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }
    return(
    <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img className='tw-followCard-avatar' src={`https://unavatar.io/${userName}`}/>
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>{`@${userName}`}</span>
                </div>
            </header>

            <aside>
                <button onClick={handleClick} className={buttonClassName}>
                    <span className="tw-followCard-text">{buttonText}</span>
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}