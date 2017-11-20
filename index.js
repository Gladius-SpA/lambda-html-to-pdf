var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');
var AWS = require('aws-sdk');
var config = require('./config.js');

var s3 = new AWS.S3();

exports.handler = function (event, context) {
  returnData = {};
  if (event.html) {
    var outputFilename = event.filename + '.pdf';
    var output = '/tmp/' + outputFilename;

    writeStream = fs.createWriteStream(output);

    wkhtmltopdf(event.html, function (code, signal) {
      var key = event.location + outputFilename;
      s3.putObject({
        Bucket: bucket,
        Key: key,
        Body: fs.createReadStream(output),
        ContentType: 'application/pdf',
      }, function (error, data) {
        if (error != null) {
          console.log('error: ' + error);
        } else {
          console.log('upload done...');
        }

        returnData = {
          filename: outputFilename,
        };

        context.done(null, returnData);
      });
    }).pipe(writeStream);
  } else {
    console.log('error');
    context.done('unable to get the html', {});
  }
};
