module.exports = function (app) {
  app.get('/modules/:module/views/:jadeflies',function (req,res) {
    res.render('.'+req.path);
  });
}
