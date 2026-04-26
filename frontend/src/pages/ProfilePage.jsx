import MagicLayout from "../components/MagicLayout";

export default function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <MagicLayout>
      <main className="page-card" style={{ marginTop: "34px" }}>
        <div className="page-grid">

          {/* Profile Image Box */}
          <div className="profile-image-box">
            <img src="/images/h.png" className="profile-image" />
          </div>

          {/* Profile Info */}
          <div className="profile-card" style={{ gridColumn: "span 2" }}>
            <h1 className="page-title">Wizard Profile</h1>

            <h2>{user?.name || "Student"}</h2>
            <p>{user?.email || "No email found"}</p>

            <p><b>House:</b> Hogwarts Scholar</p>
            <p><b>Preferred Mode:</b> Short Summary</p>
            <p><b>Documents Uploaded:</b> 0</p>
            <p><b>Quizzes Generated:</b> 0</p>

            <button className="magic-btn">Edit Profile</button>
          </div>

        </div>
      </main>
    </MagicLayout>
  );
}