import MagicLayout from "../components/MagicLayout";

export default function ProfilePage() {
  return (
    <MagicLayout>
      <main className="page-card" style={{ marginTop: "34px" }}>
        <div className="page-grid">
          <div>
            <img src="/images/hedwig.gif" className="hedwig-side" />
          </div>

          <div className="profile-card" style={{ gridColumn: "span 2" }}>
            <h1 className="page-title">Wizard Profile</h1>
            <h2>Kamal Ram</h2>
            <p>wizard.student@example.com</p>
            <p><b>House:</b> Changeable from top buttons</p>
            <p><b>Preferred Mode:</b> Short Summary</p>
            <p><b>Documents Uploaded:</b> 12</p>
            <p><b>Quizzes Generated:</b> 9</p>
            <button className="magic-btn">Edit Profile</button>
          </div>
        </div>
      </main>
    </MagicLayout>
  );
}