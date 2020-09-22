// MVC Model View Controller
class UsersModel {

    getUsersDetails(userId) {

       return fetch(`http://jsonplaceholder.typicode.com/users/${userId}`).then(usersRes => usersRes.json());
    }
}