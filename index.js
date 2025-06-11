import app from './app.js';


app.listen(app.get('port'), () => {
  console.log('✅ Server on port', app.get('port'));
});
