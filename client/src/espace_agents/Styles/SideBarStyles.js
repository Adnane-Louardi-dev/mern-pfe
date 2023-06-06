export const styles = {
  adminPageContainer: {
    display:'grid',
    gridTemplateColumns: "30% 70%"
  },
  sidebar: {
   
    height: '100vh',
    backgroundColor: '#00A3FF',  
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginRight:'3%'
  },
  sidebarButton: {
    width: '100%',
    height: '25%',
    backgroundColor: '#00A3FF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sidebarButtonHover: {
    backgroundColor: 'white',
    color: '#00A3FF',
  },
  content: {
    flexGrow: 1,
  
    backgroundColor: '#F3F3FD',
  },
  
};
