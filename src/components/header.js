import './CSS/Header.css'
function Header(props){
    return(
        <>
            <header className="Header">
                <h1>{props.title}</h1>
            </header>
        </>
    )
}

Header.defaultProps={
    title:"Default List"
}
export default Header