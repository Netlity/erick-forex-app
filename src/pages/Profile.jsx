export default function Profile() {
  return (
    <>
      <h2>My Profile</h2>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <form>
                <div className="mb-3"><label>Full Name</label><input type="text" className="form-control" defaultValue="Erick Mgongolwa" /></div>
                <div className="mb-3"><label>Email</label><input type="email" className="form-control" defaultValue="erick@erickforex.com" /></div>
                <div className="mb-3"><label>New Password</label><input type="password" className="form-control" /></div>
                <button className="btn btn-success">Update Profile</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}