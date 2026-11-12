function Navbar() {
  return (
<nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample10">
          <ul className="navbar-nav">
            <li className="nav-item active"> <h2>
              <a className="nav-link" href="#">Storage Tracker System</a>
              </h2>
            </li>
          </ul>
        </div>
      </nav>
)}

export default Navbar
