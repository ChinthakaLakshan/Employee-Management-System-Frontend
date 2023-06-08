import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Aknara Waterfront!</span></h1>
            </header>
            <main className="public__main">
                <p>Aknara Water Front (Pvt) Ltd is a charming hotel located at Gorakapola beside the Bolgoda river owned and managed by a Board of Directors.</p>
                <address className="public__addr">
                14 Sri Gnanasena Mawatha<br />
                   
                    Panadura 12500, <br />
                    Sri Lanka<br />

                    <a href="tel: +94 382 246 471">(+94) 382-246-471</a>
                </address>
                <br />
                <p>Owner: N.L Silva</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public