const Navbar = () => {
    const styles = {

      mainhead: {
        "paddingTop" : "20px",
      },
      subs: {
        "paddingTop" : "20px",
      },
    }

    return (
      <div>
      <h1 class="mainhead" style={styles.mainhead}>
        Virtua
        <small class="text-muted">Campus</small>
      </h1>
      <p class="lead subs" style={styles.subs}>School search and application management, made easy</p>
      </div>

    )
}

export default Navbar;
