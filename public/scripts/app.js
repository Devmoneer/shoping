
const DB_NAMESPACE = 'myapp_';

const Database = {
    set: (key, value) => {
        if (typeof key !== 'string' || key.trim() === '') {
            throw new Error('Invalid key');
        }
        
        if (['__proto__', 'constructor', 'prototype'].includes(key)) {
            throw new Error('Invalid key');
        }
        localStorage.setItem(DB_NAMESPACE + key, JSON.stringify(value));
    },
    get: (key) => {
        if (typeof key !== 'string' || key.trim() === '') return null;
        const value = localStorage.getItem(DB_NAMESPACE + key);
        try {
            return value ? JSON.parse(value) : null;
        } catch {
            return null;
        }
    },
    remove: (key) => {
        if (typeof key !== 'string' || key.trim() === '') return;
        localStorage.removeItem(DB_NAMESPACE + key);
    },
    getAll: () => {
        const all = {};
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(DB_NAMESPACE)) {
                const cleanKey = key.replace(DB_NAMESPACE, '');
                all[cleanKey] = Database.get(cleanKey);
            }
        });
        return all;
    }
};


Database.set('user', { name: 'John', age: 30 });
const user = Database.get('user');
console.log(user);