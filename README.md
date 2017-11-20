# hmtl-to-pdf
Lambda function to create a .pdf file from an HTML input and store it on S3


## Configuration
1. Download project
2. Change config.js#1 to use your bucket
3. Create a .zip file containing this project
4. Upload .zip file to AWS Lambda


## Use
This function receives the following payload:
- __html__: String representation of the HTML code to process.
- __location__: Directory to store produced file. Must end with '/'

### Use case with ruby's aws-sdk gem
```ruby
client = Aws::Lambda::Client.new(region: region_name)
resp = client.invoke({
  function_name: 'html-to-pdf',
  payload: '{"html": "<html><h1>Hello, world!</h1></html>", "location": "pdfs/"}'
})
```
