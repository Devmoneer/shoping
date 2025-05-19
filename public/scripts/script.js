
const email = localStorage.getItem('userEmail');
const userData = { cart: ['Laptop', 'GPU'] };
if (email) {
    localStorage.setItem(`data_${email}`, JSON.stringify(userData));
}


if (email) {
    const data = localStorage.getItem(`data_${email}`);
    if (data) {
        const userData = JSON.parse(data);
        
    }
}