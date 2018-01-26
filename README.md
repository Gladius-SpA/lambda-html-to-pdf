# hmtl-to-pdf
Lambda function to create a .pdf file from HTML and store it on S3


## Configuration
1. Download project
2. Run `npm install`
3. Create a .zip file containing this project
4. Upload .zip file to AWS Lambda
5. On your function's 'Basic Settings', change timeout from 3s to 10s (or more)


## Use
This function receives the following payload:
- __html__: String representation of the HTML code to process
- __location__: Directory to store produced file. Must end with '/'
- __filename__: .pdf file name without extension
- __s3_bucket__: Name of the bucket to store the file. Must have writing permissions

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
