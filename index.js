var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');
var AWS = require('aws-sdk');
var config = require('./config.js');

var s3 = new AWS.S3();

exports.handler = function (event, context) {
  console.log("EVENT\n" + JSON.stringify(event, null, 2));

  returnData = {};
  if (event.html) {
    var sanitizedFilename = event.filename.replace(/^.*(\\|\/)/, '')
                                          .replace(/[^0-9A-Za-z.\-]/, '_');
    var outputFilename = sanitizedFilename + '.pdf';
    var output = '/tmp/' + outputFilename;
    var options = event.options || {};

    writeStream = fs.createWriteStream(output);

    wkhtmltopdf(event.html, options, function (code, signal) {
      var key = event.location + outputFilename;
      s3.putObject({
        Bucket: event.s3_bucket,
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
          data: data,
          size: fs.statSync(output).size
        };

        context.done(null, returnData);
      });
    }).pipe(writeStream);
  } else {
    console.log('error');
    context.done('unable to get the html', {});
  }
};
