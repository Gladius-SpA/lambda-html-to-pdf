# hmtl-to-pdf
Lambda function to create a .pdf file from HTML and store it on S3


## Configuration
1. Download project
2. Run `npm install`
3. Create a .zip file containing this project
4. Create an AWS Lambda function with a NodeJS runtime (tested from version 10.x+)
5. Associate the function with an executing role that has `AWSLambdaBasicExecutionRole` policy and writing permissions over the desired S3 buckets
6. Add two layers to the Lambda function (change region on the ARN depending on the function's region):
  * arn:aws:lambda:[REGION]:347599033421:layer:wkhtmltopdf:1
  * arn:aws:lambda:[REGION]:347599033421:layer:amazon_linux_fonts:1
7. Add `FONTCONFIG_PATH` as an environment variable with value `/opt/etc/fonts`
8. Change function's timeout to something that works for you (I use 25 seconds)
9. Upload .zip file from step 3 as the function's code


## Use
This function receives the following payload:
- __html__: String representation of the HTML code to process
- __location__: Directory to store produced file. Must end with '/'
- __filename__: .pdf file name without extension
- __s3_bucket__: Name of the bucket to store the file. Must have writing permissions
- *__options__**: Object with specific options from [wkhtmltopdf's docs](https://wkhtmltopdf.org/usage/wkhtmltopdf.txt)

\* Optional

### Use case with ruby's aws-sdk gem
```ruby
client = Aws::Lambda::Client.new(region: region_name)
resp = client.invoke({
  function_name: 'html-to-pdf',
  payload: '{
    "html": "<html><h1>Hello, world!</h1></html>",
    "location": "pdfs/",
    "filename": "test",
    "s3_bucket": "my-pdfs-bucket"
  }'
})
```
