process.env.PATH = process.env.PATH + ':' + process.env.LAMBDA_TASK_ROOT;

bucket = process.env.S3_BUCKET;

module.exports = function () {
};
