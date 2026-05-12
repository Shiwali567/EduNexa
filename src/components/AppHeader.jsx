function AppHeader({
  authUser,
  onLogout,
  searchQuery,
  onSearchChange,
  isAdminManagePage,
  onToggleAdminPage,
}) {
  return (
    <header className="page-header">
      <div className="utility-nav">
        <span>For Individuals</span>
        <span>For Businesses</span>
        <span>For Universities</span>
      </div>

      <div className="top-bar">
        <div className="brand-group">
          <h1>EduNexa</h1>
          <button type="button" className="explore-btn">
            Explore
          </button>
        </div>
        <input
          type="search"
          placeholder="What do you want to learn?"
          className="search-box"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        {authUser && (
          <div className="header-actions">
            {authUser.role === "admin" && (
              <button
                type="button"
                className="secondary-btn"
                onClick={onToggleAdminPage}
              >
                {isAdminManagePage ? "Dashboard" : "Add"}
              </button>
            )}
            <button type="button" className="secondary-btn" onClick={onLogout}>
              Logout ({authUser.displayName})
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
