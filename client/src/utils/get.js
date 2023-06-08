const cats = fetch('http://localhost:8080/cats')
.then(response => response.json())
.then(data => console.log(data))