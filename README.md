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
3. START BASH SHELL INSIDE PHP-FPM CONTAINER TO INTERACT WITH IT DIRECTLY
```
docker/php.sh
```
4. CREATE SCHEMA FOR DATABASE USING SHELL FOR PHP-FPM CONTAINER
```
symfony console doctrine:schema:create
```

## DEVELOPMENT SECTION
http://localhost:9000
https://localhost:9001
https://localhost:9002
https://localhost:9004
* TO UPDATE SCHEMA
```
symfony console doctrine:schema:update --force
```
Content-Type = application/ld+json
PATCH = application/merge-patch+json

```
fetch('/api/login', {
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

