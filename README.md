# VOCATION APP
## ACTIONS TO LAUNCH
1. ENTER TO THE DIRECTORY
```
cd vocation
```
2. START SERVER
```
docker/up.sh
```
3. START BASH SHELL INSIDE PHP-FPM CONTAINER TO INTERACT WITH IT DIRECTLY
```
docker/php.sh
```
4. CREATE SCHEMA FOR DATABASE USING SHELL FOR PHP-FPM CONTAINERh
```
symfony console doctrine:schema:create
```

## DEVELOPMENT SECTION
* TO UPDATE SCHEMA
```
symfony console doctrine:schema:update
```

allow pasting
fetch('/api/login', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
email: 'vocation_user@vocation.ee',
password: 'aA@45678'
}),
})
.then(response => response.json())
.then(data => {
if (data.token) {
console.log('Login successful, token:', data.token);
// You can now use this token in subsequent requests or store it in localStorage
} else {
console.log('Login failed:', data.message);
}
})
.catch(error => {
console.error('Error:', error);
});
