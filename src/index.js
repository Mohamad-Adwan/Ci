const http = require('http');
const fs = require('fs');
const path = require('path');

// قاعدة بيانات بسيطة (مؤقتة)
const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // 🏠 الصفحة الرئيسية
  if (method === 'GET' && url === '/') {
    const filePath = path.join(__dirname, 'assets', 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading page');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
  
  // 👤 إنشاء مستخدم جديد
  else if (method === 'POST' && url === '/v1/users') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const { name } = JSON.parse(body);
        
        // التحقق إذا المستخدم موجود
        const existingUser = users.find(u => u.name === name);
        if (existingUser) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ message: 'User already exists' }));
        }
        
        // إنشاء مستخدم جديد
        const newUser = { id: users.length + 1, name };
        users.push(newUser);
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }
  
  // أي مسار آخر
  else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const port = process.env.PORT || 8080;
server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
