

 const handleLogout = async() => {


    fetch('/logout', {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        localStorage.clear();
        window.location.href = '/login';
        console.log('Logout was succesfull');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });

  
  }
  
  document.addEventListener('DOMContentLoaded', () => {

    const logoutButton = document.getElementById("logout-button")
    console.log(logoutButton)
    
    logoutButton.addEventListener('click', handleLogout);
  });
  