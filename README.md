# VACATION APP
## ACTIONS TO LAUNCH
1. ENTER TO THE DIRECTORY
```
cd vacation
```
2. START SERVER
```
docker/up.sh
```
4. START BASH SHELL INSIDE PHP-FPM CONTAINER TO INTERACT WITH IT DIRECTLY
```
docker/php.sh
```
4. CREATE SCHEMA FOR DATABASE USING SHELL FOR PHP-FPM CONTAINER
```
symfony console doctrine:schema:create
```
5. GO TO WEB PAGE TO MAKE TESTS
[http://localhost:9005](http://localhost:9005)
6. NEXT NECESSARY LINK TO CONFIRM REGISTERED EMAIL
[http://localhost:9004](https://localhost:9004)
## DEVELOPMENT SECTION
###USED PORTS
- HTTP: [http://localhost:9005](http://localhost:9000)
- HTTPS: [http://localhost:9005](https://localhost:9001)
- MYSQL: [http://localhost:9005](http://localhost:9002)
- MAILCATCHER: [http://localhost:9005](http://localhost:9004)
- REACT APP: [http://localhost:9005](http://localhost:9005)
### COMMANDS
* TO UPDATE SCHEMA
```
symfony console doctrine:schema:update --force
```
*** TO USE WEB CONSOLE
```
fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: 'vacation_user@vacation.com',
        password: 'aA@45678'
    }),
})
.then(response => response.json())
.then(data => {
    if (data.id) {
        console.log('Login successful, data:', data);
        // You can now use this token in subsequent requests or store it in localStorage
    } else {
        console.log('Login failed:', data.error);
    }
})
.catch(error => {
    console.error('Error:', error);
});
```
### HEADERS
* Content-Type = application/ld+json
* PATCH = application/merge-patch+json



