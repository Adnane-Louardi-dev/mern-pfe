export const styles = {
  adminPageContainer: {
    display: "grid",
    gridTemplateColumns: "30% 70%",
  },
  sidebar: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "center",
  },
  sidebarButton: {
    height: "23%",
    backgroundColor: "#00A3FF",
    color: "white",
    border: "none",
    borderRadius: "15px",
    boxShadow: "3px 3px 5px 0px #ccc",
    margin: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
  },
  sidebarButtonHover: {
    backgroundColor: "white",
    color: "#00A3FF",
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#F3F3FD",
  },
};
