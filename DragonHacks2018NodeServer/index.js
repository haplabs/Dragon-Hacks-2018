const SERVICE_HOST = 'a2299132.ngrok.io';
const PORT = 80;

const spawn = require('child_process').spawn;
const http = require('http');
const ls = spawn('java', ['-cp', '.:/home/xps/Documents/DP_UareU_Linux223_20140429.2/dpuareu.jar' , 'UareUSampleJava'], { cwd: '/home/xps/Documents/Digital-Persona/src/'} );

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
  if(data.toString().toLowerCase().indexOf('not') > -1) return;
  
  var options = {
  	host: SERVICE_HOST,
  	port: PORT,
  	path: '/api/fingerprint',
  	method: 'PUT'
  };
  var req = http.request(options, (res)=>{
  	console.log('STATUS: ' + res.statusCode)
  });
  req.end();
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
